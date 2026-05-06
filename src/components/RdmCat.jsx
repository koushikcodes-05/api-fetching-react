import React, { useEffect, useState } from "react";

function RdmCat() {
  const [cat, setCat] = useState([]);
  const [status, setStatus] = useState("idle");
  const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";

  useEffect(() => {
    const controller = new AbortController();
    async function loadCats() {
      setStatus("loading");
      try {
        const response = await fetch(url, { signal: controller.signal });
        console.log("This is the response", response);
        const jsonRes = await response.json();
        const data = await jsonRes.data;
        // const resData = await jsonRes
        console.log("The fetch response is", jsonRes);
        // const data = resData.map(ele => ele.id)
        console.log("load data", jsonRes?.data?.id);
        setCat(data);
        setStatus("Done");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStatus("error");
        }
      }
      return () => controller.abort();
    }
    loadCats();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Random Cat
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Discover amazing cat breeds
            </h1>
          </div>
        </div>

        {cat.name ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/50 backdrop-blur-sm">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {cat?.image && (
                <div className="flex justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-80 w-80 rounded-2xl border border-white/10 object-cover shadow-lg"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    Breed Name
                  </p>
                  <p className="text-2xl font-bold text-white">{cat.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    Origin
                  </p>
                  <p className="text-white">{cat.origin || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    Temperament
                  </p>
                  <p className="text-slate-300">{cat?.temperament || "N/A"}</p>
                </div>

                {cat?.wikipedia_url && (
                  <div>
                    <a
                      href={cat.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-500/20 px-4 py-2 text-amber-300 hover:bg-amber-500/30 transition-colors duration-300 font-semibold"
                    >
                      Learn More →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <p className="text-slate-400">Loading cat...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RdmCat;
