import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-colors duration-300">
            <h1 className="text-xl font-semibold tracking-tight">DevForge</h1>

            <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
                {isDarkMode ? (
                    <>
                        <SunIcon className="h-5 w-5" />
                        <span>Light</span>
                    </>
                ) : (
                    <>
                        <MoonIcon className="h-5 w-5" />
                        <span>Dark</span>
                    </>
                )}
            </button>
        </header>
    );
}
