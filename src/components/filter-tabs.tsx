'use client';

export function FilterTabs({ items, active, onChange, label }: {
  items: readonly { value: string; label: string; count: number }[];
  active: string; onChange: (value: string) => void; label: string;
}) {
  return <div className="filter-row" role="group" aria-label={label}>{items.map(item => <button className="filter-tab" type="button" key={item.value} aria-pressed={active === item.value} onClick={event => { onChange(item.value); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }}>{item.label}<span>{item.count}</span></button>)}</div>;
}
