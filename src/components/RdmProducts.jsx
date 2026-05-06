import React, { useEffect, useState } from "react";

function RdmProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const url = "https://api.freeapi.app/api/v1/public/randomproducts";

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setStatus("loading");
      try {
        const response = await fetch(url, { signal: controller.signal });
        const resData = await response.json();
        const data = resData.data.data;
        console.log("logging data", data);
        console.log('image url', data?.thumbnail)
        
        setProducts(data);
        // console.log("products", products);

        setStatus("Done");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Failed to fetch data");
        } else {
          setStatus("Error");
        }
      }
    }
    loadProducts();
    return () => controller.abort();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
              Random Products
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore random products
            </h1>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/50 backdrop-blur-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
              >
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 w-full rounded-lg object-cover mb-4 border border-white/10"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-semibold">Category:</span>
                      <span className="text-slate-300">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-semibold">Brand:</span>
                      <span className="text-slate-300">{product.brand || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-semibold">Rating:</span>
                      <span className="text-yellow-400 font-semibold">{product.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-semibold">Discount:</span>
                      <span className="text-red-400 font-semibold">{product.discountPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400">Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RdmProducts;
