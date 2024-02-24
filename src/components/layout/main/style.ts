import { classed } from "@tw-classed/react";

export const Container = classed.div("bg-white flex flex-col items-center h-full w-full");

export const Content = classed.div("w-full h-full flex-1 relative");

export const ContentContainer = classed.div("container max-w-md mx-auto h-full");
export const ContentInner = classed.div("h-full w-full flex flex-col items-center justify-center");