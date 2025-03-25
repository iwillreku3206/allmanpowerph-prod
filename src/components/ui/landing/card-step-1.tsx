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
						<Input className="w-full" placeholder="Location Address" value={ location }
							onChange={ (e) => setField('location', e.target.value) }/>
						<Button className="bg-primary text-body w-full mt-4"
							onClick={ () => nextStep() }>
								Next
						</Button>
					</div></>)
			}
		</CardStep>)
}