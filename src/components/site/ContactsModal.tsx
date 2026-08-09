import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import VkIcon from '@/components/icons/VkIcon';
import { trackGoal, trackPhoneClick, goals } from '@/lib/analytics';

interface ContactsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactsModal = ({ open, onOpenChange }: ContactsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden p-0 gap-0">
        <div className="relative h-32 sm:h-36 shrink-0">
          <img
            src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/bf8a1bb9-ee18-4cd1-a383-641b94df59ed.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <DialogHeader className="relative h-full justify-end p-5 sm:p-6">
            <DialogTitle className="font-display text-xl text-white">Свяжитесь с нами</DialogTitle>
            <DialogDescription className="text-white/85">
              Выберите удобный способ связи — ответим в течение 15 минут.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 bg-background">
          <div className="space-y-3">
            <a
              href="tel:+79106926276"
              onClick={() => trackPhoneClick('contacts_modal')}
              className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="Phone" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-display font-bold">+7 (910) 692-62-76</div>
                <div className="text-xs text-muted-foreground">Пн-Пт 9:00 – 18:00</div>
              </div>
            </a>

            <a
              href="https://t.me/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.TELEGRAM_CLICK)}
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
              href="https://wa.me/79106926276"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.WHATSAPP_CLICK)}
              className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-xs text-muted-foreground">+7 (915) 397-70-87</div>
              </div>
            </a>

            <a
              href="https://vk.com/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.VK_CLICK)}
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
              onClick={() => {
                trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Оставить заявку (модалка контактов)' });
                onOpenChange(false);
              }}
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