import { cn } from "@/lib/utils";

export function ProgressIndicator({ step = 0, totalSteps = 1 }: {
	step: number,
	totalSteps: number,
}) {

	const baseClass = 'w-full text-header-1 bg-transparent transition-all duration-300 opacity-70 text-primary-header-2 text-right pb-8';
	const animationClass = 'motion-opacity-in-0 motion-translate-y-in-[10%]';

	return (
		<div className={ cn(baseClass, animationClass) }>
			Step { step } of { totalSteps }
		</div>
	)	
}