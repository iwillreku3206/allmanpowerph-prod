/**
 * @ Create Time: 2025-03-28 00:02:34
 * @ Modified time: 2025-03-28 00:06:53
 * @ Description:
 * 
 * This page contains the password login for the hashed page.
 */

'use client';

import { Title } from '@/components/ui/title';
import { Input } from '@/components/input';

export default function Dummy() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

			<Input className='w-[400px]' placeholder='Enter password'>
			</Input>
			<br />

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:<br />
        <span className="font-medium text-white">09270251730</span>
      </div>
    </main>
  );
}
