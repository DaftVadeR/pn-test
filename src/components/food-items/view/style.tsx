
import { classed } from "@tw-classed/react";

export const Container = classed.div("mb-12 min-h-full w-full flex flex-col items-center justify-center");
export const ContentContainer = classed.div("flex-1 w-full p-8 bg-altGray rounded-box overflow-hidden -mt-24 relative");

export const ImageContainer = classed.div("flex-0");


export const DividerSpace = classed.div("flex flex-col w-full");

export const Divider = classed.div("divider");

export const TitleBar = classed.div("flex flex-row items-center mb-8");
export const Title = classed.div("text-2xl font-semibold flex-1 text-ellipsis whitespace-nowrap overflow-hidden text-neutral");
export const Icons = classed.div("whitespace-nowrap w-8");
