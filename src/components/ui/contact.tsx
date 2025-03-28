import { cn } from "@/lib/utils";

 * @ Modified time: 2025-03-29 01:08:37
	const baseClass = 'text-body mt-8 opacity-30 text-white lg:text-right text-center';
	const animationClass = 'motion-translate-y-in-50 motion-opacity-in-0 motion-delay-500';
	
	return (
		<p className={ cn(baseClass, animationClass) }>
			Questions or concerns? Call us at:
			<br />
			<span className="font-semibold">09270251730</span>
		</p>)
}