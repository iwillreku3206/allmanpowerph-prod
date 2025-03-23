'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SITE_TITLE } from '@/lib/constants';

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <h1 
        className="text-7xl font-bold mb-12 text-[#FF5733]"
        style={{
          fontFamily: "'Arial Black', 'Helvetica Black', sans-serif",
          letterSpacing: '0.5px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        {SITE_TITLE}
      </h1>

      {/* Thank you message */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Thank you for using<br />our service!</h2>
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
        <span className="font-medium text-white">09620900909</span>
      </div>
    </main>
  );
}
