import { cn } from "@/lib/utils";

export function InputCard({ children }: { 
	children: React.ReactNode 
}) {

	const baseClass = 'bg-white rounded-md p-10 lg:w-[600px]'
	const animationClass = 'motion-translate-y-in-[10%] motion-opacity-in-0 motion-delay-200';

	return (
		<div className={ cn(baseClass, animationClass) }>
			{ children }
		</div>
	)
}