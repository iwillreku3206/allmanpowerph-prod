import { cn } from "@/lib/utils";

export function ProgressBar({ step = 0, totalSteps = 1 }: {
	step: number,
	totalSteps: number,
}) {

	const baseClass = 'fixed h-3 transition-all duration-300';
	const animationClass = 'motion-opacity-in-0 motion-translate-y-in-[-100%]';

	return (
		<>
			<div className={ cn(baseClass, animationClass, 'w-full bg-white') }></div>
			<div 
				className={ cn(baseClass, animationClass, `w-full bg-primary`) }
				style={{ right: (100 - 100 * step / totalSteps) + '%' }}>
			</div>
			<div 
				className={ cn(baseClass, animationClass, 'motion-preset-blink', `w-full bg-black/20`) }
				style={{ right: (100 - 100 * step / totalSteps) + '%' }}>
			</div>
		</>
	)	
}