import { cn } from "@/lib/utils";
import { FormEventHandler, use, useState } from "react";
import { Button } from "./form/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Converts each resume into a formatted table row element.
 */
const resumeMapper = (
  resume: any,
  onClick: FormEventHandler,
  checked: boolean = false
) => {
  const bestMatch = false;
  return (
    <tr
      key={JSON.stringify(resume.id)}
      className={cn(
        "hover:bg-gray-200 cursor-pointer",
        bestMatch ? "bg-green-200 text-black" : "text-gray-300"
      )}
      onClick={onClick}
    >
      <td className="pl-6 px-4 py-3 text-primary-foreground">
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className="form-checkbox"
        />
      </td>
      <td className="pl-6 px-4 py-3 text-primary-foreground">{resume.name}</td>
      {Object.keys(resume.fields).map((field: any) => (
        <td
          className="px-6 py-3 text-primary-foreground md:table-cell"
          key={field}
        >
          {resume.fields[field] || ""}
        </td>
      ))}
      <td className="px-6 py-3">
        <a
          className="text-primary-foreground z-[999]"
          href={resume.resume_url}
          target="_blank"
        >
          <img src="/download.svg" className="pointer w-4 h-4" />
        </a>
      </td>
    </tr>
  );
};

export function ResumeTable({
  className = "",
  data,
  selected,
  page,
  count,
  setPage,
  setCount,
  removeSelected,
  addSelected,
  handleSubmit,
  disableSubmit,
  firstLoadDone,
  maxPage,
  id,
  ...props
}: {
  data: any;
  className?: string;
  selected: string[];
  page: number;
  count: number;
  setPage: (page: number) => void;
  setCount: (page: number) => void;
  maxPage: number;
  firstLoadDone: boolean;
  removeSelected: (item: string) => void;
  addSelected: (item: string) => void;
  disableSubmit: boolean;
  handleSubmit: () => void;
  id: string;
}) {
  const resumes = data;

  // Handle clicks
  const handleClick = (resume: any) => {
    // Add if not there
    if (!selected.includes(resume.id)) addSelected(resume.id);
    // Remove if there
    else removeSelected(resume.id);
  };

  if (resumes.length == 0 && !firstLoadDone)
    return <div>Loading candidates...</div>;

  if (resumes.length == 0 && firstLoadDone)
    return (
      <div>
        We are currently in the process of looking for candidates... We will get
        back to you in the next few days
      </div>
    );

  // The table
  return (
    <>
      <table className="w-full rounded-md bg-white font-bodyfont border-collapse">
        <thead>
          <tr
            key="HEADER"
            className="text-left text-gray-400 border-b border-gray-700"
          >
            <th className="px-6 py-3 text-left"></th>
            <th className="px-6 py-3 text-left">Name</th>
            {Object.keys(resumes[0].fields).map((f: string) => (
              <th
                key={`fieldheader-${f}`}
                className="px-6 py-3 text-left md:table-cell hidden"
              >
                {f}
              </th>
            ))}
            <th className="px-6 py-3 text-left">Resume</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume: any) =>
            resumeMapper(
              resume,
              () => handleClick(resume),
              selected.includes(resume.id)
            )
          )}
        </tbody>
      </table>
      <div className="flex flex-col justify-between items-center mt-4">
        <div className="flex flex-row justify-center">
          <Button
            className=""
            onClick={() => {
              setPage(Math.max(page - 1, 1));
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col justify-center items-center">
            {page}/{maxPage}
          </div>
          <Button
            className=""
            onClick={() => {
              setPage(Math.min(page + 1, maxPage));
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <br />
        <Button
          className="bg-primary"
          onClick={handleSubmit}
          disabled={disableSubmit}
        >
          Setup Interview with Selected
        </Button>
      </div>
      <br />
    </>
  );
}
