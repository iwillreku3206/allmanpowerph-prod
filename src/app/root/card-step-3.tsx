import { useContext, useState } from "react";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CardStep } from "./card-step";
import { FormContext } from "@/components/contexts/form-data";

export function CardStep3({
  nextStep,
  prevStep,
}: {
  nextStep: Function;
  prevStep: Function;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { getField, getAll } = useContext(FormContext);

  // Handle form submission
  const handleChange = (value: string) => {
    setError("");
    setEmail(value);

    // Set error message
    if (!validateEmail(value)) setError("Invalid email address.");
    else setError("");
  };

  // Form submission
  const handleSubmit = async () => {
    // Don't double send
    if (loading || !validateEmail(email)) return;

    // Loading
    setLoading(true);

    // POST submission
    await fetch("api/v0/searches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: getField("location"),
        workerType: getField("_WorkerType"),
        email: email,
        fields: getAll().filter(
          (f) => f.key !== "location" && f.key !== "_WorkerType"
        ),
      }),
    })
      .then((r) => r.json())
      .then(({ status, error }) => {
        // Success
        if (status === 200 || status.toString() === "200") {
          // Dev Mode
          if (process.env.NEXT_PUBLIC_ENVIRONMENT_MODE === "DEV") {
            setError(status);
            setLoading(false);
            router.push("/thankyou");
            return;
          }

          router.push("/thankyou");

          // Fail
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  // Validate email
  const validateEmail = (email: string) => {
    // Email regex
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return false;

    // No input
    if (!email || email === "") return false;

    return true;
  };

  return (
    <CardStep
      title="Tell us how to talk to you!"
      description="You're almost done! Just tell us how to contact you and we'll send you a list of candidates within the next few days."
      nextStep={nextStep}
      prevStep={prevStep}
      nav={false}
    >
      <div className="mb-4">
        <div className="text-red-500 font-bodyfont mb-4">{error}</div>
        <Input
          className="w-full"
          placeholder="Email"
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          onChange={(e) => handleChange((e.target as any).value)}
        />
      </div>

      <div className="w-full flex flex-row space-x-4">
        <Button
          className="bg-primary-foreground text-white w-full flex justify-center motion-translate-y-in-25 motion-ease-bounce motion-duration-150"
          onClick={() => prevStep()}
        >
          Back
        </Button>

        <Button
          className={cn(
            "bg-accent w-full flex justify-center motion-translate-y-in-25 motion-ease-bounce motion-duration-150",
            loading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
          )}
          onClick={() => handleSubmit()}
        >
          {!loading ? (
            "Submit"
          ) : (
            <img
              className="w-6 h-6"
              src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif"
              alt="loading"
            ></img>
          )}
        </Button>
      </div>
    </CardStep>
  );
}
