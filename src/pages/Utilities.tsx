import JsonFormatterTool from "../components/JsonFormatterTool";

export default function Utilities() {
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
            
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">
                    Utility tools will be implemented here.
                </p>
            </div>

            <JsonFormatterTool />

        </div>
    )
}