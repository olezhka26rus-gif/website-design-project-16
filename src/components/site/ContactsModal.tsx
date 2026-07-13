import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import VkIcon from '@/components/icons/VkIcon';

interface ContactsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactsModal = ({ open, onOpenChange }: ContactsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/678a7afe-d1ec-4366-b5bf-294e4f2edf8d.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-white/85" />

        <div className="relative p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Свяжитесь с нами</DialogTitle>
            <DialogDescription>
              Выберите удобный способ связи — ответим в течение 15 минут.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-3">
            <a
              href="tel:+79153977087"
              className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="Phone" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-display font-bold">+7 (915) 397-70-87</div>
                <div className="text-xs text-muted-foreground">Пн-Пт 9:00 – 18:00</div>
              </div>
            </a>

            <a
              href="https://t.me/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="Send" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold">Telegram</div>
                <div className="text-xs text-muted-foreground">@region_logistik</div>
              </div>
            </a>

            <a
              href="https://vk.com/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <VkIcon size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold">ВКонтакте</div>
                <div className="text-xs text-muted-foreground">vk.com/region_logistik</div>
              </div>
            </a>

            <a
              href="#cta"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-xl bg-primary text-primary-foreground p-4 hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Icon name="FileEdit" size={20} />
              </div>
              <div>
                <div className="font-semibold">Оставить заявку</div>
                <div className="text-xs text-primary-foreground/80">Расчёт стоимости за 15 минут</div>
              </div>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsModal;
