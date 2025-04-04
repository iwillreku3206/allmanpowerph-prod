import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CardStep({
  title = "",
  description = "",
  first = false,
  nav = true,
  nextStep,
  prevStep,
  children,
}: {
  title?: string;
  description?: string;

  first?: boolean;
  nav?: boolean;
  nextStep: Function;
  prevStep: Function;
  children: React.ReactNode;
}) {
  // Classes
  const baseClass = "bg-transparent rounded-md lg:w-[640px]";
  const animationClass =
    "motion-translate-y-in-[10%] motion-opacity-in-0 motion-delay-200";

  return (
    <div className={cn(baseClass, animationClass)}>
      {/* Header and Description */}
      <h2
        className="texttype-header-1 text-white mb-2 leading-[1.15]"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      {description.length ? (
        <p
          className="texttype-body text-white opacity-75 mb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      ) : (
        <></>
      )}
      {children}

      {/* Navigation Buttons */}
      <br />
      <div className="w-full flex flex-row space-x-4">
        {!first && nav && (
          <Button
            className="bg-primary-foreground text-white w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150"
            onClick={() => prevStep()}
          >
            Back
          </Button>
        )}
        {nav && (
          <Button
            className="bg-accent w-full motion-translate-y-in-25 motion-ease-bounce motion-duration-150"
            onClick={() => nextStep()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
