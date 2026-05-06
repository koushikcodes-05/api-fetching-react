import React, { useEffect, useState } from "react";

function RdmJokes() {
  const [jokes, setJokes] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        setStatus("loading");
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomjokes",
          { signal: controller.signal },
        );
        const data = await response.json();
        //  console.log(data);
        const manpulData = data.data.data;
        console.log("loging manpul data", manpulData);
        setJokes(manpulData);
        console.log("Logging jokes", jokes);
        
        // console.log("The manpul data", manpulData);
        
        const id = manpulData.map((ele) => ele.id);
        console.log(id);

        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStatus("error");
        }
      }
    }
    loadPost();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
              Random Jokes
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Laugh a little with fresh random jokes
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Jokes are loaded live from the FreeAPI public endpoint. Refresh the page for new punchlines anytime.
            </p>
          </div>

          <div className="mt-6">
            {status === "loading" ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-slate-950/70 px-4 py-3 text-sm text-indigo-100 shadow-sm">
                <span className="h-3 w-3 animate-pulse rounded-full bg-indigo-400" />
                Loading jokes...
              </div>
            ) : status === "error" ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">
                Unable to load jokes right now. Please try again later.
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {jokes.map((item) => (
            <article
              key={item.id}
              className="group rounded-[28px] border border-white/10 bg-slate-900/85 p-6 shadow-xl shadow-slate-950/40 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-slate-800/90"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.25em] text-indigo-300">Joke</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-300">
                  #{item.id}
                </span>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-100">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RdmJokes;
