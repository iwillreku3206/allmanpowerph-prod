import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";

type HelperType = "elderly" | "child" | "general";

export function CardStep0({
  nextStep,
  prevStep,
  step,
  moreInfoCallback,
}: {
  nextStep: Function;
  prevStep: Function;
  step: number;
  moreInfoCallback: MouseEventHandler<HTMLButtonElement>;
}) {
  // Show the first field
  const { getField, setField, getAll } = useContext(FormContext);
  const [type, setType] = useState<HelperType>("general");
  const [error, setError] = useState("");
  const tellMeMoreRef = useRef<HTMLParagraphElement>(null);

  // Update state
  const handleSet = (value: HelperType) => () => {
    console.log(value);
    setType(value);
    setField("_CareType", value);
    nextStep();
  };

  const careTypes = [
    { key: "child", name: "Child Care" },
    { key: "general", name: "Household Help" },
    { key: "elderly", name: "Elderly Care" },
  ];

  useEffect(() => {
    setInterval(() => {
      if (tellMeMoreRef.current) {
        // Add animation
        tellMeMoreRef.current.classList.add(
          "motion-preset-wobble-sm",
          "motion-duration-500"
        );

        // Set timeout to stop animation
        setTimeout(() => {
          tellMeMoreRef.current?.classList.remove(
            "motion-preset-wobble-sm",
            "motion-duration-500"
          );
        }, 500);
      }
    }, 3600);
  }, []);

  return (
    <CardStep
      title="Need domestic help? We got you covered!"
      description={"To start, tell use what kind of help you're looking for."}
      nextStep={nextStep}
      prevStep={prevStep}
      nav={false}
      first
    >
      <div className="mb-4">
        <div className="text-red-500 font-bodyfont mb-4">{error}</div>
        <div className="flex flex-row gap-2">
          {careTypes.map((careType, i) => (
            <Button
              key={i}
              className="bg-accent px-4 texttype-body rounded-sm w-full mt-4 text-white flex flex-col justify-center items-center gap-2"
              onClick={
                // @ts-ignore
                handleSet(careType.key)
              }
            >
              <img src="/child.svg" className="w-12 h-12" />
              {careType.name}
            </Button>
          ))}
        </div>
        <br />
        <br />
        <br />
        <Button
          onClick={moreInfoCallback}
          className="bg-transparent text-white rounded-none hover:bg-primary hover:text-black hover:rounded-sm border-l-2 border-r-2 hover:border-none shadow-none"
        >
          <p className="pointer-events-none" ref={tellMeMoreRef}>
            Wait, tell me more!
          </p>
        </Button>
      </div>
    </CardStep>
  );
}
