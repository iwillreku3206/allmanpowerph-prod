import { cn } from "@/lib/utils"
import { FormEventHandler, useState } from "react"
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The interface of each resume
interface Resume {
	name: string,
	monthlySalary: number,
	agencyFee: number,
	resume: string,
	[key: string]: number | string | string[],
}

/**
 * Converts each resume into a formatted table row element.
 */
const resumeMapper = (resume: Resume, onClick: Function, checked: boolean = false) => {
	return (
		<tr 
			key={ JSON.stringify(resume) }
			className={ cn('hover:bg-gray-800 cursor-pointer', resume.bestMatch ? 'bg-green-200 text-black' : 'text-gray-300') }
			onClick={ onClick }>

			<td className="pl-6 px-4 py-3 flex items-center gap-4 text-primary-foreground">
				<input type="checkbox" checked={ checked } readOnly className="form-checkbox" />
				{ resume.name }
			</td>
			<td className="pr-8 text-primary-foreground">{ resume.location }</td>
			<td className="pr-8 text-primary-foreground">{ resume.skills } { resume.bestMatch && <span className="text-green-600 font-semibold">(Best Match)</span> }</td>
		</tr>)
}

export function ResumeTable({ className = '', columns = [], resumes = [], ...props }: {
	className?: string,
	columns?: string[],
	resumes?: Resume[],
	rowMapper?: Function,
	onChange?: FormEventHandler
}) {

	// Base class
	const resumesPerPage = 7;
	const maxPage = Math.floor(resumes.length / resumesPerPage);
	const [ currentPage, setCurrentPage ] = useState(0);
	const [ selectedResumes, setSelectedResumes ] = useState([] as Resume[]);
	const startResume = (currentPage) * resumesPerPage;
	const endResume = (currentPage + 1) * resumesPerPage;

	// Handle clicks
	const handleClick = (resume: Resume) => {

		// Add if not there
		if (!selectedResumes.includes(resume))
			setSelectedResumes([ ...selectedResumes, resume ])

		// Remove if there
		else
			setSelectedResumes(selectedResumes.filter(c => c !== resume))
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
					{ 
						resumes
							.slice(startResume, endResume)
							.map((resume) => resumeMapper(resume, () => handleClick(resume), selectedResumes.includes(resume))) 
					}
				</tbody>
			</table>
			<div className="flex flex-col justify-between items-center mt-4">
				<div className="flex flex-row justify-center">
					<Button className="" onClick={ () => { setCurrentPage(Math.max(currentPage - 1, 0)) } }>
						<ChevronLeft className="w-5 h-5" /> 
					</Button>
					<div className="flex flex-col justify-center items-center">{ currentPage + 1 }/{ maxPage + 1 }</div> 	
					<Button className="" onClick={ () => { setCurrentPage(Math.min(currentPage + 1, maxPage)) } }>
						<ChevronRight className="w-5 h-5" />
					</Button>
				</div>
				<br />
				<Button className="bg-primary">View Selected</Button>
			</div>
			<br />
		</div>
	)
}