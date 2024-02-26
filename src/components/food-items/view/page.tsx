import { Icons, Container, TitleBar,  ContentContainer, Title } from "./style";

import { FoodItem } from '../types';
import Like from './like';
import ContentStuff from './content';
import CallToAction from './call-to-action';
import ImageGallery from "./image-gallery";
import Image from "next/image";

const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const getRandomImageUrl = () => `https://placehold.co/500x500/333/${genRanHex(6)}`;
const imageUrl = getRandomImageUrl();

/* https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript */

const ViewFoodItemPage = ({ foodItem }: { foodItem: FoodItem }) => {
  return (
    <Container>
      {/* <ImageGallery foodItem={foodItem} /> -- this worked -- but didn't know how to apply it with the provided API */}
      <Image alt={foodItem.attributes.Title} src={imageUrl} className="w-full" width="500" height="500" />   
      <ContentContainer>
        <TitleBar>
          <Title>
            {foodItem.attributes.Title}
          </Title>
          <Icons>
            <Like />{/* this is a like button */}
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
