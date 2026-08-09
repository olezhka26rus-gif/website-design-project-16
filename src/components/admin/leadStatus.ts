export type LeadStatus = 'new' | 'called' | 'no_answer' | 'refused' | 'bought';

export interface Lead {
  id: number;
  name: string;
  phone: string;
  car: string;
  source: string;
  created_at: string;
  status: LeadStatus;
  note: string;
  status_updated_at: string | null;
}

export const STATUS_META: Record<LeadStatus, { label: string; icon: string; className: string; dot: string }> = {
  new: {
    label: 'Новая',
    icon: 'Sparkles',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  called: {
    label: 'Дозвонился',
    icon: 'PhoneCall',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  no_answer: {
    label: 'Не дозвонился',
    icon: 'PhoneMissed',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  refused: {
    label: 'Отказ',
    icon: 'X',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
  bought: {
    label: 'Купил',
    icon: 'CircleCheck',
    className: 'bg-violet-50 text-violet-700 border-violet-200',
    dot: 'bg-violet-500',
  },
};

export const STATUS_ORDER: LeadStatus[] = ['new', 'called', 'no_answer', 'refused', 'bought'];
