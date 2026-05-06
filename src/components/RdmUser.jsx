import React, { useEffect, useState } from "react";

function RdmUser() {
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState("idle");
  const url = "https://api.freeapi.app/api/v1/public/randomusers/user/random";

  useEffect(() => {
    const controller = new AbortController();
    async function loadUser() {
      try {
        setStatus("loading");
        const response = await fetch(url, { signal: controller.signal });
        const resData = await response.json();
        console.log(resData);
        const data = resData.data;
        console.log(data);
        setUser(data);
        console.log(data);
        setStatus("Fetched successfully");
      } catch (error) {
        if (error.name === "AabortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
        }
      }
    }
    loadUser()
    const userData = {
      
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-purple-200">
              Random User
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Meet a random user
            </h1>
          </div>
        </div>

        {user.id ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/50 backdrop-blur-sm">
            <div className="grid gap-6 md:grid-cols-2">
              {user?.picture?.large && (
                <div className="flex justify-center">
                  <img
                    src={user.picture.large}
                    alt={user.name?.first || "User"}
                    className="h-64 w-64 rounded-2xl border border-white/10 object-cover shadow-lg"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Name
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {user?.name ? Object.values(user.name).join(" ") : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Gender
                  </p>
                  <p className="text-white capitalize">{user.gender || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Email
                  </p>
                  <p className="text-white break-all">{user.email || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Phone
                  </p>
                  <p className="text-white">{user.phone || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Location
                  </p>
                  <p className="text-white">
                    {user?.location?.country || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    User ID
                  </p>
                  <p className="text-xs font-mono text-slate-400">{user.id || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <p className="text-slate-400">Loading user...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RdmUser;
