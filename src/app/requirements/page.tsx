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
  const [customFields, setCustomFields] = useState<CustomField[]>([{
    key: 'Skills',
    value: ''
  }, {
    key: 'Price Range',
    value: ''
  }]);
  const [showCustomFields, setShowCustomFields] = useState(true);
  const [email, setEmail] = useState('');
  // Removed standalone skills state as it's now part of customFields
  // Removed standalone priceRange state as it's now part of customFields

  const location = searchParams.get('location');

  useEffect(() => {
    const skills = searchParams.get('skills') || '';
    const priceRange = searchParams.get('priceRange') || '';
    setCustomFields([{
      key: 'Skills',
      value: skills
    }, {
      key: 'Price Range',
      value: priceRange
    }]);
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
    
    const skillsField = customFields.find(field => field.key === 'Skills');
    const priceRangeField = customFields.find(field => field.key === 'Price Range');
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
                  customFields={customFields}
                  showCustomFields={showCustomFields}
                  onCustomFieldChange={handleCustomFieldChange}
                  onAddCustomField={addCustomField}
                  onRemoveCustomField={removeCustomField}
                  onShowCustomFields={setShowCustomFields}
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
