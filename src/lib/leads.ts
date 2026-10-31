import func2url from '@/func2url.json';

export interface LeadPayload {
  name: string;
  phone: string;
  car?: string;
  source: string;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Отправляет заявку и возвращает true только если сервер её сохранил. До 3 попыток. */
export const sendLead = async (lead: LeadPayload): Promise<boolean> => {
  const body = JSON.stringify({ ...lead, car: lead.car ?? '' });
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.success) return true;
      } else if (res.status >= 400 && res.status < 500) {
        return false;
      }
    } catch {
      /* сеть оборвалась — пробуем ещё раз */
    }
    await wait(800 * (attempt + 1));
  }
  return false;
};
