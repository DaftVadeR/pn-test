import { classed } from '@tw-classed/react';

// export const Body = classed.body("overflow-y-auto bg-white h-full w-full");
// export const Html = classed.html('h-full w-full overflow-hidden bg-white');

export const Container = classed.div("h-full flex flex-col");
export const LogoContainer = classed.div("flex-0 mt-20 text-center text-white mx-auto");
export const Content  = classed.div("px-4 flex-1");
export const Paragraph = classed.div("text-lg font-normal mb-8 mt-4 text-white text-center max-w-60 mx-auto");
export const Button = classed.a("btn btn-lg border-none btn-block bg-white text-primaryGreen active:bg-neutral active:text-white");
export const Cta = classed.div("flex-0 px-4 pb-16");

export const PeopleIcons = classed.div("flex-0 mb-16 mt-16 flex flex-nowrap items-center justify-center");