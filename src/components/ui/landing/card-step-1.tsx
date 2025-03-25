import { useContext, useState } from "react"
import { SITE_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { InputCard } from "@/components/input-card";
import { FormContext } from "@/components/contexts/form-data";

export function CardStep1() {

	// Show the first field
	const [ showLocationInput, setShowLocationInput ] = useState(false);
	const {
		getField,
		setField,
		getJSON,
	} = useContext(FormContext);

	return (
	<InputCard>	
		<h2 className="text-header-1 mb-8 leading-[1.15]">
			Looking for a <span className="text-primary">yaya</span>?<br />
			We got you covered!
		</h2>
		<p className="text-body mb-6">{SITE_DESCRIPTION}</p>
		
		{!showLocationInput ? (
			<Button 
				className="bg-primary text-body w-full" 
				text="Get Started!" 
				onClick={ () => setShowLocationInput(true) } 
			/>
		) : (
			<div>
				<h3 className="text-header-2 mb-4">
					To start, tell us where you're at!
				</h3>
				<div className="mb-4">
					<Input
						className="w-full"
						placeholder="Location Address"
						onChange={ (e) => setField('location', e.target.value) }
					/>
				</div>
				<Button 
					className="bg-primary w-full" 
					text="Next"
					onClick={ () => {} }
				/>
			</div>
		)}
	</InputCard>
	)
}