import { NavLink } from "react-router";

export default function Sidebar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `block rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive
            ? "bg-indigo-600 text-white dark:bg-indigo-500"
            : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
        }`;

    return (
        <aside className="w-60 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 transition-colors duration-300">
            <nav className="space-y-2">
                <NavLink to="/" end className={linkClasses}>
                    Home
                </NavLink>
                <NavLink to="/utilities" className={linkClasses}>
                    Utilities
                </NavLink>
                <NavLink to="/theme" className={linkClasses}>
                    Theme Builder
                </NavLink>
                <NavLink to="/snippets" className={linkClasses}>
                    Snippets
                </NavLink>
            </nav>
        </aside>
    );
}
