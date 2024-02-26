'use client';

import { useFormState, useFormStatus } from 'react-dom';
import authenticate from '@/lib/actions/authenticate';
import { RegisterPrompt, Title, FormInner, Form, Errors, ErrorMessage } from './style';
import Link from 'next/link';

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button type="submit" className="mt-8 btn btn-block btn-primary btn-lg" aria-disabled={pending}>
      Log in
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
  return (
    <Form action={dispatch}>
      <FormInner>
        <Title>
          Login
        </Title> 
        <Errors
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Errors>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <RegisterPrompt>Don’t have an account? <Link href={'/register'}>Register</Link></RegisterPrompt>
      </FormInner>
    </Form>
  );
}

