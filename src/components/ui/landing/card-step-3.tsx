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
	const [ error, setError ] = useState('');
	const [ email, setEmail ] = useState('');

	// Handle form submission
	const handleChange = (value) => {
		setError('');
		setEmail(value);

		// Set error message
		if (!validateEmail(value)) setError('Invalid email address.');
		else setError('');
	}

	// Form submission
	const handleSubmit = () => {
		router.push('/thankyou')
	}

	// Validate email
	const validateEmail = (email: string) => {
		if (!String(email).toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
			return false;
		return true;
	}

	return (
		<CardStep 
			title="Tell us how to talk to you" 
			description="You're almost done! Just tell us how to contact you and we'll send you a list of candidates within the next few days."
			nav={ false }>

			<div className="mb-4">
				<div className="text-red-500 font-bodyfont mb-4">
					{ error }
				</div>
				<Input
					className="w-full"
					placeholder="Email"
					onKeyDown={ (e) => e.key === 'Enter' ? handleSubmit() : null }
					onChange={ (e) => handleChange(e.target.value) }
				/>
			</div>
			<Button className="bg-primary w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150" 
				onClick={ () => handleSubmit() }>Submit</Button>
		</CardStep>
	)
}