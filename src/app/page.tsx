'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SITE_TITLE, SITE_DESCRIPTION, LANDING_BG } from '@/lib/constants';

export default function Home() {
  const router = useRouter();
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState('');

  const handleNext = () => {
    if (location.trim()) {
      router.push(`/requirements?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <main className="min-h-screen relative bg-gray-900">
      {/* Background image with darker overlay */}
      <Image
        src={LANDING_BG}
        alt="Background"
        fill
        className="object-cover opacity-30"
        priority
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col min-h-screen">
        <div className="flex flex-col items-center lg:items-end justify-center flex-1 py-8">
          <h1 
            className="text-7xl font-bold mb-16 text-[#FF5733]"
            style={{
              fontFamily: "'Arial Black', 'Helvetica Black', sans-serif",
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {SITE_TITLE}
          </h1>
          
          <div className="bg-white rounded-xl p-8 w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold text-black mb-4">
              Looking for a helper?
              <br />
              <span className="text-[#FF5733]">We got you covered!</span>
            </h2>
            <p className="text-black mb-6">{SITE_DESCRIPTION}</p>
            
            {!showLocationInput ? (
              <button
                onClick={() => setShowLocationInput(true)}
                className="bg-[#FF5733] text-black px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#E64A2E] transition-colors shadow-lg w-full"
              >
                Get Started!
              </button>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-black mb-4">To start, tell us where you're at!</h3>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Location Address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="bg-[#FF5733] text-black px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#E64A2E] transition-colors shadow-lg w-full"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 text-sm text-white/90 text-center lg:text-right lg:pr-4">
            Questions or concerns? Call us at:
            <br />
            <span className="font-semibold">09620900909</span>
          </p>
        </div>
      </div>
    </main>
  );
}
