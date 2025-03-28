'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SITE_TITLE } from '@/lib/constants';
import { Title } from '@/components/ui/title';

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      {/* Thank you message */}
      <div className="text-center mb-10">
        <h2 className="text-white-header-1 mb-4">Thank you for using<br />our service!</h2>
        <Link href="/" target="_blank" className="text-header-2 text-blue-600 opacity-70 hover:opacity-50 underline transition-opacity">Go back home.</Link>
        <br />
        <br />
        <br />
        <p className="text-gray-400">Like our service? Tell others about us!</p>
      </div>

      {/* Social media links */}
      <div className="flex gap-4 mb-16">
        <Link href="https://facebook.com" target="_blank" className="bg-white p-4 rounded-lg hover:opacity-90 transition-opacity">
          <Image
            src="/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
        <Link href="https://twitter.com" target="_blank" className="bg-white p-4 rounded-lg hover:opacity-90 transition-opacity">
          <Image
            src="/twitter.svg"
            alt="Twitter"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
        <Link href="https://m.me" target="_blank" className="bg-white p-4 rounded-lg hover:opacity-90 transition-opacity">
          <Image
            src="/messenger.svg"
            alt="Messenger"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
        <Link href="https://tiktok.com" target="_blank" className="bg-white p-4 rounded-lg hover:opacity-90 transition-opacity">
          <Image
            src="/tiktok.svg"
            alt="TikTok"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
      </div>

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:<br />
        <span className="font-medium text-white">09270251730</span>
      </div>
    </main>
  );
}
