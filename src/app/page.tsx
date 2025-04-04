"use client";

import { useState } from "react";
import { Background } from "@/components/pages/landing/background";
import { Title, Contact } from "@/components/ui/branding";
import { CardStep1 } from "@/components/pages/landing/card-step-1";
import {
  FormContext,
  createFormContext,
} from "@/components/contexts/form-data";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { CardStep0 } from "@/components/pages/landing/card-step-0";
import { CardStep2 } from "@/components/pages/landing/card-step-2";
import { CardStep3 } from "@/components/pages/landing/card-step-3";
import Head from "next/head";
import { RenderSwitch } from "@/components/utils/renderSwitch";
import { Main } from "@/components/main";
import { WindowPage, WindowPadding } from "../components/ui/window";

export default function Home() {
  // State of the landing page
  const [formContext, setFormContext] = useState(createFormContext());
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  // Step updaters
  function nextStep() {
    console.log("next");
    setStep(Math.min(step + 1, totalSteps));
  }

  // Previous step
  function prevStep() {
    console.log("prev");
    setStep(Math.max(step - 1, 0));
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
        <title>All Maids PH</title>
      </Head>
      <Main>
        <WindowPage>
          <Background />
          <WindowPadding>
            <div className="flex flex-col items-center lg:items-end justify-center flex-1">
              {/* Title with step indicator below */}
              <Title />
              <div className="w-full">
                {step >= 0 ? (
                  <ProgressIndicator step={step + 1} totalSteps={totalSteps} />
                ) : (
                  <></>
                )}
              </div>

              <FormContext.Provider value={formContext}>
                <RenderSwitch
                  selection={[
                    <CardStep0
                      nextStep={nextStep}
                      prevStep={prevStep}
                      step={step}
                    />,
                    <CardStep1
                      nextStep={nextStep}
                      prevStep={prevStep}
                      step={step}
                    />,
                    <CardStep2 nextStep={nextStep} prevStep={prevStep} />,
                    <CardStep3 nextStep={nextStep} prevStep={prevStep} />,
                  ]}
                  selected={step}
                ></RenderSwitch>
              </FormContext.Provider>
              <Contact />
            </div>
          </WindowPadding>
        </WindowPage>

        <WindowPage></WindowPage>
      </Main>
    </>
  );
}
