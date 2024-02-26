import { classed } from "@tw-classed/react";

export const Container = classed.div("flex flex-col items-center h-full w-full");

export const Content = classed.div("w-full h-full flex-1");

export const ContentContainer = classed.div("container mx-auto h-full sm:max-w-full md:max-w-md bg-green-circle relative");
export const ContentInner = classed.div("h-full w-full flex flex-col items-center justify-center bg-white");