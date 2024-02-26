import { classed } from '@tw-classed/react';

export const Container = classed.div('mb-12 min-h-full w-full flex flex-col items-center justify-center');
export const RegisterPrompt = classed.div('');
export const Title = classed.div('mb-3 text-2xl text-white text-center');
export const Errors = classed.div('flex h-8 items-end space-x-1');
export const ErrorMessage = classed.p('text-sm text-red-500');
export const FormInner = classed.div('flex-1 rounded-lg');
export const Form = classed.form('space-y-3');