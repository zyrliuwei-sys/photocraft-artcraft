import { Check, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Section, SectionHeading } from '@/components/editorial-section';

export function PhotoCraftCompare({ heading = true }: { heading?: boolean }) {
  const rows: [string, string, string][] = [
    [m['pc.cmp.r.price'](), m['pc.cmp.r.price.pc'](), m['pc.cmp.r.price.ps']()],
    [
      m['pc.cmp.r.license'](),
      m['pc.cmp.r.license.pc'](),
      m['pc.cmp.r.license.ps'](),
    ],
    [
      m['pc.cmp.r.platforms'](),
      m['pc.cmp.r.platforms.pc'](),
      m['pc.cmp.r.platforms.ps'](),
    ],
    [
      m['pc.cmp.r.offline'](),
      m['pc.cmp.r.offline.pc'](),
      m['pc.cmp.r.offline.ps'](),
    ],
    [m['pc.cmp.r.psd'](), m['pc.cmp.r.psd.pc'](), m['pc.cmp.r.psd.ps']()],
    [
      m['pc.cmp.r.layers'](),
      m['pc.cmp.r.layers.pc'](),
      m['pc.cmp.r.layers.ps'](),
    ],
    [
      m['pc.cmp.r.adjust'](),
      m['pc.cmp.r.adjust.pc'](),
      m['pc.cmp.r.adjust.ps'](),
    ],
    [m['pc.cmp.r.color'](), m['pc.cmp.r.color.pc'](), m['pc.cmp.r.color.ps']()],
    [m['pc.cmp.r.ai'](), m['pc.cmp.r.ai.pc'](), m['pc.cmp.r.ai.ps']()],
    [
      m['pc.cmp.r.automation'](),
      m['pc.cmp.r.automation.pc'](),
      m['pc.cmp.r.automation.ps'](),
    ],
    [
      m['pc.cmp.r.plugins'](),
      m['pc.cmp.r.plugins.pc'](),
      m['pc.cmp.r.plugins.ps'](),
    ],
    [
      m['pc.cmp.r.maturity'](),
      m['pc.cmp.r.maturity.pc'](),
      m['pc.cmp.r.maturity.ps'](),
    ],
  ];
  const picks = [
    {
      title: m['pc.cmp.pick_pc'](),
      Icon: Check,
      good: true,
      items: [
        m['pc.cmp.pick_pc.1'](),
        m['pc.cmp.pick_pc.2'](),
        m['pc.cmp.pick_pc.3'](),
        m['pc.cmp.pick_pc.4'](),
      ],
    },
    {
      title: m['pc.cmp.pick_ps'](),
      Icon: Minus,
      good: false,
      items: [
        m['pc.cmp.pick_ps.1'](),
        m['pc.cmp.pick_ps.2'](),
        m['pc.cmp.pick_ps.3'](),
        m['pc.cmp.pick_ps.4'](),
      ],
    },
  ];

  return (
    <Section id="compare" className={cn(!heading && 'pt-12 sm:pt-16')}>
      {heading && (
        <SectionHeading title={m['pc.cmp.title']()} sub={m['pc.cmp.sub']()} />
      )}

      <div
        className={cn(
          'ring-foreground/[0.08] overflow-x-auto rounded-[var(--radius)] ring-1',
          heading && 'mt-12'
        )}
      >
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="bg-card">
            <tr>
              <th className="text-muted-foreground w-[24%] px-5 py-5 text-sm font-medium sm:px-7">
                {m['pc.cmp.col.feature']()}
              </th>
              <th className="w-[38%] px-5 py-5 sm:px-7">
                <span className="font-display text-xl font-bold">
                  PhotoCraft
                </span>
              </th>
              <th className="w-[38%] px-5 py-5 sm:px-7">
                <span className="font-display text-muted-foreground text-xl font-bold">
                  {m['pc.cmp.col.ps']()}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, pc, ps], i) => (
              <tr
                key={label}
                className={cn(i % 2 === 0 && 'bg-foreground/[0.025]')}
              >
                <th
                  scope="row"
                  className="px-5 py-4 align-top text-sm font-semibold sm:px-7"
                >
                  {label}
                </th>
                <td className="px-5 py-4 align-top text-[15px] leading-relaxed sm:px-7">
                  {pc}
                </td>
                <td className="text-muted-foreground px-5 py-4 align-top text-[15px] leading-relaxed sm:px-7">
                  {ps}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {picks.map(({ title, Icon, good, items }) => (
          <div key={title}>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <ul className="mt-5 space-y-3">
              {items.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <Icon
                    className={cn(
                      'mt-1 size-4 shrink-0',
                      good ? 'text-brand' : 'text-muted-foreground'
                    )}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-12 max-w-3xl text-xs leading-relaxed">
        {m['pc.cmp.note']()}
      </p>
    </Section>
  );
}
