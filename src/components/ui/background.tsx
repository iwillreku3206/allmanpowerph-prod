import Image from "next/image";
import { LANDING_BG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Background() {
	const baseClass = 'object-cover opacity-50';
	const animationClass = 'motion-translate-x-in-[-5%] motion-blur-in-md';

	return (
		<Image 
			className={ cn(baseClass, animationClass) } 
			src={ LANDING_BG } 
			alt="Background" 
			fill priority 
		/>
	)
}