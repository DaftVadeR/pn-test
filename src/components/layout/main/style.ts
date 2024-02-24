import { classed } from "@tw-classed/react";

export const Container = classed.div("flex flex-col items-center min-h-full w-full");

export const Content = classed.div("w-full h-full flex-1 relative ");

export const ContentContainer = classed.div("container 2xl pt-8");
export const ContentInner = classed.div("flex flex-col items-center justify-center");