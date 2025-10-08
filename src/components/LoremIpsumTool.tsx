import { useState } from "react";
import loremData from "../assets/loremData.json";

function takeRepeated(arr, n) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[i % arr.length]);
  return out;
}

function ensurePeriod(str) {
  return /[.!?]$/.test(str.trim()) ? str.trim() : str.trim() + ".";
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeOutputParagraphs(count, unit, data) {
  const d = data || loremData;

  if (unit === "words") {
    const words = takeRepeated(d.words, count);
    if (words.length === 0) return [""];
    const first = capitalizeFirst(words[0]);
    const paragraph = ensurePeriod([first, ...words.slice(1)].join(" "));
    return [paragraph];
  }

  if (unit === "sentences") {
    const sentences = takeRepeated(d.sentences, count).map(ensurePeriod);
    if (sentences.length === 0) return [""];
    return [sentences.join(" ")];
  }

  const paragraphs = takeRepeated(d.paragraphs, count).map((p) =>
    ensurePeriod(p)
  );
  return paragraphs.length ? paragraphs : [""];
}

export default function LoremIpsumTool({ data = loremData }) {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState("paragraphs"); // 'words' | 'sentences' | 'paragraphs'
  const [output, setOutput] = useState(() =>
    makeOutputParagraphs(3, "paragraphs", data)
  );
  const [copied, setCopied] = useState(false);

  function handleGenerate(e) {
    e?.preventDefault?.();
    const n = Number(count);
    const safe = Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 200) : 1;
    setOutput(makeOutputParagraphs(safe, unit, data));
  }

  async function handleCopy() {
    const text = output.join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  return (
    <div
      className="max-w-3xl mx-auto space-y-4 p-4
    rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-all duration-300"
    >
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Lorem Ipsum Generator
        </h3>

        <form
          onSubmit={handleGenerate}
          className="flex flex-wrap items-end gap-4"
        >
          <label className="flex flex-col text-sm font-medium text-gray-600 dark:text-gray-400">
            Amount
            <input
              type="number"
              min={1}
              max={200}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="mt-1 w-20 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-sm text-sm text-gray-900
           dark:border-gray-700 dark:bg-gray-900  dark:text-gray-100 hover:shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-gray-600 dark:text-gray-400">
            Type
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-sm text-sm text-gray-900
           dark:border-gray-700 dark:bg-gray-900  dark:text-gray-100 hover:shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </label>

          <div className="flex items-center">
            <button
              type="submit"
              onClick={handleGenerate}
              className="px-4 py-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500"
            >
              Generate
            </button>
          </div>

          <div className="flex items-center ml-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500"
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
        </form>

        <div className="mt-6 space-y-4 leading-relaxed">
          {output.map((para, idx) => (
            <p key={idx} className="m-0 whitespace-pre-wrap">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
