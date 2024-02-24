'use client';

import { useState } from 'react';
import Tabs from '../tabs';
import { Content, TabContainer } from './style';
import { FoodItem } from '../../types';

const DESCRIPTION = "Description";
const NUTRITION = "Nutrition Facts";

const ContentStuff = ({ foodItem }: { foodItem: FoodItem }) => {
  const [currentTab, setTab] = useState<string>(DESCRIPTION);

  return (
    <>
      <Tabs
        items={[
          DESCRIPTION,
          NUTRITION
        ]}
        onChangeTab={setTab}
        active={currentTab}
      />
      {currentTab === DESCRIPTION &&
        <TabContainer>
          <Content dangerouslySetInnerHTML={{__html: foodItem.description.replace("\n", "<br/><br/>")}} />    
        </TabContainer>}
      {currentTab === NUTRITION &&
        <TabContainer>
          <Content dangerouslySetInnerHTML={{__html: foodItem.nutritional_facts}} />
        </TabContainer>}
    </>
  );
};

export default ContentStuff;