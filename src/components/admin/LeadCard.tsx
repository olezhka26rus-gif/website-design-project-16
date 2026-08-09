import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lead, LeadStatus, STATUS_META, STATUS_ORDER } from './leadStatus';

interface LeadCardProps {
  lead: Lead;
  onChangeStatus: (id: number, status: LeadStatus) => void;
  onSaveNote: (id: number, note: string) => Promise<void>;
}

const LeadCard = ({ lead, onChangeStatus, onSaveNote }: LeadCardProps) => {
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(lead.note);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNote(lead.note);
  }, [lead.note]);

  const meta = STATUS_META[lead.status] ?? STATUS_META.new;

  const handleSave = async () => {
    setSaving(true);
    await onSaveNote(lead.id, note);
    setSaving(false);
    setNoteOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-base">{lead.name}</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${meta.className}`}
            >
              <Icon name={meta.icon} size={12} />
              {meta.label}
            </span>
          </div>
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-lg mt-1 hover:underline"
          >
            <Icon name="Phone" size={16} />
            {lead.phone}
          </a>
          <div className="text-sm text-muted-foreground mt-1">
            {lead.car || 'Автомобиль не указан'}
          </div>
        </div>

        <div className="text-right text-xs text-muted-foreground shrink-0">
          <div>{new Date(lead.created_at).toLocaleString('ru-RU')}</div>
          <div className="mt-0.5">{lead.source}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {STATUS_ORDER.map((s) => {
          const active = lead.status === s;
          const m = STATUS_META[s];
          return (
            <button
              key={s}
              onClick={() => onChangeStatus(lead.id, s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                active
                  ? `${m.className} ring-2 ring-offset-1 ring-current/20`
                  : 'bg-white text-foreground/60 border-border hover:border-foreground/30'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {!noteOpen ? (
        <button
          onClick={() => setNoteOpen(true)}
          className="mt-3 flex items-start gap-1.5 text-sm text-left w-full"
        >
          <Icon name="StickyNote" size={14} className="shrink-0 mt-0.5 text-muted-foreground" />
          <span className={lead.note ? 'text-foreground/80' : 'text-muted-foreground'}>
            {lead.note || 'Добавить заметку'}
          </span>
        </button>
      ) : (
        <div className="mt-3">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Например: просил перезвонить в среду после 18:00"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setNote(lead.note);
                setNoteOpen(false);
              }}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadCard;
