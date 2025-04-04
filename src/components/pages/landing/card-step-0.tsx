import { useContext, useState } from "react";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";

type HelperType = "elderly" | "child" | "general";

export function CardStep0({
  nextStep,
  prevStep,
  step,
}: {
  nextStep: Function;
  prevStep: Function;
  step: number;
}) {
  // Show the first field
  const { getField, setField, getAll } = useContext(FormContext);
  const [type, setType] = useState<HelperType>("general");
  const [error, setError] = useState("");

  // Update state
  const handleSet = (value: HelperType) => () => {
    console.log(value);
    setType(value);
    setField("_CareType", value);
    nextStep();
  };

  return (
    <CardStep
      title="Need domestic help?<br> We got you covered!"
      description={SITE_DESCRIPTION}
      nextStep={nextStep}
      prevStep={prevStep}
      nav={false}
      first
    >
      <h3 className="text-header-2 mb-4">
        To start, what kind of help do you want?
      </h3>
      <div className="mb-4">
        <div className="text-red-500 font-bodyfont mb-4">{error}</div>
        <div className="flex flex-row gap-2">
          <Button
            className="bg-primary px-4 text-body w-full mt-4 text-white flex flex-col justify-center items-center gap-2"
            onClick={handleSet("child")}
          >
            <img src="/child.svg" className="w-12 h-12" />
            Child Care
          </Button>
          <Button
            className="bg-primary px-4 text-body w-full mt-4 text-white flex flex-col justify-center items-center gap-2"
            onClick={handleSet("general")}
          >
            <img src="/general.svg" className="w-12 h-12" />
            Household Help
          </Button>
          <Button
            className="bg-primary px-4 text-body w-full mt-4 text-white flex flex-col justify-center items-center gap-2"
            onClick={handleSet("elderly")}
          >
            <img src="/elderly.svg" className="w-12 h-12" />
            Elderly Care
          </Button>
        </div>
      </div>
    </CardStep>
  );
}
