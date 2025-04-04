import { useEffect, useState } from "react";

export default function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource("/api/getCandidates");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.candidates) {
        setCandidates((prev) => [...prev, ...data.candidates]);
      }

      if (data.totalProcessed) {
        setTotal(data.totalProcessed);
      }

      if (data.message === "Processing complete") {
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Processed Candidates</h1>
      <p>Total Processed: {total}</p>
      <ul>
        {candidates.map((c, i) => (
          <li key={i}>
            {c.name} - {c.monthly_salary}
          </li>
        ))}
      </ul>
    </div>
  );
}
