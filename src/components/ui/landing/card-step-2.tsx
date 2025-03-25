import { useState } from "react"
import { SITE_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CardStep2() {

	const animationClass = 'motion-translate-y-in-[10%] motion-opacity-in-0 motion-delay-200';
	const [ showLocationInput, setShowLocationInput ] = useState(false);

	// ! move into a context
  const [location, setLocation] = useState('');

	// ! move later
	const router = useRouter();

	const handleNext = () => {
    if (location.trim()) {
      router.push(`/requirements?location=${encodeURIComponent(location)}`);
    }
  };

	return (
		<div className={ cn(animationClass, " bg-white rounded-md p-10 lg:w-[600px]") }>
			<h2 className="text-header-1 mb-8 leading-[1.15]">
				Looking for a <span className="text-primary">yaya</span>?
				<br />
				We got you covered!
			</h2>
			<p className="text-body mb-6">{SITE_DESCRIPTION}</p>
			
			{!showLocationInput ? (
				<Button 
					className="bg-primary text-body w-full" 
					onClick={ () => setShowLocationInput(true) } 
					text="Get Started!" />
			) : (
				<div>
					<h3 className="text-header-2 mb-4">To start, tell us where you're at!</h3>
					<div className="mb-4">
						<Input
							className="w-full"
							placeholder="Location Address"
							value={ location }
							onChange={ (e) => setLocation(e.target.value) }
						/>
					</div>
					<Button 
						className="bg-primary w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150" 
						onClick={ () => handleNext() }
						text="Next"/>
				</div>
			)}
		</div>
	)
}