import { Outlet } from "react-router";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

export default function AppLayout() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar />

        {/* Main section */}
        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>

  );
}
