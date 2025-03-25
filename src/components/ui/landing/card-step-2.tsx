import { Input } from '@/components/input';
import { useContext, useState } from 'react';
import { FormContext } from '@/components/contexts/form-data';
import { CardStep } from './card-step';
import { Button } from '@/components/button';

export function CardStep2({ nextStep, prevStep }: {
	nextStep: Function,
	prevStep: Function,
}) {

	// Updating actual form data of root component context
	const { setField, renameField, removeField, getAll } = useContext(FormContext);
	
	// Utils for state
	type Qual = { [key: string]: string | undefined };
	const key = (qual: Qual) => Object.keys(qual)[0];
	const val = (qual: Qual) => Object.values(qual)[0];

	// Updates a single qual key
	const updateKey = (qual: Qual, newKey: string): Qual[] => {
		const newquals = quals.map(q => 
			key(q) === key(qual) ? ({ [newKey]: val(q) }) : q)

		renameField(key(qual), newKey);
		setQuals(newquals);
		return newquals;
	}

	// Updates a single qual val
	const updateVal = (qual: Qual, newVal: string): Qual[] => {
		const newquals = quals.map(q => 
			key(q) === key(qual) ? ({ [key(q)]: newVal }) : q)
		
		setField(key(qual), newVal)
		setQuals(newquals);
		return newquals;
	}

	// Add a new qual if none are blank
	const addQual = () => {
		if (!quals.filter(q => key(q) === '').length)
			setQuals([ ...quals, { '': '' } ])
	}

	// Remove quality
	const removeQual = (qual: Qual) => {
		setQuals(quals.filter(q => key(q) !== key(qual)))
		removeField(key(qual))
	}

	// Local state
	const [ quals, setQuals ]: [ quals: Qual[], setQuals: Function ] = useState(getAll());

	return (
		<CardStep 
			title="What qualities do you want in your yaya?"
			description="Tell us more about your ideal yaya. The more info you give us, the better our search results will be!"
			nextStep={ nextStep }
			prevStep={ prevStep }>

			{ quals.filter(qual => key(qual) !== 'location').map(qual => 
				(<div className="flex flex-row space-x-2 mb-2 motion-preset-pop motion-duration-200">
					<div className="w-full">
						<Input className="w-full" placeholder="Enter qualification" value={ key(qual) }
							onChange={ (e) => updateKey(qual, e.target.value) }/>
					</div>
					<span className="text-header-2 opacity-50">=</span>
					<div className="w-full">
						<Input className="w-full" placeholder="Enter value" value={ val(qual) }
							onChange={ (e) => updateVal(qual, e.target.value) }/>
					</div>
					<button className='btn px-3'>
						<img className="h-12 object-contain hover:motion-preset-stretch-md" 
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s" 
							alt="delete" 
							onClick={ () => removeQual(qual) } />
					</button>
				</div>)) 
			}


			{/* Create new qual */}
			<div className="w-full flex flex-row justify-end">	
				<button className='btn'>
					<img className="h-10 object-contain hover:motion-rotate-in-6" 
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfn7uj7dTALaziP49MuhdLbetpeqAatqjRGA&s" 
						alt="delete" 
						onClick={ () => addQual() } />
				</button>
			</div>
			<br></br>
		</CardStep>
	)
}