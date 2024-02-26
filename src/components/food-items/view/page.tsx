import { Icons, Container, TitleBar,  ContentContainer, Title } from "./style";

import { FoodItem } from '../types';
import Like from './like';
import ContentStuff from './content';
import CallToAction from './call-to-action';
import ImageGallery from "./image-gallery";

const ViewFoodItemPage = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <Container>
      <ImageGallery foodItem={foodItem} />
      <ContentContainer>
        <TitleBar>
          <Title>
            {foodItem.name}
          </Title>
          <Icons>
            <Like />
          </Icons>
        </TitleBar>
        <ContentStuff
          foodItem={foodItem}        
        />
        <CallToAction />
      </ContentContainer>
    </Container>
  );
};

export default ViewFoodItemPage;
