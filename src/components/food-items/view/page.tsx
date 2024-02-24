import { Icons, Container, TitleBar,  ContentContainer, Title, ImageContainer } from "./style";

import { FoodItem } from '../types';
import Like from './like';
import ContentStuff from './content';
import CallToAction from './call-to-action';

const ViewFoodItemPage = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <Container>
      <ImageContainer>         
        <img src={foodItem.images[0].url} alt={foodItem.name} />
      </ImageContainer>
      <ContentContainer>
        <TitleBar>
          <Title>
            {foodItem.name}
          </Title>
          <Icons>
            <Like foodItemId={foodItem.id} isLiked={foodItem.likes.length > 0} />
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
