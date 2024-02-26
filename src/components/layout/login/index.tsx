import { auth } from "@/auth";

import { Container, Content, ContentContainer, ContentInner } from "./style";
import { redirect } from "next/navigation";
import BackBar from './back-bar';

export type LoginTemplateProps = {
  backUrl?: string;
  children: React.ReactNode;
  bgClass?: string;
}

export default async function LoginTemplate({ bgClass = '', children, backUrl = '' }: LoginTemplateProps) {
  const session = await auth();

  if(session && session.user?.email) {
    console.log('has session, redirecting', session);
    return redirect('/food-items');
  }

  return (
    <Container>
      <Content>
        <ContentInner>
          <ContentContainer className={bgClass}>
            <BackBar backUrl={backUrl} />
            {children}
          </ContentContainer>
        </ContentInner>
      </Content>
    </Container>
  );
};