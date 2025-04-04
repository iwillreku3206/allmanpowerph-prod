import { Input } from "@/components/form/input";
import { useContext, useState } from "react";
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";
import { Button } from "@/components/form/button";

export function CardStep2({
  nextStep,
  prevStep,
}: {
  nextStep: Function;
  prevStep: Function;
}) {
  // Updating actual form data of root component context
  const { setField, renameField, removeField, getAll } =
    useContext(FormContext);

  // Utils for state
  type Qual = {
    key: string;
    value: string;
  };
  const key = (qual: Qual) => qual.key;
  const val = (qual: Qual) => qual.value;

  // Updates a single qual key
  const updateKey = (qual: Qual, newKey: string): Qual[] => {
    renameField(key(qual) ?? "", newKey);
    setQuals(getAll());
    return getAll();
  };

  // Updates a single qual val
  const updateVal = (qual: Qual, newVal: string): Qual[] => {
    setField(key(qual), newVal);
    setQuals(getAll());
    return getAll();
  };

  // Add a new qual if none are blank
  const addQual = () => {
    if (!quals.filter((q) => key(q) === "").length) setField("", "");
    setQuals(getAll());
  };

  // Remove quality
  const removeQual = (qual: Qual) => {
    removeField(key(qual));
    setQuals(getAll());
  };

  // Handle next
  const handleNext = () => {
    nextStep();
  };

  // Local state
  const [quals, setQuals]: [quals: Qual[], setQuals: Function] =
    useState(getAll());

  const careTypes = {
    child: "childcare helper",
    general: "household helper",
    elderly: "elderly caregiver",
  };

  return (
    <CardStep
      title={`What qualities do you want in your ${careTypes[(quals.find((x) => x.key == "_CareType")?.value as keyof typeof careTypes) || "general"]}?`}
      description={`Tell us more about your ideal ${careTypes[(quals.find((x) => x.key == "_CareType")?.value as keyof typeof careTypes) || "general"]}. The more info you give us, the better our search results will be!`}
      nextStep={nextStep}
      prevStep={prevStep}
    >
      {quals
        .filter((qual) => key(qual) !== "location" && key(qual) !== "_CareType")
        .map((qual, i) => (
          <div
            key={i}
            className="flex flex-row space-x-2 mb-2 motion-preset-pop motion-duration-200"
          >
            <div className="w-full">
              <Input
                className="w-full"
                placeholder="Enter qualification"
                value={key(qual) ?? ""}
                onKeyDown={(e) => (e.key === "Enter" ? handleNext() : null)}
                onChange={(e) => updateKey(qual, (e.target as any).value)}
              />
            </div>
            <span className="text-header-2 opacity-50">=</span>
            <div className="w-full">
              <Input
                className="w-full"
                placeholder="Enter value"
                value={val(qual) ?? ""}
                onKeyDown={(e) => (e.key === "Enter" ? handleNext() : null)}
                onChange={(e) => updateVal(qual, (e.target as any).value)}
              />
            </div>
            <button className="btn px-3">
              <img
                className="h-12 object-contain hover:motion-preset-stretch-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s"
                alt="delete"
                onClick={() => removeQual(qual)}
              />
            </button>
          </div>
        ))}
      <br />

      {/* Create new qual */}
      <div className="w-full flex flex-row justify-end shadow-none">
        <Button
          className="bg-white flex justify-center shadow-none hover:brightness-95 mr-12 border-2 border-[rgba(0, 0, 0, 0.5)]"
          onClick={() => addQual()}
        >
          <img
            className="h-4 object-contain hover:motion-rotate-in-6"
            src="https://www.freepnglogos.com/uploads/plus-icon/file-plus-font-awesome-svg-wikimedia-commons-10.png"
            alt="add-field"
          />
        </Button>
      </div>
      <br></br>
    </CardStep>
  );
}
