import { Input } from "@/components/form/input";
import { useContext, useState } from "react";
import { FormContext } from "@/components/contexts/form-data";
import { CardStep } from "./card-step";
import { Button } from "@/components/form/button";
import { Modal, useModal } from "@/components/ui/modal";
import { Divider } from "@/components/ui/divider";

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
  const qualificationsModal = useModal("Edit Qualifications.");

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
    <>
      <CardStep
        title={`Tell us more about your ideal ${careTypes[(quals.find((x) => x.key == "_CareType")?.value as keyof typeof careTypes) || "general"]}!`}
        description={``}
        nextStep={nextStep}
        prevStep={prevStep}
      >
        <div className="bg-accent rounded-sm flex flex-col texttype-form mt-4">
          {quals
            .filter(
              (qual) => key(qual) !== "location" && key(qual) !== "_CareType"
            )
            .filter(
              (qual) => key(qual).trim() !== "" && val(qual).trim() !== ""
            )
            .map((qual, i) => (
              <div
                key={i}
                onClick={() => qualificationsModal.open()}
                className="flex flex-row px-6 py-3 justify-between text-sm hover:text-white hover:bg-black hover:bg-opacity-20 hover:cursor-pointer transition-all duration-150"
              >
                <div>{qual.key}:</div>
                <div className="">{qual.value}</div>
              </div>
            ))}
        </div>
        <br />

        {/* Create new qual */}
        <div className="w-full flex flex-row justify-end shadow-none">
          <Button
            className="bg-transparent text-white flex justify-center shadow-none hover:bg-primary border-2 border-[rgba(0, 0, 0, 0.5)]"
            onClick={() => qualificationsModal.open()}
          >
            Edit Qualifications
          </Button>
        </div>
        <br />
      </CardStep>
      <Modal modal={qualificationsModal}>
        <Divider />
        <div className="flex flex-col space-y-2">
          {quals
            .filter(
              (qual) => key(qual) !== "location" && key(qual) !== "_CareType"
            )
            .map((qual, i) => (
              <div
                key={i}
                className="flex md:flex-row flex-col justify-between md:space-x-2 md:space-y-0 space-y-2 text-sm"
              >
                <Input
                  value={qual.key}
                  onChange={(e) => updateKey(qual, e.target.value)}
                ></Input>
                <Input
                  value={qual.value}
                  onChange={(e) => updateVal(qual, e.target.value)}
                ></Input>
                <Button
                  className="bg-transparent shadow-none hover:bg-red-500 hover:bg-opacity-10 m-0 p-0 flex flex-row justify-center items-center md:pb-0 pb-4"
                  onClick={() => removeQual(qual)}
                >
                  <img
                    className="w-5 h-5 object-cover"
                    src="https://static-00.iconduck.com/assets.00/remove-icon-2048x2048-ojgymcv1.png"
                  ></img>
                </Button>
              </div>
            ))}
        </div>
        <br />
        <Button
          className="bg-transparent border-primary border-2 hover:bg-primary"
          onClick={() => addQual()}
        >
          Add Qualification
        </Button>
      </Modal>
    </>
  );
}
