'use client';

import { Title } from '@/components/ui/title';
import { Input } from '@/components/input';
import { Table } from '@/components/table';

export default function Dummy() {
	return (
		<main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
			{/* Logo */}
			<Title />

			<Table columns={ [ 'one', 'two', 'three' ] }>
				
			</Table>

			{/* Contact info */}
			<div className="text-center text-sm text-gray-400">
				Questions or concerns? Call us at:<br />
				<span className="font-medium text-white">09620900909</span>
			</div>
		</main>
	);
}
