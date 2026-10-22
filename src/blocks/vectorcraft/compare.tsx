import {
  Bot,
  Check,
  FileJson,
  Gauge,
  Layers,
  Minus,
  MonitorSmartphone,
  Wallet,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Section, SectionHeading } from '@/components/editorial-section';

/** Where VectorCraft beats Illustrator, as six scannable cards. */
export function VectorCraftAdvantages() {
  const cards = [
    [Wallet, m['vc.adv.1.title'](), m['vc.adv.1.desc']()],
    [MonitorSmartphone, m['vc.adv.2.title'](), m['vc.adv.2.desc']()],
    [Bot, m['vc.adv.3.title'](), m['vc.adv.3.desc']()],
    [FileJson, m['vc.adv.4.title'](), m['vc.adv.4.desc']()],
    [Layers, m['vc.adv.5.title'](), m['vc.adv.5.desc']()],
    [Gauge, m['vc.adv.6.title'](), m['vc.adv.6.desc']()],
  ] as const;
  return (
    <Section id="advantages" className="pt-12 sm:pt-16">
      <SectionHeading title={m['vc.adv.title']()} sub={m['vc.adv.sub']()} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([Icon, title, desc]) => (
          <article
            key={title}
            data-reveal
            className="bg-card ring-foreground/[0.08] rounded-[var(--radius)] p-6 ring-1 sm:p-7"
          >
            <Icon className="text-brand size-6" />
            <h3 className="font-display mt-5 text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2.5 leading-relaxed">
              {desc}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

const ROWS = [
  'price',
  'license',
  'account',
  'platforms',
  'format',
  'ai_files',
  'other_files',
  'tools',
  'genai',
  'automation',
  'plugins',
  'maturity',
] as const;

/** Static lookup so every message stays tree-shakeable. */
const ROW_TEXT: Record<
  (typeof ROWS)[number],
  [() => string, () => string, () => string]
> = {
  price: [m['vc.cmp.r.price'], m['vc.cmp.r.price.vc'], m['vc.cmp.r.price.ai']],
  license: [
    m['vc.cmp.r.license'],
    m['vc.cmp.r.license.vc'],
    m['vc.cmp.r.license.ai'],
  ],
  account: [
    m['vc.cmp.r.account'],
    m['vc.cmp.r.account.vc'],
    m['vc.cmp.r.account.ai'],
  ],
  platforms: [
    m['vc.cmp.r.platforms'],
    m['vc.cmp.r.platforms.vc'],
    m['vc.cmp.r.platforms.ai'],
  ],
  format: [
    m['vc.cmp.r.format'],
    m['vc.cmp.r.format.vc'],
    m['vc.cmp.r.format.ai'],
  ],
  ai_files: [
    m['vc.cmp.r.ai_files'],
    m['vc.cmp.r.ai_files.vc'],
    m['vc.cmp.r.ai_files.ai'],
  ],
  other_files: [
    m['vc.cmp.r.other_files'],
    m['vc.cmp.r.other_files.vc'],
    m['vc.cmp.r.other_files.ai'],
  ],
  tools: [m['vc.cmp.r.tools'], m['vc.cmp.r.tools.vc'], m['vc.cmp.r.tools.ai']],
  genai: [m['vc.cmp.r.genai'], m['vc.cmp.r.genai.vc'], m['vc.cmp.r.genai.ai']],
  automation: [
    m['vc.cmp.r.automation'],
    m['vc.cmp.r.automation.vc'],
    m['vc.cmp.r.automation.ai'],
  ],
  plugins: [
    m['vc.cmp.r.plugins'],
    m['vc.cmp.r.plugins.vc'],
    m['vc.cmp.r.plugins.ai'],
  ],
  maturity: [
    m['vc.cmp.r.maturity'],
    m['vc.cmp.r.maturity.vc'],
    m['vc.cmp.r.maturity.ai'],
  ],
};

export function VectorCraftCompare() {
  const picks = [
    {
      title: m['vc.cmp.pick_vc'](),
      Icon: Check,
      good: true,
      items: [
        m['vc.cmp.pick_vc.1'](),
        m['vc.cmp.pick_vc.2'](),
        m['vc.cmp.pick_vc.3'](),
        m['vc.cmp.pick_vc.4'](),
      ],
    },
    {
      title: m['vc.cmp.pick_ai'](),
      Icon: Minus,
      good: false,
      items: [
        m['vc.cmp.pick_ai.1'](),
        m['vc.cmp.pick_ai.2'](),
        m['vc.cmp.pick_ai.3'](),
        m['vc.cmp.pick_ai.4'](),
      ],
    },
  ];

  return (
    <Section id="compare" className="bg-secondary/60">
      <SectionHeading title={m['vc.cmp.title']()} sub={m['vc.cmp.sub']()} />
      <div className="ring-foreground/[0.08] bg-background mt-12 overflow-x-auto rounded-[var(--radius)] ring-1">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="bg-card">
            <tr>
              <th className="text-muted-foreground w-[22%] px-5 py-5 text-sm font-medium sm:px-7">
                {m['pc.cmp.col.feature']()}
              </th>
              <th className="w-[39%] px-5 py-5 sm:px-7">
                <span className="font-display text-xl font-bold">
                  VectorCraft
                </span>
              </th>
              <th className="w-[39%] px-5 py-5 sm:px-7">
                <span className="font-display text-muted-foreground text-xl font-bold">
                  Adobe Illustrator
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => {
              const [label, vc, ai] = ROW_TEXT[row];
              return (
                <tr
                  key={row}
                  className={cn(i % 2 === 0 && 'bg-foreground/[0.025]')}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top text-sm font-semibold sm:px-7"
                  >
                    {label()}
                  </th>
                  <td className="px-5 py-4 align-top text-[15px] leading-relaxed sm:px-7">
                    {vc()}
                  </td>
                  <td className="text-muted-foreground px-5 py-4 align-top text-[15px] leading-relaxed sm:px-7">
                    {ai()}
                  </td>
                </tr>
              );
            })}
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
        {m['vc.cmp.note']()}
      </p>
    </Section>
  );
}
