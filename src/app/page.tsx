"use client";

import { useRef, useState } from "react";
import { Background } from "@/app/root/background";
import { Title, Contact } from "@/components/ui/branding";
import { CardStep1 } from "@/app/root/card-step-1";
import {
  FormContext,
  createFormContext,
} from "@/components/contexts/form-data";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { CardStep0 } from "@/app/root/card-step-0";
import { CardStep2 } from "@/app/root/card-step-2";
import { CardStep3 } from "@/app/root/card-step-3";
import { RenderSwitch } from "@/components/utils/renderSwitch";
import { Main } from "@/components/main";
import { WindowPage, WindowPadding } from "../components/ui/window";
import { Divider } from "@/components/ui/divider";
import { useScrollTarget } from "@/components/ui/scrollTarget";
import { Button } from "@/components/form/button";

export default function Home() {
  // State of the landing page
  const [formContext, setFormContext] = useState(createFormContext());
  const [step, setStep] = useState(0);
  const target = useRef<HTMLDivElement>(null);
  const scrollTarget = useScrollTarget(target.current);
  const totalSteps = 4;

  // Step updaters
  function nextStep() {
    setStep(Math.min(step + 1, totalSteps));
  }

  // Previous step
  function prevStep() {
    setStep(Math.max(step - 1, 0));
  }

  return (
    <Main>
      <WindowPage>
        <Background />
        <div className="flex flex-row items-end bg-transparent">
          <div className="flex flex-col items-center lg:items-start justify-center flex-1">
            <div className="bg-card h-[100vh] px-20 py-32 z-20">
              <Title />
              <div className="w-full">
                {step >= 0 ? (
                  <ProgressIndicator step={step + 1} totalSteps={totalSteps} />
                ) : (
                  <></>
                )}
              </div>
              <Divider />
              <br />
              <FormContext.Provider value={formContext}>
                <RenderSwitch
                  selection={[
                    <CardStep0
                      moreInfoCallback={() => scrollTarget.goto()}
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
            </div>
          </div>
        </div>
      </WindowPage>

      <WindowPage>
        <div ref={target}></div>
      </WindowPage>
    </Main>
  );
}
