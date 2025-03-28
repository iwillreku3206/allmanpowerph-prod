'use client'

import { type DbQueryResponse } from "@/app/api/v0/searches/candidates/route";
import { ResumeTable } from "@/components/table";
import { Title } from "@/components/ui/title";
import { useParams, useRouter } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";

async function getData(search: string, page: number, count: number): Promise<[DbQueryResponse[], string[], number]> {
  const res = await fetch(`/api/v0/searches/candidates?search=${search}&page=${page}&count=${count}`)
  const data = await res.json() as { data: DbQueryResponse[], totalCount: number }
  const selected = data.data.filter(a => a.requested_interview).map(a => a.id)

  return [data.data, selected, data.totalCount]
}

export default function Page() {
  const urlParams = useParams()
  const router = useRouter()

  const [data, setData] = useState<[DbQueryResponse[], string[]]>([[], []])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [firstLoadDone, setFirstLoadDone] = useState(false)
  const [count, setCount] = useState(10)
  const [selected, setSelected] = useState<string[]>([])

  const id = urlParams.id?.toString()
  if (!id)
    router.push('/404')

  useEffect(() => {
    async function get() {
      const data = await getData(id as string, page, count)
      setData([data[0], data[1]])
      setTotalCount(data[2])
      setFirstLoadDone(true)
    }
    get()
  }, [page, count, selected])

  const handleAdd = (item: string) => { setSelected((ar) => ar.includes(item) ? ar : [...ar, item]) }
  const handleRemove = (item: string) => { setSelected((ar) => ar.filter(i => i !== item)) }
  const handleSetCount = (count: number) => { setCount(count) }
  const handleSetPage = (page: number) => { setPage(page) }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      <ResumeTable data={data} id={id as string} selected={selected} page={page} maxPage={Math.ceil(totalCount / count)} firstLoadDone={firstLoadDone} count={count} setPage={handleSetPage} setCount={handleSetCount} removeSelected={handleRemove} addSelected={handleAdd} />

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:<br />
        <span className="font-medium text-white">09620900909</span>
      </div>
    </main>
  );
}
