import { useContext, useState } from "react";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";

export function CardStep1({
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
  const [location, setLocation] = useState(getField("location") ?? "");
  const [error, setError] = useState("");

  // Update state
  const handleChange = (value: any) => {
    setLocation(value);
    setField("location", value);
  };

  // Handles when next button pressed
  const handleNext = () => {
    setError("");
    if (!location || location === "") return setError("Location is required.");
    return nextStep();
  };

  const careTypes = {
    child: "Childcare",
    general: "Household Help",
    elderly: "Elderly Care",
  };

  return (
    <CardStep
      title={`Looking for ${careTypes[getField("_CareType") as keyof typeof careTypes]}?<br> We got you covered`}
      description={SITE_DESCRIPTION}
      nextStep={nextStep}
      prevStep={prevStep}
      nav={true}
    >
      <h3 className="text-header-2 mb-4">To start, tell us where you're at!</h3>
      <div className="mb-4">
        <div className="text-red-500 font-bodyfont mb-4">{error}</div>
        <Input
          className="w-full"
          placeholder="Location Address"
          value={location}
          onKeyDown={(e) => (e.key === "Enter" ? handleNext() : null)}
          onChange={(e) => handleChange((e.target as any).value)}
        />
      </div>
    </CardStep>
  );
}
