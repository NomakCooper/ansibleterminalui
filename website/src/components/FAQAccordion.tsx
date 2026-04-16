import { useState } from 'react';
import type { FAQItem } from '../data/faq';

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {items.map(({ q, a }, idx) => (
        <div key={idx} className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
          <button
            type="button"
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-zinc-800/50"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <span className="pr-4 text-sm font-medium text-zinc-100">{q}</span>
            <span
              className={[
                'shrink-0 text-zinc-500 transition-transform duration-200',
                open === idx ? 'rotate-45 text-cyan-400' : '',
              ].join(' ')}
              aria-hidden="true"
            >
              +
            </span>
          </button>

          {open === idx && (
            <div className="px-5 pb-4">
              <p className="border-t border-zinc-800 pt-4 text-sm leading-relaxed text-zinc-400">{a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
