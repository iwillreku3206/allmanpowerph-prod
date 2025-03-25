'use client';

import { useState } from 'react';
import { Background } from '@/components/ui/background';
import { Title } from '@/components/ui/title';
import { Contact } from '../components/ui/contact';
import { CardStep1 } from '@/components/ui/landing/card-step-1';
import { FormContext, createFormContext } from '@/components/contexts/form-data';

export default function Home() {
  const [ formContext, setFormContext ] = useState(createFormContext());

  return (
    <FormContext.Provider value={ formContext }>
      <main className="min-h-screen relative bg-primary-foreground">
        <Background />
        <div className="relative z-20 container mx-auto px-4 flex flex-col min-h-screen">
          <div className="flex flex-col items-center lg:items-end justify-center flex-1 py-8">
            <Title />
            <CardStep1 />
            <Contact />
          </div>
        </div>
      </main>
    </FormContext.Provider>
  );
}
