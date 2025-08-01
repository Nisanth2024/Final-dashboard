import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { CandidatesView } from "./components/CandidatesView";
import { InterviewsView } from "./components/InterviewsView";
import { allCandidates, type Candidate } from "./components/CandidatesView";
import { AddPersonModal } from "./components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [showAllCandidates, setShowAllCandidates] = useState(false)
  const [showInterviews, setShowInterviews] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState<'All' | 'Design Department' | 'Engineering Department'>('All')
  const [candidates, setCandidates] = useState<Candidate[]>(allCandidates)
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterDept, setFilterDept] = useState<string>('All');
  // Departments state for MainContent
  const [departments, setDepartments] = useState([
    { name: "Design Department", color: "purple" },
    { name: "Engineering Department", color: "orange" }
  ]);

  // Add state for CandidatesView filter and dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Handlers for dropdown and select
  const handleDropdown = () => setDropdownOpen((v) => !v);
  const handleSelect = (dept: string) => {
    setDropdownOpen(false);
    setDepartmentFilter(dept as 'All' | 'Design Department' | 'Engineering Department');
    setFilterDept(dept);
  };
  // Export handler (already implemented in CandidatesView, so just a no-op here)
  const handleExport = () => {};

  // Toggle sidebar open/close
  const handleMenuClick = () => setIsSidebarOpen((open) => !open)

  // Toggle notification panel open/close
  const handleNotificationClick = () => setIsNotificationOpen((open) => !open)

  // Toggle between showing one or all notifications
  const handleSeeAllNotifications = () => setShowAllNotifications(!showAllNotifications)

  // Show all candidates from sidebar
  const handleShowAllCandidates = () => {
    setShowAllCandidates(true)
    setShowInterviews(false)
    setDepartmentFilter('All');
    if (typeof setFilterStatus === 'function') setFilterStatus([]);
    if (typeof setFilterDept === 'function') setFilterDept('All');
  }
  const handleShowInterviews = () => {
    setShowInterviews(true)
    setShowAllCandidates(false)
  }
  const handleBackToDashboard = () => {
    setShowAllCandidates(false)
    setShowInterviews(false)
  }

  // Add handler for showing dashboard/home
  const handleShowDashboard = () => {
    setShowAllCandidates(false)
    setShowInterviews(false)
  }

  // Department filter handler
  const handleDepartmentChange = (dept: string) => {
    setDepartmentFilter(dept as 'All' | 'Design Department' | 'Engineering Department');
  }

  // Add person handler
  const handleAddPerson = (person: {
    type: 'candidate' | 'interviewer'
    name: string
    email: string
    phone: string
    location: string
    department: string
    experience: string
    skills: string[]
    avatar?: string
  }) => {
    if (person.type === 'candidate') {
      const newCandidate: Candidate = {
        id: candidates.length + 1,
        name: person.name,
        email: person.email,
        phone: person.phone,
        location: person.location,
        avatar: person.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
        status: 'pending',
        rating: Math.floor(Math.random() * 20 + 30) / 10, // Random rating between 3.0 and 5.0
        appliedDate: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
        experience: person.experience,
        skills: person.skills,
        department: person.department as 'Design Department' | 'Engineering Department'
      }
      
      // Add the new candidate to the list
      const updatedCandidates = [...candidates, newCandidate]
      setCandidates(updatedCandidates)
      
      // Automatically navigate to candidates view to show the new candidate
      setShowAllCandidates(true)
      setShowInterviews(false)
      
      // Set department filter to match the new candidate's department
      setDepartmentFilter(person.department as 'All' | 'Design Department' | 'Engineering Department')
      
      console.log('New candidate added:', newCandidate)
      console.log('Updated candidates list:', updatedCandidates)
    } else {
      // For interviewers, you could add them to a separate state or handle differently
      console.log('Added interviewer:', person)
    }
  }

  // Delete candidate handler
  const handleDeleteCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id))
  }

  // Add a ref to control AddPersonModal from outside Header
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const [] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <div className="w-full h-screen bg-gray-200">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          onMenuClick={handleMenuClick}
          onNotificationClick={handleNotificationClick}
          onAddPerson={handleAddPerson}
          onCreateType={(type) => {
            if (type === 'interview') {
              setShowInterviews(true);
              setShowAllCandidates(false);
            } else if (type === 'candidate') {
              setAddPersonModalOpen(true);
            }
          }}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
      {/* Fixed Sidebar */}
      <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 z-40 hidden md:flex flex-col">
        <Sidebar
          className="rounded-xl h-full"
          onShowAllCandidates={handleShowAllCandidates}
          onShowInterviews={handleShowInterviews}
          onShowDashboard={handleShowDashboard}
          language={language}
          setLanguage={setLanguage}
          onAddPerson={() => setAddPersonModalOpen(true)}
          onNotificationClick={handleNotificationClick}
        />
      </div>
      {/* Mobile sidebar overlay (only on small screens) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[9999] flex md:hidden">
          <div className={`relative w-64 h-full z-50 bg-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar className="rounded-xl h-full bg-gray-200" onClose={() => setIsSidebarOpen(false)} onShowAllCandidates={handleShowAllCandidates} onShowInterviews={handleShowInterviews} onShowDashboard={handleShowDashboard} language={language} setLanguage={setLanguage} onAddPerson={() => setAddPersonModalOpen(true)} onNotificationClick={handleNotificationClick} />
          </div>
          <div className="flex-1 h-full bg-black/30 z-40" onClick={() => setIsSidebarOpen(false)}></div>
        </div>
          )}
      {/* Main Content Area */}
      <div className="md:pl-60 h-screen pt-10">
        <div className="h-full overflow-y-auto p-2 sm:p-3 md:p-4 ipadpro:max-w-[900px] ipadpro:mx-auto">
          <div className="flex flex-1 flex-col min-h-[calc(100vh-64px)]">
            <AnimatePresence mode="wait">
              {showInterviews ? (
                <motion.div
                  key="interviews"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <InterviewsView onBack={handleBackToDashboard} />
                </motion.div>
              ) : showAllCandidates ? (
                <motion.div
                  key="candidates"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <CandidatesView 
                    onBack={handleBackToDashboard}
                    all={true}
                    department={departmentFilter}
                    onDepartmentChange={handleDepartmentChange}
                    candidates={candidates}
                    onDeleteCandidate={handleDeleteCandidate}
                    language={language}
                    setLanguage={setLanguage}
                    departments={departments}
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterDept={filterDept}
                    setFilterDept={setFilterDept}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    handleDropdown={handleDropdown}
                    handleSelect={handleSelect}
                    handleExport={handleExport}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <MainContent 
                    language={language} 
                    setLanguage={setLanguage} 
                    departments={departments}
                    setDepartments={setDepartments}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Notification Panel - slides in from right on mobile, dropdown/modal on desktop */}
      {/* Mobile Notification Panel */}
      <div className={
        `md:hidden fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out
        ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`
      }>
        <div className="w-80 h-full bg-white shadow-lg flex flex-col">
          {/* Notification Panel Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button 
              onClick={() => {
                setIsNotificationOpen(false)
                setShowAllNotifications(false)
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Notification Content */}
          <div className={`flex-1 p-4 ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <div className="space-y-4">
              {/* Always show the first notification */}
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 text-black mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">PRO mode activated</p>
                  <p className="text-xs text-gray-600">All premium features are now available for your account</p>
                </div>
              </div>
              {showAllNotifications && (
                <>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setAddPersonModalOpen(true)}>
                    <div className="w-4 h-4 text-green-600 mt-0.5">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New candidate added</p>
                      <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-4 h-4 text-orange-600 mt-0.5">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Phase deadline soon</p>
                      <p className="text-xs text-gray-600">Initial Review Phase 3 ends in 2 days</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Notification Panel Footer */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <button 
                onClick={handleSeeAllNotifications}
                className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3 rounded-lg transition-colors"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </button>
              <button 
                className="text-xs py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setNotesOpen(true)}
              >
                Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Notification Dropdown/Modal */}
      {isNotificationOpen && (
        <div className="hidden md:block fixed top-20 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl border animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button 
              onClick={() => {
                setIsNotificationOpen(false)
                setShowAllNotifications(false)
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={`flex-1 p-4 ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 text-black mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">PRO mode activated</p>
                  <p className="text-xs text-gray-600">All premium features are now available for your account</p>
                </div>
              </div>
              {showAllNotifications && (
                <>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-4 h-4 text-green-600 mt-0.5">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New candidate added</p>
                      <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-4 h-4 text-orange-600 mt-0.5">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Phase deadline soon</p>
                      <p className="text-xs text-gray-600">Initial Review Phase 3 ends in 2 days</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <button 
                onClick={handleSeeAllNotifications}
                className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3 rounded-lg transition-colors"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </button>
              <button className="text-xs py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Notes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* AddPersonModal for notification redirect */}
      <AddPersonModal 
        open={addPersonModalOpen}
        onOpenChange={setAddPersonModalOpen}
        onAddPerson={handleAddPerson}
        language={language}
        setLanguage={setLanguage}
      />
      {/* Notes Modal */}
      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <div className="mb-2 text-sm text-gray-600">
            Add, view, or edit private notes related to candidates, interview rounds, questions, sections, or interviewers.
          </div>
          <div className="space-y-2 mb-2">
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows={3}
              placeholder="Add a new note..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <button
              className="bg-black text-white px-3 py-1 rounded hover:bg-emerald-700 text-xs"
              onClick={() => {
                if (newNote.trim()) {
                  setNotes([newNote, ...notes]);
                  setNewNote("");
                }
              }}
            >Add Note</button>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {notes.length === 0 ? (
              <div className="text-gray-400 text-xs text-center">No notes yet.</div>
            ) : (
              notes.map((note, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-2 text-xs flex justify-between items-center">
                  <span>{note}</span>
                  <button className="text-red-500 ml-2 text-xs" onClick={() => setNotes(notes.filter((_, i) => i !== idx))}>Delete</button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <button className="text-xs px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setNotesOpen(false)}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Help & Support Modal */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
          </DialogHeader>
          <div className="mb-2 text-sm text-gray-600 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            Welcome to the Help Center! How can we assist you?
          </div>
          <div className="mb-2 text-xs text-gray-500">This is a placeholder for chat support or help articles. You can integrate a real chat widget or FAQ here.</div>
          <div className="bg-gray-100 rounded p-3 text-xs text-gray-700 mb-2">
            <strong>Common Topics:</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>How to add a candidate</li>
              <li>How to schedule an interview</li>
              <li>How to use the dashboard</li>
              <li>Contact support</li>
            </ul>
          </div>
          <DialogFooter>
            <button className="text-xs px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setHelpOpen(false)}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
