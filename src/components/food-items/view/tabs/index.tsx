
'use client';

import {Tabs, Button, NarrowUnderline } from './style';

type TabProps = {
  items: string[],
  active: string,
  onChangeTab: (tab: string) => void
};

export default function TabsList({ active, onChangeTab, items }: TabProps) {
  return (
    <Tabs role="tablist">
      {items.map((item, i) => {
        let isActive = active === item;
        return (
          <Button key={i} role="tab" onClick={() => onChangeTab(item)} className={isActive ? 'tab-active' : ''}>
            <NarrowUnderline>
              {item}
            </NarrowUnderline>
          </Button>
        );
      })}
    </Tabs>
  );
}