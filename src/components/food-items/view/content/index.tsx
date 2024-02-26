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
          <Content dangerouslySetInnerHTML={{__html: foodItem.attributes.Description.replace("\n", "<br/><br/>")}} />    
        </TabContainer>}
      {currentTab === NUTRITION &&
        <TabContainer>
          <Content dangerouslySetInnerHTML={{__html: foodItem.attributes.Description}} />
        </TabContainer>}
    </>
  );
};

export default ContentStuff;