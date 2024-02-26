import LoginTemplate from "@/src/components/layout/login";

export default function LoginPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginTemplate backUrl="/">
      {children}
    </LoginTemplate>
  );
}