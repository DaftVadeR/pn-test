'use client';

import { useFormState, useFormStatus } from 'react-dom';
import register from '@/lib/actions/register';
import { Header, PersonImageContainer, LoginPrompt, Title, FormInner, ForgotPasswordPrompt, Form, Errors, ErrorMessage, Text, Label, Button } from './style';
import Link from 'next/link';
import Image from 'next/image';
import Password from './password';

function RegisterButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" aria-disabled={pending}>
      Register
    </Button>
  );
}

export default function RegisterForm() {
  const [errorMessage, dispatch] = useFormState(register, undefined);
 
  return (
    <Form action={dispatch}>
      <FormInner>
        <Header>
          <Title>
            Register
          </Title>
          <PersonImageContainer>
            <Image src={'/girl-register.svg'} alt='Girl' width={129} height={317} />
          </PersonImageContainer>
        </Header> 
        <Errors
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Errors>
        <div className="w-full">
          <div>
            <Label
              htmlFor="username"
            >
              username
            </Label>
            <div className="relative">
              <Text
                id="username"
                type="username"
                name="username"
                placeholder="superkiller99"
                required
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="email"
            >
              email
            </Label>
            <div className="relative">
              <Text
                id="email"
                type="email"
                name="email"
                placeholder="yourmail@mail.com"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <Label
              htmlFor="password"
            >
              password
            </Label>
            <Password />
          </div>
        </div>
        <RegisterButton />
        <LoginPrompt>Have an account? <Link className='font-bold hover:underline' href={'/login'}>Login</Link></LoginPrompt>
      </FormInner>
    </Form>
  );
}

