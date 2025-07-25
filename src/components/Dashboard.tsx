import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { MainContent } from "./MainContent"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en')
  const [departments, setDepartments] = useState([
    { name: "Design Department", color: "purple" },
    { name: "Engineering Department", color: "orange" }
  ])

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 p-0">
      <div className="flex flex-col min-h-screen">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          onNotificationClick={handleNotificationClick}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Sidebar: Sheet on mobile, static on desktop */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2">Menu</button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar
                onClose={() => setIsSidebarOpen(false)}
                language={language}
                setLanguage={setLanguage}
              />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar
              onClose={() => setIsSidebarOpen(false)}
              language={language}
              setLanguage={setLanguage}
            />
          </div>
          <main className="flex-1 flex flex-col min-w-0">
            <MainContent
              language={language}
              setLanguage={setLanguage}
              departments={departments}
              setDepartments={setDepartments}
            />
          </main>
        </div>
      </div>
      {/* Mobile Notification Panel - slides in from right */}
        <div className={`fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-80`}>
          <div className="h-full bg-white shadow-lg flex flex-col">
          {/* Notification Panel Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <h2 className="text-base font-semibold">Notifications</h2>
            <button 
              onClick={() => setIsNotificationOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Notification Content */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-2">
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 text-black mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">Pro Mode</p>
                  <p className="text-xs text-gray-600 leading-tight">Upgrade to Pro for advanced features.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 text-green-600 mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">New Candidate</p>
                  <p className="text-xs text-gray-600 leading-tight">A new candidate has applied for a position.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 text-orange-600 mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">Phase Deadline</p>
                  <p className="text-xs text-gray-600 leading-tight">A candidate's phase deadline is approaching.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Notification Panel Footer */}
          <div className="px-3 py-2 border-t">
            <div className="flex space-x-1">
                <button className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-1.5 px-2 rounded-lg transition-colors">
                See All Notifications
              </button>
              <button className="text-xs py-1.5 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop for mobile notification panel */}
      {isNotificationOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}
    </div>
  );
} 