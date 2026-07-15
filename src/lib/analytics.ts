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
