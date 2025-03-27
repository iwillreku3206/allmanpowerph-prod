import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from "@/lib/utils";
import { useState } from 'react';

export function CardStep({ title = '', description = '', first = false, nav = true, nextStep, prevStep, children }: {
	title?: string,
	description?: string,

	first?: boolean,
	nav?: boolean,
	nextStep: Function,
	prevStep: Function,
	children: React.ReactNode
}) {

	// Classes
	const baseClass = 'bg-white rounded-md p-10 lg:w-[600px]';
	const animationClass = 'motion-translate-y-in-[10%] motion-opacity-in-0 motion-delay-200';

	return (
		<div className={ cn(baseClass, animationClass) }>
			
			{/* Header and Description */}
			<h2 className="text-header-1 mb-8 leading-[1.15]" dangerouslySetInnerHTML={{ __html: title }}></h2>
			<p className="text-body mb-6" dangerouslySetInnerHTML={{ __html: description }}></p>
			{ children }

			{/* Navigation Buttons */}
			<div className="w-full flex flex-row space-x-4">
				{ !first && nav &&
					<Button className="bg-primary w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150" 
						onClick={ () => prevStep() }>
						Go back
					</Button> 
				}
				{ nav && 
					<Button className="bg-primary w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150" 
						onClick={ () => nextStep() }>
						Next
					</Button>
				}
			</div>
		</div>
	)
}