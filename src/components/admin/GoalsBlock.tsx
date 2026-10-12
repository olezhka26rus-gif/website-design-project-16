import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { adminGoals } from '@/data/adminGoals';

const GoalsBlock = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 bg-white rounded-2xl border border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="Target" size={16} />
          Мои цели · {adminGoals.length}
        </span>
        <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={16} />
      </button>
      {open && (
        <div className="px-4 pb-4 grid gap-2">
          {adminGoals.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-secondary/40 px-3 py-2.5"
            >
              <div>
                <div className="font-semibold text-sm">
                  {g.title} <span className="text-muted-foreground font-normal">· {g.spec}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {g.when} · {g.price}
                </div>
              </div>
              <Link
                to={g.catalogPath}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Открыть на сайте
                <Icon name="ArrowRight" size={13} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsBlock;
