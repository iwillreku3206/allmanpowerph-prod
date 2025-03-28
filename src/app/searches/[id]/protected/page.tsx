'use client'

import { type DbQueryResponse } from "@/app/api/v0/searches/candidates/route";
import { ResumeTable } from "@/components/table";
import { Title } from "@/components/ui/title";
import { useParams, useRouter } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";

async function getData(search: string, page: number, count: number): Promise<[DbQueryResponse[], string[]]> {
  const res = await fetch(`/api/v0/searches/candidates?search=${search}&page=${page}&count=${count}`)
  const data = await res.json() as { data: DbQueryResponse[] }
  const selected = data.data.filter(a => a.requested_interview).map(a => a.id)

  return [data.data, selected]
}

export default function Page() {
  const urlParams = useParams()
  const router = useRouter()

  const [data, setData] = useState<[DbQueryResponse[], string[]]>([[], []])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const [selected, setSelected] = useState<string[]>([])

  const id = urlParams.id?.toString()
  if (!id)
    router.push('/404')

  useEffect(() => {
    async function get() {
      setData(await getData(id as string, page, count))
    }
    get()
  }, [page, count, selected])

  const handleAdd = (item: string) => { console.log("ADD"); setSelected((ar) => ar.includes(item) ? ar : [...ar, item]) }
  const handleRemove = (item: string) => { console.log("REMOVE"); setSelected((ar) => ar.filter(i => i !== item)) }
  const handleSetCount = (count: number) => { console.log("SETCOUNT"); setCount(count) }
  const handleSetPage = (page: number) => { console.log("SETPAGE"); setCount(page) }

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      <ResumeTable data={data} id={id as string} selected={selected} page={page} count={count} setPage={handleSetPage} setCount={handleSetCount} removeSelected={handleRemove} addSelected={handleAdd} />

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:<br />
        <span className="font-medium text-white">09620900909</span>
      </div>
    </main>
  );
}
