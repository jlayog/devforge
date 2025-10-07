import React, { useState } from "react";

type JsonFormatterProps = {
  value: unknown | string;
  indent?: number;
};

export default function JsonFormatter({
  value,
  indent = 2,
}: JsonFormatterProps) {
  const [copied, setCopied] = useState(false);

  let formatted = "";

  if (typeof value === "string") {
    // Try to parse JSON strings; otherwise show the raw string as-is
    try {
      const parsed = JSON.parse(value);
      formatted = JSON.stringify(parsed, null, indent);
    } catch {
      formatted = value;
    }
  } else {
    try {
      formatted = JSON.stringify(value, null, indent);
    } catch {
      formatted = "[Unserializable value]";
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Clipboard write failed");
    }
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Formatted output
      </h4>
      <div
        className='mt-1 w-full rounded-md border border-gray-200 bg-gray-100 p-3 shadow-sm font-mono text-sm text-gray-900
           dark:border-gray-700 dark:bg-gray-900  dark:text-gray-100 hover:shadow-md focus:outline-indigo-600"'
      >
        <pre className="">
          <code className="language-json">{formatted}</code>
        </pre>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={copyToClipboard}
          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {copied ? "Copied!" : "Copy "}
          {!copied && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
