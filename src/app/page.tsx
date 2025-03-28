'use client';

import { useState } from 'react';
import { Background } from '@/components/ui/background';
import { Title } from '@/components/ui/title';
import { Contact } from '../components/ui/contact';
import { CardStep1 } from '@/components/ui/landing/card-step-1';
import { FormContext, createFormContext } from '@/components/contexts/form-data';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { CardStep2 } from '@/components/ui/landing/card-step-2';
import { CardStep3 } from '@/components/ui/landing/card-step-3';
import Head from 'next/head';

export default function Home() {
  
  // State of the landing page
  const [ formContext, setFormContext ] = useState(createFormContext());
  const [ step, setStep ] = useState(1);
  const totalSteps = 3;

  // Step updaters
  function nextStep() { setStep(Math.min(step + 1, totalSteps)); }
  function prevStep() { setStep(Math.max(step - 1, 0)); }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <FormContext.Provider value={ formContext }>
        <main className="min-h-screen relative bg-primary-foreground">
          <Background />
          
          <div className="relative z-20 container mx-auto px-4 flex flex-col min-h-screen">
            <div className="flex flex-col items-center lg:items-end justify-center flex-1 py-8">

              {/* Title with step indicator below */}
              <Title />
              <div className='w-full'>{ step > 1 ? (<ProgressIndicator step={ step } totalSteps={ totalSteps } />) : (<></>) }</div>

              {/* Show each of the cards */}
              { (() => {
                switch (step) {
                  case 1: return (<CardStep1 nextStep={ nextStep } prevStep={ prevStep } step={ step }/>)
                  case 2: return (<CardStep2 nextStep={ nextStep } prevStep={ prevStep } />)
                  case 3: return (<CardStep3 nextStep={ nextStep } prevStep={ prevStep } />)
                  default: return (<></>)
                }
              })() }
              <Contact />
            </div>
          </div>
        </main>
      </FormContext.Provider>
    </>
  );
}
