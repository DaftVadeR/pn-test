import Link from "next/link";
import { Container,  } from "./style";
import Image from "next/image";

export type BackBarProps = {
  backUrl?: string;
}

export default async function BackBar({ backUrl = '' }: BackBarProps) {
  if(!backUrl) {
    return;
  }
  return (
    <Container>
      <Link href={backUrl}><Image src='/chevron-left.svg' alt='Back' width={24} height={24} /></Link>
    </Container>
  );
};