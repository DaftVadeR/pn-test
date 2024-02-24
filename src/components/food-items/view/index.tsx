import { Container, Left, ContentContainer, Right, Split, Title, ImageContainer, Content, DividerSpace, Divider} from "./style";
import {FoodItem} from '../types';

const ViewFoodItemPage = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <Container>
      <Split>
        <Left>
          <ImageContainer>         
            <img src={foodItem.images[0].url} alt={foodItem.name} />
          </ImageContainer>
        </Left>
        <Right>
          <Title>
            {foodItem.name}
          </Title>
          <ContentContainer>
            <Content dangerouslySetInnerHTML={{__html: foodItem.description}} />            
          </ContentContainer>
        </Right>
      </Split>
    </Container>
  );
};

export default ViewFoodItemPage;
