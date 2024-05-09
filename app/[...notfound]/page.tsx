import { notFound } from "next/navigation";

export const dynamicParams = true;

const notFoundCatchAll = () => notFound();

export default notFoundCatchAll;
