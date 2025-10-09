import { useState, Suspense, lazy } from "react";

const JsonFormatterTool = lazy(() => import("../components/JsonFormatterTool"));
const LoremIpsumTool = lazy(() => import("../components/LoremIpsumTool"));

export default function Utilities() {
  const [activeTool, setActiveTool] = useState<string>("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Utilities
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Developer tools and utilities to help with your workflow.
        </p>
      </div>

      <div className="flex gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setActiveTool("json")}
          aria-pressed={activeTool === "json"}
          className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTool === "json"
              ? "bg-indigo-600 text-white dark:bg-indigo-500"
              : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          JSON Formatter
        </button>
        <button
          type="button"
          onClick={() => setActiveTool("lorem")}
          aria-pressed={activeTool === "lorem"}
          className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTool === "lorem"
              ? "bg-indigo-600 text-white dark:bg-indigo-500"
              : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Lorem Ipsum Generator
        </button>
      </div>

      <div>
        {activeTool === "" ? (
          <p className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            Pick a tool to start.
          </p>
        ) : (
          <Suspense
            fallback={
              <p className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                Loading tool…
              </p>
            }
          >
            {activeTool === "json" && <JsonFormatterTool />}
            {activeTool === "lorem" && <LoremIpsumTool />}
          </Suspense>
        )}
      </div>
    </div>
  );
}
