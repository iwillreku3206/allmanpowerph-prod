import { cn } from "@/lib/utils";
import { FormEventHandler, use, useState } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DbQueryResponse } from "@/app/api/v0/searches/candidates/route";

/**
 * Converts each resume into a formatted table row element.
 */
const resumeMapper = (
  resume: DbQueryResponse,
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
      {resume.search_fields.map((field) => (
        <td className="px-6 py-3 text-primary-foreground md:table-cell hidden" key={field.key}>
          {resume.fields[field.key] || ""}
        </td>
      ))}
      <td className="px-6 py-3 text-primary-foreground">
        {resume.care_type}
      </td>
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
  data: [DbQueryResponse[], string[]];
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
  const resumes = data[0];
  // Handle clicks
  const handleClick = (resume: DbQueryResponse) => {
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
    <div className="md:w-1/2 w-full">
      <table className="w-full rounded-md bg-white font-bodyfont border-collapse">
        <thead>
          <tr
            key="HEADER"
            className="text-left text-gray-400 border-b border-gray-700"
          >
            <th className="px-6 py-3 text-left"></th>
            <th className="px-6 py-3 text-left">Name</th>
            {resumes[0].search_fields.map((f) => (
              <th
                key={`fieldheader-${f.key}`}
                className="px-6 py-3 text-left md:table-cell hidden"
              >
                {f.key}
              </th>
            ))}
            <th className="px-6 py-3 text-left">Care Type</th>
            <th className="px-6 py-3 text-left">Resume</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) =>
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
    </div>
  );
}
