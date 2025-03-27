import { useContext, useState } from "react"
import { SITE_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";

export function CardStep1({ nextStep, prevStep, step }: {
	nextStep: Function,
	prevStep: Function,
	step: number,
}) {

	// Show the first field
	const { getField, setField, getAll } = useContext(FormContext);
	const [ showLocationInput, setShowLocationInput ] = useState(false);
	const [ location, setLocation ] = useState(getField('location'));
	const [ error, setError ] = useState('');

	// Update state
	const handleChange = (value) => {
		setLocation(value)
		setField('location', value);
	}

	// Handles when next button pressed
	const handleNext = () => {
		setError('')
		if (!location || location === '')
			return setError('Location is required.')
		return nextStep()
	}

	return (
		<CardStep 
			title="Looking for a yaya?<br> We got you covered" 
			description={ SITE_DESCRIPTION } 
			nextStep={ nextStep } 
			prevStep={ prevStep }
			nav={ false }
			first>
			
			{!showLocationInput && step === 0 

				// Hide location input at get started (step 0)
				? (<Button className="bg-primary text-body w-full"
					onClick={ () => (nextStep(), setShowLocationInput(true)) }>
						Get Started!
					</Button>) 

				// Show location input after pressing button, never to return again
				: (<>
					<h3 className="text-header-2 mb-4">To start, tell us where you're at!</h3>
					<div className="mb-4">
						<div className="text-red-500 font-bodyfont mb-4">
							{ error }
						</div>
						<Input className="w-full" placeholder="Location Address" value={ location }
							onKeyDown={ (e) => e.key === 'Enter' ? handleNext() : null }
							onChange={ (e) => handleChange(e.target.value) }/>
						<Button className="bg-primary text-body w-full mt-4"
							onClick={ () => handleNext() }>
								Next
						</Button>
					</div></>)
			}
		</CardStep>)
}