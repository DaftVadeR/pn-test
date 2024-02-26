'use client';

import { useFormState, useFormStatus } from 'react-dom';
import authenticate from '@/lib/actions/authenticate';
import { Header, PersonImageContainer, RegisterPrompt, Title, FormInner, ForgotPasswordPrompt, Form, Errors, ErrorMessage, Text, Label, Button } from './style';
import Link from 'next/link';
import Image from 'next/image';
import Password from './password';

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" aria-disabled={pending}>
      Log in
    </Button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
  return (
    <Form action={dispatch}>
      <FormInner>
        <Header>
          <Title>
            Login
          </Title>
          <PersonImageContainer>
            <Image src={'/dude-register.svg'} alt='Dude' width={159} height={318} />
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
              htmlFor="email"
            >
              email
            </Label>
            <div className="relative">
              <Text
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
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
            <ForgotPasswordPrompt href="/forgot-password">Forgot password?</ForgotPasswordPrompt>
          </div>
        </div>
        <LoginButton />
        <RegisterPrompt>Don’t have an account? <Link className='font-bold hover:underline' href={'/register'}>Register</Link></RegisterPrompt>
      </FormInner>
    </Form>
  );
}

