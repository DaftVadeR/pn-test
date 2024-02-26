import { classed } from '@tw-classed/react';

export const Container = classed.div('mb-12 min-h-full w-full flex flex-col items-center justify-center');
export const LoginPrompt = classed.div('mt-8 text-center text-sm text-primaryGreen');
export const PersonImageContainer = classed.div('pr-4');
export const Header = classed.div('flex items-center justify-center');
export const Title = classed.div('mb-3 text-4xl font-bold text-white flex-1');
export const Errors = classed.div('flex h-8 items-end space-x-1');
export const ErrorMessage = classed.p('text-sm block border-neutral-500 text-center text-neutral p-4 border-2 bg-white w-full');
export const FormInner = classed.div('flex-1 rounded-lg p-4');
export const Form = classed.form('space-y-3');

export const ForgotPasswordPrompt = classed.a('float-right text-xs text-primaryGreen mt-2 hover:underline');

export const Text = classed.input('peer block w-full rounded-md bg-altGray px-2 py-3 text-sm outline-2 placeholder:text-gray-500 focus:outline-primaryGreen border-none text-neutral');
export const Label = classed.label('mb-1 mt-5 block text-md font-medium text-primary-content');

export const Button = classed.button("mt-8 btn btn-lg border-none btn-block bg-primaryGreen text-white active:bg-primaryGreen");
export const Cta = classed.div("flex-0 px-4 pb-16");