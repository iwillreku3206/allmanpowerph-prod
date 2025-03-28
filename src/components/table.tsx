import { cn } from "@/lib/utils"
import { FormEventHandler, use, useState } from "react"
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DbQueryResponse } from "@/app/api/v0/searches/candidates/route";


/**
 * Converts each resume into a formatted table row element.
 */
const resumeMapper = (resume: DbQueryResponse, onClick: FormEventHandler, checked: boolean = false) => {
  const bestMatch = false
  console.log(resume)
  return (
    <tr
      key={JSON.stringify(resume.id)}
      className={cn('hover:bg-gray-800 cursor-pointer', bestMatch ? 'bg-green-200 text-black' : 'text-gray-300')}
      onClick={onClick}>

      <td className="pl-6 px-4 py-3 flex items-center gap-4 text-primary-foreground">
        <input type="checkbox" checked={checked} readOnly className="form-checkbox" />
        {resume.name}
      </td>
      {
        resume.search_fields.map(field =>
          <td className="pr-8 text-primary-foreground">{resume.fields[field.key] || ''}</td>)
      }
      <td><Button className="bg-primary">download resume</Button></td>

    </tr >)
}

export function ResumeTable(
  { className = '',
    data,
    selected,
    page,
    count,
    setPage,
    setCount,
    removeSelected,
    addSelected,
    id,
    ...props }: {
      data: [DbQueryResponse[], string[]],
      className?: string,
      selected: string[],
      page: number,
      count: number,
      setPage: (page: number) => void,
      setCount: (page: number) => void,
      removeSelected: (item: string) => void,
      addSelected: (item: string) => void,
      id: string
    }) {
  const resumes = data[0]
  // Handle clicks
  const handleClick = (resume: DbQueryResponse) => {

    // Add if not there
    if (!selected.includes(resume.id))
      addSelected(resume.id)
    // Remove if there
    else
      removeSelected(resume.id)
  }

  if (resumes.length == 0)
    return (<div>No candidates found yet. Please wait for a few days and check back again</div>)

  // The table
  return (
    <div className="">
      <table className="w-full rounded-md bg-white font-bodyfont border-collapse">
        <thead>
          <tr key="HEADER" className="text-left text-gray-400 border-b border-gray-700">
            <th className="px-6 py-3">Name</th>
            {
              resumes[0].search_fields.map(f => <th key={`fieldheader-${f.key}`} className="px-6 py-3">{f.key}</th>)
            }
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {
            resumes
              .map((resume) => resumeMapper(resume, () => handleClick(resume), selected.includes(resume.id)))
          }
        </tbody>
      </table>
      <div className="flex flex-col justify-between items-center mt-4">
        <div className="flex flex-row justify-center">
          <Button className="" onClick={() => { setPage(Math.max(page - 1, 0)) }}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col justify-center items-center">{page + 1}/{1}</div>
          <Button className="" onClick={() => { setPage(Math.min(page + 1, 1)) }}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <br />
        <Button className="bg-primary">View Selected</Button>
      </div>
      <br />
    </div>
  )
}
