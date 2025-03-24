'use client';

import { useState, useEffect, Suspense } from 'react';
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

function RequirementsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
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

  const handleFinish = async () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Validate all custom fields
    const emptyFields = customFields
      .filter(field => field.key.trim() && !field.value.trim())
      .map(field => field.key);

    if (emptyFields.length > 0) {
      setError(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setCurrentStep(1)
      return;
    }

    const response = await fetch('/api/v0/searches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location,
        email,
        fields: customFields
      })
    })
    const resBody = await response.json()

    if (resBody.status !== 200) {
      if (String(resBody.error).includes('Location')) {
        setCurrentStep(1)
      }
      setError(resBody.error)
      if (String(resBody.error) === '') {
        setError('Unknown error occurred')
      }
    } else {
      router.push('/thankyou')
    }
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
                  error={error}
                />
              ) : (
                <ContactForm
                  email={email}
                  onEmailChange={setEmail}
                  onBack={handleBack}
                  onFinish={handleFinish}
                  error={error}
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

export default function Requirements() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <RequirementsContent />
    </Suspense>
  );
}
