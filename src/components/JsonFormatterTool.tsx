import { useState } from "react";
import JsonFormatter from "../modules/utilities/JsonFormatter";

export default function JsonFormatterTool() {
  const [input, setInput] = useState<string>('{ "hello": "world", "n": 42 }');

  return (
    <div
      className="max-w-3xl mx-auto space-y-4 p-4
    rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-all duration-300"
    >
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          JSON Formatter
        </h3>

        <label
          htmlFor="json-input"
          className="block mt-1 text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Input (JSON or plain text)
        </label>
        <textarea
          id="json-input"
          className="mt-1 w-full h-40 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-sm font-mono text-sm text-gray-900
           dark:border-gray-700 dark:bg-gray-900  dark:text-gray-100 hover:shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"example": true}'
          spellCheck={false}
        />
      </div>

      <JsonFormatter value={input} indent={2} />
    </div>
  );
}
