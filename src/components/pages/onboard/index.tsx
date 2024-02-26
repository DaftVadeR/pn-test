import Image from 'next/image';
import {Container, LogoContainer, PeopleIcons, Content, Paragraph, Cta, Button} from './style';

export default function Onboard() {
  return (
    <Container>
      <LogoContainer>
        <Image className='mx-auto' src={'/logo.svg'} alt='CiaoChow' width={197} height={35} />
      </LogoContainer>
      <PeopleIcons>
        <Image src={'/girl-onboard.svg'} alt='Girl' width={125} height={285} />
        <Image src={'/dude-onboard.svg'} alt='Dude' width={145} height={230} />
      </PeopleIcons>
      <Content>
        <Paragraph>
          Hungry? <strong>CiaoChow</strong> helps you find something to eat.
        </Paragraph>
      </Content>
      <Cta><Button href="/register">Get Started</Button></Cta>
    </Container>
  );
};