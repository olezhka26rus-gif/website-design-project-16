import func2url from '@/func2url.json';
import { trackGoal } from '@/lib/analytics';

export interface LeadPayload {
  name: string;
  phone: string;
  car?: string;
  source: string;
}

interface QueuedLead extends LeadPayload {
  client_id: string;
  created: number;
  goal?: string;
  goalParams?: Record<string, unknown>;
}

const QUEUE_KEY = 'rl_pending_leads';
const MAX_AGE = 14 * 24 * 60 * 60 * 1000;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const makeId = () => {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    /* старый браузер */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const readQueue = (): QueuedLead[] => {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const list = raw ? (JSON.parse(raw) as QueuedLead[]) : [];
    return Array.isArray(list) ? list.filter((l) => l && l.client_id && Date.now() - l.created < MAX_AGE) : [];
  } catch {
    return [];
  }
};

const writeQueue = (list: QueuedLead[]) => {
  try {
    if (list.length) localStorage.setItem(QUEUE_KEY, JSON.stringify(list));
    else localStorage.removeItem(QUEUE_KEY);
  } catch {
    /* приватный режим — очередь недоступна */
  }
};

const enqueue = (lead: QueuedLead) => {
  const list = readQueue().filter((l) => l.client_id !== lead.client_id);
  writeQueue([...list, lead]);
};

const dequeue = (clientId: string) => writeQueue(readQueue().filter((l) => l.client_id !== clientId));

type Attempt = 'ok' | 'rejected' | 'failed';

const postOnce = async (lead: QueuedLead, timeoutMs: number): Promise<Attempt> => {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const res = await fetch(func2url.leads, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: lead.client_id,
        name: lead.name,
        phone: lead.phone,
        car: lead.car ?? '',
        source: lead.source,
      }),
      keepalive: true,
      signal: controller?.signal,
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      return data?.success ? 'ok' : 'failed';
    }
    return res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429 ? 'rejected' : 'failed';
  } catch {
    return 'failed';
  } finally {
    if (timer) clearTimeout(timer);
  }
};

export type LeadResult = 'sent' | 'queued' | 'rejected';

/**
 * Отправляет заявку. Перед отправкой кладёт её в очередь браузера, поэтому
 * при сбое сети или сервера заявка не теряется и досылается автоматически.
 * У каждой заявки свой ключ — повторные отправки не создают дублей.
 */
export const sendLead = async (
  lead: LeadPayload,
  goal?: { name: string; params?: Record<string, unknown> },
): Promise<LeadResult> => {
  const item: QueuedLead = {
    ...lead,
    car: lead.car ?? '',
    client_id: makeId(),
    created: Date.now(),
    goal: goal?.name,
    goalParams: goal?.params,
  };
  enqueue(item);

  const delays = [0, 1000, 2500, 5000];
  for (const delay of delays) {
    if (delay) await wait(delay);
    const result = await postOnce(item, 12000);
    if (result === 'ok') {
      dequeue(item.client_id);
      if (item.goal) trackGoal(item.goal, item.goalParams);
      return 'sent';
    }
    if (result === 'rejected') {
      dequeue(item.client_id);
      return 'rejected';
    }
  }
  scheduleFlush(15000);
  return 'queued';
};

let flushing = false;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

/** Досылает заявки, которые не ушли раньше (при сбое сети, закрытой вкладке и т.п.) */
export const flushPendingLeads = async (): Promise<void> => {
  if (flushing || typeof window === 'undefined') return;
  const queue = readQueue();
  writeQueue(queue);
  if (!queue.length) return;
  flushing = true;
  let left = 0;
  try {
    for (const item of queue) {
      const result = await postOnce(item, 12000);
      if (result === 'ok') {
        dequeue(item.client_id);
        if (item.goal) trackGoal(item.goal, { ...item.goalParams, delivered_later: true });
      } else if (result === 'rejected') {
        dequeue(item.client_id);
      } else {
        left++;
      }
    }
  } finally {
    flushing = false;
  }
  if (left) scheduleFlush(60000);
};

const scheduleFlush = (ms: number) => {
  if (typeof window === 'undefined') return;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushPendingLeads();
  }, ms);
};

/** Подписка на события браузера, при которых стоит дослать заявки. Вызывать один раз в useEffect. */
export const watchPendingLeads = (): (() => void) => {
  const onOnline = () => void flushPendingLeads();
  const onVisible = () => {
    if (document.visibilityState === 'visible') void flushPendingLeads();
  };
  window.addEventListener('online', onOnline);
  document.addEventListener('visibilitychange', onVisible);
  void flushPendingLeads();
  return () => {
    window.removeEventListener('online', onOnline);
    document.removeEventListener('visibilitychange', onVisible);
  };
};
