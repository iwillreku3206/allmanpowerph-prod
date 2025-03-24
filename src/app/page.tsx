'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SITE_TITLE, SITE_DESCRIPTION, LANDING_BG } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      <Image src={LANDING_BG} alt="Background" className="object-cover opacity-50" fill priority />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col min-h-screen">
        <div className="flex flex-col items-center lg:items-end justify-center flex-1 py-8">
          <h1 className="text-9xl text-primary mb-16 font-logofont tracking-tight">
            {SITE_TITLE}
          </h1>
          
          <div className="bg-white rounded-xl p-12 w-[600px] shadow-2xl">
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
                  className="bg-primary w-full" 
                  onClick={ () => handleNext() }
                  text="Next"/>
              </div>
            )}
          </div>

          <p className="mt-8 text-body opacity-30 text-white text-center lg:text-right lg:pr-4">
            Questions or concerns? Call us at:
            <br />
            <span className="font-semibold">09270251730</span>
          </p>
        </div>
      </div>
    </main>
  );
}
