'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SITE_TITLE, LANDING_BG } from '@/lib/constants';

export default function Requirements() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [skills, setSkills] = useState('');
  const [priceRange, setPriceRange] = useState('');
  type CustomField = {
    key: string;
    value: string;
  };

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showCustomFields, setShowCustomFields] = useState(false);

  const location = searchParams.get('location');

  const handleCustomFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setCustomFields(newFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const removeCustomField = (index: number) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
  };

  useEffect(() => {
    if (!location) {
      router.replace('/');
    }
  }, [location, router]);

  const handleBack = () => {
    router.back();
  };

  const handleProceed = () => {
    const customFieldsParam = customFields
      .filter(field => field.key.trim() && field.value.trim())
      .map(field => `${field.key}:${field.value}`)
      .join(',');
    router.push(`/matches?location=${encodeURIComponent(location)}&skills=${encodeURIComponent(skills)}&priceRange=${encodeURIComponent(priceRange)}&customFields=${encodeURIComponent(customFieldsParam)}`);
  };

  return (
    <main className="min-h-screen relative bg-black">
      <Image
        src={LANDING_BG}
        alt="Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* Progress Bar */}
      <div className="relative z-20 w-full h-2 bg-white/10">
        <div
          className="h-full bg-[#FF5733] transition-all duration-500 ease-in-out"
          style={{ width: '50%' }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 flex min-h-screen">
        <div className="flex flex-col max-w-[1280px] mx-auto w-full pt-20 gap-12">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div>
              <h1
                className="text-7xl font-bold mb-6 text-[#FF5733]"
                style={{
                  fontFamily: "'Arial Black', 'Helvetica Black', sans-serif",
                  letterSpacing: '0.5px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                {SITE_TITLE}
              </h1>
            </div>

            {/* Step indicator */}
            <div className="text-[#FF5733] text-[4rem] font-bold" style={{ fontFamily: "'Arial Black', 'Helvetica Black', sans-serif" }}>
              Step 1/2
            </div>
          </div>

          {/* Form row */}
          <div className="flex justify-end">
            <h2 className="text-4xl font-bold text-white leading-tight mr-auto">
              What else would you<br />want from your yaya?
            </h2>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl">
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="text-gray-500 text-sm">Skills:</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="What do you want your yaya to be able to do?"
                        className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">Price Range:</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        placeholder="How much is your budget for a yaya?"
                        className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {!showCustomFields ? (
                    <button
                      onClick={() => {
                        setShowCustomFields(true);
                        setCustomFields([{ key: '', value: '' }]);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 text-[#FF5733] hover:text-[#E64A2E] transition-colors border-2 border-dashed border-[#FF5733] rounded-lg hover:bg-[#FF5733]/5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Custom Requirements
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-gray-500 text-sm">Custom Fields:</label>
                        {customFields.length === 0 && (
                          <button
                            onClick={() => setShowCustomFields(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      {customFields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.key}
                              onChange={(e) => handleCustomFieldChange(index, 'key', e.target.value)}
                              placeholder="Qualification"
                              className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                              placeholder="Requirement"
                              className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                            />
                          </div>
                          <button
                            onClick={() => {
                              if (customFields.length === 1) {
                                setShowCustomFields(false);
                                setCustomFields([]);
                              } else {
                                removeCustomField(index);
                              }
                            }}
                            className="mt-3 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addCustomField}
                        className="w-full flex items-center justify-center gap-2 py-2 text-[#FF5733] hover:text-[#E64A2E] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add another qualification
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-[#6B7280] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4B5563] transition-colors"
                  >
                    go back
                  </button>
                  <button
                    onClick={handleProceed}
                    className="flex-1 bg-[#FF5733] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E64A2E] transition-colors"
                  >
                    proceed
                  </button>
                </div>
              </div>
              {/* Contact info row */}
              <div className="flex justify-end pb-8">
                <div className="text-white text-right text-sm">
                  Questions or concerns? Call us at:
                  <br />
                  <span className="font-medium">09620900909</span>
                </div>
              </div></div>
          </div>
        </div>

      </div>
    </main>
  );
}
