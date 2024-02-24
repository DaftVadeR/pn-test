
'use client';

import {Tabs, Button, NarrowUnderline } from './style';

type TabProps = {
  items: string[],
  active: string,
  onChangeTab: (tab: string) => void
};

export default function TabsList({ active, onChangeTab, items }: TabProps) {
  console.log('active', active, 'items', items);
  return (
    <Tabs role="tablist">
      {items.map((item, i) => (
        <Button key={i} role="tab" onClick={() => onChangeTab(item)} className={active === item ? 'tab-active' : ''}>
          <NarrowUnderline>
            {item}
          </NarrowUnderline>
        </Button>
      ))}
    </Tabs>
  );
}