'use client';

import { Title } from '@/components/ui/title';
import { Input } from '@/components/input';
import { ResumeTable } from '@/components/table';

const candidates = [
  { name: "M***** J*** D****", location: "Matandang Balara, Quezon City", skills: "cooking, rearing", bestMatch: true },
  { name: "B*** R*** O****", location: "Matandang Balara, Quezon City", skills: "cooking, cleaning" },
  { name: "Y**** E*** S****", location: "Loyola Heights, Quezon City", skills: "cleaning, rearing" },
  { name: "H** A****** H****", location: "Tandang Sora, Quezon City", skills: "cooking, dishwashing" },
  { name: "S*** S***** S********", location: "Matandang Balara, Quezon City", skills: "rearing, tutoring" },
  { name: "C**** A** T**", location: "Tandang Sora, Quezon City", skills: "cleaning, laundry" },
];

export default function Dummy() {
	return (
		<main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
			{/* Logo */}
			<Title />

			<ResumeTable resumes={ candidates } columns={ [ 'one', 'two', 'three' ] }>
				
			</ResumeTable>

			{/* Contact info */}
			<div className="text-center text-sm text-gray-400">
				Questions or concerns? Call us at:<br />
				<span className="font-medium text-white">09620900909</span>
			</div>
		</main>
	);
}
