import func2url from '@/func2url.json';

const COUNTER_ID = 110764663;

type YmParams = Record<string, unknown>;

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

const callYm = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(COUNTER_ID, ...(args as [string, ...unknown[]]));
  }
};

/** Отправляет просмотр страницы в Яндекс Метрику (используется при переходах в SPA) */
export const trackPageView = (url: string) => {
  callYm('hit', url);
};

/** Отправляет достижение цели в Яндекс Метрику */
export const trackGoal = (goal: string, params?: YmParams) => {
  callYm('reachGoal', goal, params);
};

/** Сохраняет нажатие на номер телефона в базу (для админки) и отправляет цель в Метрику */
export const trackPhoneClick = (place: string) => {
  trackGoal(goals.PHONE_CLICK, { place });

  if (typeof window === 'undefined') return;

  const device = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  const payload = JSON.stringify({
    page: window.location.pathname + window.location.search,
    place,
    device,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(func2url['phone-clicks'], new Blob([payload], { type: 'application/json' }));
      return;
    }
  } catch {
    /* пробуем обычным запросом ниже */
  }

  fetch(func2url['phone-clicks'], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
};

export const goals = {
  LEAD_FORM_SUBMIT: 'lead_form_submit',
  CTA_FORM_SUBMIT: 'cta_form_submit',
  PHONE_CLICK: 'phone_click',
  TELEGRAM_CLICK: 'telegram_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  VK_CLICK: 'vk_click',
  CTA_BUTTON_CLICK: 'cta_button_click',
  CALCULATOR_OPEN: 'calculator_open',
  CALCULATOR_CALCULATE: 'calculator_calculate',
} as const;