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
  const [type, setType] = useState<string>("call_center");
  const [error, setError] = useState("");
  const [custom, setCustom] = useState("");
  const [customOpen, setCustomOpen] = useState(false)
  const tellMeMoreRef = useRef<HTMLParagraphElement>(null);

  // Update state
  const handleSet = (value: string) => () => {
    setType(value);
    setCustomOpen(false)
    setField("_WorkerType", value);
  };

  const workerTypes = [
    { key: "Call Center", name: "Call Center", icon: "/phone.svg" },
    { key: "Customer Service", name: "Customer Service", icon: '/support.svg' },
    { key: "Data Entry", name: "Data Entry", icon: '/data.svg' },
    { key: "Construction", name: "Construction", icon: '/construction.svg' },
    { key: "Sales", name: "Sales", icon: '/sales.svg' },
    { key: "Waiter", name: "Waiter", icon: '/waiter.svg' },
    { key: "Cashier", name: "Cashier", icon: '/cashier.svg' },
    { key: "Janitor", name: "Janitor", icon: '/janitor.svg' },
    { key: "Factory Worker", name: "Factory Worker", icon: '/factory.svg' },
  ];

  useEffect(() => {
    setInterval(() => {
      if (tellMeMoreRef.current) {
        // Add animation
        tellMeMoreRef.current.classList.add(
          "motion-preset-wobble-sm",
          "motion-duration-500",
          "pointer-events-none"
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

  useEffect(() => {
    if (customOpen) setType(custom)
  }, [custom, customOpen])

  return (
    <CardStep
      title="Need domestic help? We got you covered!"
      description={"To start, tell use what kind of help you're looking for."}
      nextStep={nextStep}
      prevStep={prevStep}
      nav={false}
      first
    >
      <div className="mb-4 flex flex-col gap-2">
        <div className="text-red-500 font-bodyfont ">{error}</div>
        <div className="grid grid-cols-3 gap-2">
          {workerTypes.map((workerType, i) => (
            <Button
              key={i}
              className={`bg-accent px-4 texttype-body rounded-sm w-full mt-4 text-white flex flex-col justify-center items-center gap-2 ${type == workerType.key ? 'brightness-125' : ''}`}
              onClick={
                // @ts-ignore
                handleSet(workerType.key)
              }
            >
              <img src={workerType.icon} className="w-12 h-12" />
              {workerType.name}
            </Button>
          ))}
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-white -translate-x-1/2 bg-card left-1/2">or</span>
        </div>

        <Button className="bg-accent px-4 texttype-body rounded-sm w-full text-white flex flex-col justify-center items-center gap-2" onClick={() => setCustomOpen(true)}>Custom</Button>
        {customOpen && <Input onChange={(e) => setCustom(e.target.value)} value={custom} placeholder="Enter a job type (Warehouse manager, )" />}

        <Button className="bg-accent px-4 texttype-body rounded-sm w-full mt-4 text-white flex flex-col justify-center items-center gap-2" onClick={() => {
          if (type === "") {
            setError("Cannot have an empty job type")
          } else {
            nextStep()
          }
        }}>Next Step</Button>
      </div>
    </CardStep>
  );
}
