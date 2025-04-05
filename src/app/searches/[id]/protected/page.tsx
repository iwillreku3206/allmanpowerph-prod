"use client";

import { Button } from "@/components/form/button";
import { ResumeTable } from "@/components/table";
import { Title } from "@/components/ui/branding";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function getData(
  search: string,
  page: number,
  count: number
): Promise<any> {
  let onResolve: Function, onReject: Function;
  let data: Promise<any> = new Promise((res, rej) => {
    onResolve = res;
    onReject = rej;
  });

  // Max wait of 2.5 seconds, after that, pull from db no matter what
  setTimeout(async () => {
    await fetch(
      `/api/v0/searches/connections?search=${search}&page=${page}&count=${count}`
    )
      .then((r) => r.json())
      .then(({ connections }) => onResolve(connections));
  }, 2500);

  // Requests the server to do AI sht
  const res = await fetch(
    `/api/v0/searches/candidates?search=${search}&page=${page}&count=${count}`
  );

  // Await data
  const result = await data;

  // Return awaited data
  return result;
}

export default function Page() {
  const urlParams = useParams();
  const router = useRouter();

  // I cant be bothered to figure out the types for this sht atm
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [count, setCount] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const id = urlParams.id?.toString();
  if (!id) router.push("/404");

  async function get() {
    const data = await getData(id as string, page, count);
    setData(data);
    setTotalCount(data.length);
    setFirstLoadDone(true);
  }

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    const interval = setInterval(get, 7000)
    setIntervalId(interval as unknown as number)
    get();
  }, [page, count, selected]);

  const handleAdd = (item: string) => {
    setSelected((ar) => (ar.includes(item) ? ar : [...ar, item]));
  };
  const handleRemove = (item: string) => {
    setSelected((ar) => ar.filter((i) => i !== item));
  };
  const handleSetCount = (count: number) => {
    setCount(count);
  };
  const handleSetPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (dialogRef.current?.open && !dialogOpen) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && dialogOpen) {
      dialogRef.current?.showModal();
    }
  }, [dialogOpen]);

  async function handleContactSubmission() {
    setDisableSubmit(true);
    await fetch("/api/v0/searches/candidate-interview-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: id as string,
        candidates: selected,
      }),
    });
    setDisableSubmit(false);
    setDialogOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      {data ? (
        <ResumeTable
          data={data}
          id={id as string}
          selected={selected}
          page={page}
          maxPage={Math.ceil(totalCount / count)}
          firstLoadDone={firstLoadDone}
          count={count}
          setPage={handleSetPage}
          setCount={handleSetCount}
          removeSelected={handleRemove}
          addSelected={handleAdd}
          handleSubmit={handleContactSubmission}
          disableSubmit={disableSubmit}
        />
      ) : (
        "Loading..."
      )}

      <dialog ref={dialogRef} className="p-8 rounded-lg max-h-[400px] h-screen">
        <div className="flex flex-col h-full">
          <h1 className="font-bold text-2xl mb-4">Thank you!</h1>
          <hr />
          <p>
            Thank you for using our service! We will contact you regarding the
            details of the agency with your preferred candidates
          </p>
          <Button
            className="bg-primary mt-auto"
            onClick={() => dialogRef.current?.close()}
          >
            Close.
          </Button>
        </div>
      </dialog>

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:
        <br />
        <span className="font-medium text-white">09270251730</span>
      </div>
    </main>
  );
}
