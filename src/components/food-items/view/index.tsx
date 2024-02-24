
import { Icons, Container, TitleBar,  ContentContainer, Title, ImageContainer } from "./style";

import { FoodItem } from '../types';
import Like from './like';
import ContentStuff from './content';

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
            <Like foodItemId={foodItem.id} />
          </Icons>
        </TitleBar>
        <ContentStuff
          foodItem={foodItem}        
        />
      </ContentContainer>
    </Container>
  );
};

export default ViewFoodItemPage;
