import { Icons, Container, TitleBar,  ContentContainer, Title, ImageContainer } from "./style";

import { FoodItem } from '../types';
import Like from './like';
import ContentStuff from './content';
import CallToAction from './call-to-action';
import Image from "next/image";

const ViewFoodItemPage = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <Container>
      <ImageContainer>         
        <Image src={foodItem.images[0].url} alt={foodItem.name} width="500" height="500" />
      </ImageContainer>
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
