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
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
