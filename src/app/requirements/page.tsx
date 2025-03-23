'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import CustomFieldsForm from './CustomFieldsForm';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { LANDING_BG, SITE_TITLE } from '@/lib/constants';

type CustomField = {
  key: string;
  value: string;
};

export default function Requirements() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const location = searchParams.get('location');

  useEffect(() => {
    setSkills(searchParams.get('skills') || '');
    setPriceRange(searchParams.get('priceRange') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!location) {
      router.replace('/');
    }
  }, [location, router]);

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

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

  const handleProceed = () => {
    setCurrentStep(2);
  };

  const handleFinish = () => {
    const customFieldsParam = customFields
      .filter(field => field.key.trim() && field.value.trim())
      .map(field => `${field.key}:${field.value}`)
      .join(',');
    
    // Here you would typically make an API call to save the email
    // For now, we'll just redirect to matches page
    router.push(`/matches?location=${encodeURIComponent(location)}&skills=${encodeURIComponent(skills)}&priceRange=${encodeURIComponent(priceRange)}&customFields=${encodeURIComponent(customFieldsParam)}&email=${encodeURIComponent(email)}`);
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

      <ProgressBar progress={currentStep === 1 ? 50 : 100} />

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
              Step {currentStep}/2
            </div>
          </div>

          {/* Form row */}
          <div className="flex justify-end">
            <h2 className="text-4xl font-bold text-white leading-tight mr-auto">
              {currentStep === 1 ? (
                <>What else would you<br />want from your yaya?</>
              ) : (
                <>Last step! Let us know<br />how to contact you.</>
              )}
            </h2>
            <div className="flex flex-col gap-4">
              {currentStep === 1 ? (
                <CustomFieldsForm
                  skills={skills}
                  priceRange={priceRange}
                  customFields={customFields}
                  showCustomFields={showCustomFields}
                  onCustomFieldChange={handleCustomFieldChange}
                  onAddCustomField={addCustomField}
                  onRemoveCustomField={removeCustomField}
                  onShowCustomFields={setShowCustomFields}
                  onSkillsChange={setSkills}
                  onPriceRangeChange={setPriceRange}
                  onBack={handleBack}
                  onProceed={handleProceed}
                />
              ) : (
                <ContactForm
                  email={email}
                  onEmailChange={setEmail}
                  onBack={handleBack}
                  onFinish={handleFinish}
                />
              )}
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
