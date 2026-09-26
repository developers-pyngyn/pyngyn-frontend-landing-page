import React from "react";
import { PyngynWebsiteProduct, ProductScreenType } from "@/components/product/website/PyngynWebsiteProduct";

interface PageProps {
  searchParams?: {
    screen?: ProductScreenType;
    client?: "oswal" | "shreeji";
  };
}

export default function MockupPreviewPage({ searchParams }: PageProps) {
  const activeScreen = (searchParams?.screen as ProductScreenType) || "tasks";
  const activeClient = (searchParams?.client as "oswal" | "shreeji") || "oswal";

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6 font-sans">
      <div className="max-w-[1240px] mx-auto bg-white p-3 rounded-xl shadow-xs border border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Pyngyn Product Mockups Visual QA</h1>
          <p className="text-xs text-slate-500">
            Rendering screen: <strong>{activeScreen.toUpperCase()}</strong> | Client: <strong>{activeClient.toUpperCase()}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["tasks", "board", "audit", "calendar", "workload"] as ProductScreenType[]).map((s) => (
            <a
              key={s}
              href={`/mockup-preview?screen=${s}&client=${activeClient}`}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeScreen === s
                  ? "bg-[#14223d] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {s.toUpperCase()}
            </a>
          ))}
          <a
            href={`/mockup-preview?screen=${activeScreen}&client=${activeClient === "oswal" ? "shreeji" : "oswal"}`}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
          >
            Switch to {activeClient === "oswal" ? "SHREEJI" : "OSWAL"}
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto">
        <PyngynWebsiteProduct screen={activeScreen} clientId={activeClient} />
      </div>
    </div>
  );
}
