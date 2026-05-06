import React, { useState, useEffect } from "react";

function RdmQuote() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const url = "https://api.freeapi.app/api/v1/public/quotes";
    const controller = new AbortController();

    async function loadQuotes() {
      try {
        setStatus("loading");
        const response = await fetch(url, { signal: controller.signal });
        const resData = await response.json();

        const data = resData.data.data;
        console.log(data);
        console.log("Keys are", Object.keys(data));
        console.log("values are", Object.values(data));

        setQuotes(data);
        setStatus("Successfully fetched");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        }
      }
    }
    loadQuotes();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
              Random Quotes
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Inspire yourself with random quotes
            </h1>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {quotes.length > 0 ? (
            quotes.map((ele) => (
              <div
                key={ele.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/50 backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-shadow duration-300"
              >
                <p className="text-lg font-medium text-slate-100 italic mb-4">
                  "{ele.content}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-400">
                    — {ele.author}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400">Loading quotes...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RdmQuote;
