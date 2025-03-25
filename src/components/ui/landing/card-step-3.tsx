import { useState } from "react"
import { SITE_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CardStep } from "./card-step";

export function CardStep3({ nextStep, prevStep }: {
	nextStep: Function,
	prevStep: Function,
}) {

	const router = useRouter();

	return (
		<CardStep 
			title="Tell us how to talk to you" 
			description="You're almost done! Just tell us how to contact you and we'll send you a list of candidates within the next few days."
			nav={ false }>
			<div className="mb-4">
				<Input
					className="w-full"
					placeholder="Email"
					onChange={ (e) => (e.target.value) }
				/>
			</div>
			<Button className="bg-primary w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150" 
				onClick={ () => {
					// ! todo submit to server side here

					// ! todo: make thank you a part of spa
					router.push('/thankyou')
				} }>Submit</Button>
		</CardStep>
	)
}