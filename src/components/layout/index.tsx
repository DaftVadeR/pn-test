import { Inter } from "next/font/google";
import { Body, Html } from './style';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Html lang="en" className={`${inter.className}`}>
      <Body className="">
        {children}
      </Body>
    </Html>
  );
}