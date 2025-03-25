import { SITE_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Title() {
	const baseClass = 'text-logo mb-8';
	const animationClass = 'motion-translate-x-in-[-5%] motion-opacity-in-0';

	return (<h1 className={ cn(baseClass, animationClass) }> {SITE_TITLE} </h1>)
}