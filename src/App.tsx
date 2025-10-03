import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to DevForge
              </h1>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
