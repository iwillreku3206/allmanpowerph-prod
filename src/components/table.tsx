import { cn } from "@/lib/utils"
import { FormEventHandler, useState } from "react"
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const candidates = [
  { name: "M***** J*** D****", location: "Matandang Balara, Quezon City", skills: "cooking, rearing", bestMatch: true },
  { name: "B*** R*** O****", location: "Matandang Balara, Quezon City", skills: "cooking, cleaning" },
  { name: "Y**** E*** S****", location: "Loyola Heights, Quezon City", skills: "cleaning, rearing" },
  { name: "H** A****** H****", location: "Tandang Sora, Quezon City", skills: "cooking, dishwashing" },
  { name: "S*** S***** S********", location: "Matandang Balara, Quezon City", skills: "rearing, tutoring" },
  { name: "C**** A** T**", location: "Tandang Sora, Quezon City", skills: "cleaning, laundry" },
];

export function Table({ className = '', columns = [], rows = [], rowMapper = () => { (<td></td>) }, ...props }: {
	className?: string,
	columns?: string[],
	rows?: string[][],
	rowMapper?: Function,
	onChange?: FormEventHandler
}) {

	// Base class
	const [ selected, setSelected ] = useState([]);

	// Handle clicks
	const handleClick = (candidate) => {

		// Add if not there
		if (!selected.includes(candidate))
			setSelected([ ...selected, candidate ])

		// Remove if there
		else
			setSelected(selected.filter(c => c !== candidate))
	}

	// The table
	return (
		<div className="">
			<table className="w-full rounded-md bg-white font-bodyfont border-collapse">
				<thead>
					<tr className="text-left text-gray-400 border-b border-gray-700">
						<th className="px-6 py-3">Name</th>
						<th className="py-3">Location</th>
						<th className="py-3">Skills</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map((candidate, index) => (
						<tr key={ index } className={ `${candidate.bestMatch ? "bg-green-200 text-black" : "text-gray-300"} hover:bg-gray-800 cursor-pointer` } onClick={ () => handleClick(candidate) }>
							<td className="pl-6 px-4 py-3 flex items-center gap-4">
								<input type="checkbox" checked={ selected.includes(candidate) } readOnly className="form-checkbox" />
								{ candidate.name }
							</td>
							<td className="pr-8">{ candidate.location }</td>
							<td className="pr-8">{ candidate.skills } { candidate.bestMatch && <span className="text-green-600 font-semibold">(Best Match)</span> }</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex flex-col justify-between items-center mt-4">
				<div className="flex flex-row justify-center">
					<ChevronLeft className="w-5 h-5" /> 
						<div className="ml-1"></div> 1 / 15 
						<div className="ml-1"></div>
					<ChevronRight className="w-5 h-5" />
				</div>
				<br />
				<Button className="bg-primary">View Selected</Button>
			</div>
			<br />
		</div>
	)
}