export default function Home() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Welcome to DevForge
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Your all-in-one developer utility hub — run tools, manage snippets, and customize themes,
                    right from a local app.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Utilities</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Format JSON, prettify code, and more developer tools at your fingertips.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Theme Builder</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Customize your colors, typography, and export Tailwind configs.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Snippet Manager</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Save, organize, and search your favorite code snippets.
                    </p>
                </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
                🚀 Pro tip: Use the sidebar to quickly navigate between tools.
            </p>
        </div>
    );
}
