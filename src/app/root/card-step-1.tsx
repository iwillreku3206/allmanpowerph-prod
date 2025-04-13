import { useContext, useState } from "react";
import { Input } from "@/components/form/input";
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

  return (
    <CardStep
      title={`Tell us where you are!`}
      description={`You selected ${getField("_WorkerType")}. Help us narrow down your ideal candidate by telling us more about you!`}
      nextStep={nextStep}
      prevStep={prevStep}
      nav={true}
    >
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
