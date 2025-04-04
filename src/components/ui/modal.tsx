import { useState } from "react";
import { Button } from "../form/button";
import { cn } from "@/lib/utils";

type Option = {
  type: "agree" | "abort" | "yes" | "no" | "continue" | "cancel" | "neutral";
  text: string;
};

type Modal = {
  title: string;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
  isClosed: () => boolean;
};

type ModalProps = {
  children?: React.ReactNode;
  onAgree?: Function;
  options?: Option[];
  modal: Modal;
};

export function useModal(title: string) {
  const [isOpen, setIsOpen] = useState(false);

  // Modal API
  const modal: Modal = {
    title: title,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    isOpen: () => isOpen,
    isClosed: () => !isOpen,
  };

  return modal;
}

export function Modal({
  children,
  onAgree,
  modal,
  options = onAgree
    ? [
        { type: "agree", text: "Agree" },
        { type: "cancel", text: "Cancel" },
      ]
    : [{ type: "neutral", text: "Close" }],
}: ModalProps) {
  // When closed, show nothing
  if (modal.isClosed()) return <></>;

  // When open, show modal
  return (
    <div className="fixed w-[100vw] h-[100vh] bg-black bg-opacity-25 z-50 top-0 left-0 flex flex-col items-center backdrop-blur-md">
      <div className="m-auto card rounded-md bg-white w-[600px] p-8">
        {/* Modal Title */}
        <div className="text-header-1 pb-4">{modal.title}</div>

        {/* Modal Description */}
        <div className="text-body">{children}</div>
        <br />

        {/* Modal Buttons */}
        <div className="flex flex-row space-x-4">
          {options.map((option) => (
            <Button
              key={option.text}
              className={cn(
                "w-block",
                (() => {
                  switch (option.type) {
                    case "agree":
                    case "continue":
                    case "yes":
                      return "bg-accent text-white";
                    case "abort":
                    case "cancel":
                    case "no":
                      return "bg-primary";
                    case "neutral":
                      return "bg-primary-foreground text-white";
                  }
                })()
              )}
              onClick={() => (
                modal.close(),
                ["agree", "continue", "yes"].includes(option.type) &&
                  onAgree &&
                  onAgree()
              )}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
