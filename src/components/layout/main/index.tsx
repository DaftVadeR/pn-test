import { auth } from "@/auth";

import { Container, Content, ContentContainer, ContentInner } from "./style";
import { redirect } from "next/navigation";

export default async function MainTemplate({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if(!session || !session.user || !session.user.email) {
    console.log('no session, redirecting', session);
    return redirect('/login');
  }

  return (
    <Container>
      <Content>
        <ContentInner>
          <ContentContainer>
            {children}
          </ContentContainer>
        </ContentInner>
      </Content>
    </Container>
  );
};