import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import SettingsComponent from "../components/SettingsPage";
import { AddPersonModal } from "../components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, X, UserPlus, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCandidates, type Candidate } from "../components/CandidatesView";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [, setDepartmentFilter] = useState<'All' | 'Design Department' | 'Engineering Department'>('All')
  const [candidates, setCandidates] = useState<Candidate[]>(allCandidates)
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [] = useState<string[]>([]);
  const [] = useState<string>('All');
  // Departments state for MainContent
  const [] = useState([
    { name: "Design Department", color: "purple" },
    { name: "Engineering Department", color: "orange" }
  ]);

  // Add state for CandidatesView filter and dropdown
  const [] = useState(false);
  const [] = useState(false);
  // Handlers for dropdown and select
  // Export handler (already implemented in CandidatesView, so just a no-op here)

  // Toggle sidebar open/close
  const handleMenuClick = () => setIsSidebarOpen((open) => !open)

  // Toggle notification panel open/close
  const handleNotificationClick = () => setIsNotificationOpen((open) => !open)

  // Toggle between showing one or all notifications
  const handleSeeAllNotifications = () => setShowAllNotifications(!showAllNotifications)

  // Navigation handlers
  const handleShowAllCandidates = () => {
    navigate('/candidates');
  }
  const handleShowInterviews = () => {
    navigate('/interviews');
  }
  const handleShowDashboard = () => {
    navigate('/dashboard');
  }
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  }

  // Department filter handler

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
              navigate('/interviews');
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
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <SettingsComponent onBack={handleBackToDashboard} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Notification Panel - slides in from right on mobile, dropdown/modal on desktop */}
      {/* Mobile Notification Panel */}
      {isNotificationOpen && (
        <div className={`md:hidden fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="w-80 h-full bg-white shadow-lg flex flex-col">
            {/* Notification Panel Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsNotificationOpen(false)
                    setShowAllNotifications(false)
                  }}
                  className="p-2 hover:bg-emerald-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {/* Notification Content */}
            <div className={`flex-1 p-4 ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              <div className="space-y-4">
                {/* Always show the first notification */}
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
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
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700 cursor-pointer" onClick={() => setAddPersonModalOpen(true)}>
                      <div className="w-4 h-4 text-green-600 mt-0.5">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New candidate added</p>
                        <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
                      <div className="w-4 h-4 text-orange-600 mt-0.5">
                        <Clock className="w-4 h-4" />
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
                <div>
                  <Button 
                    onClick={handleSeeAllNotifications}
                    className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3"
                  >
                    {showAllNotifications ? 'Show less' : 'See all notifications'}
                  </Button>
                </div>
                <div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-xs py-2 px-3 border border-gray-300 hover:bg-emerald-700"
                    onClick={() => setNotesOpen(true)}
                  >
                    Notes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Notification Dropdown/Modal */}
      {isNotificationOpen && (
        <div className="hidden md:block fixed top-20 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl border">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsNotificationOpen(false)
                  setShowAllNotifications(false)
                }}
                className="p-2 hover:bg-emerald-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className={`flex-1 p-4 ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
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
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
                    <div className="w-4 h-4 text-green-600 mt-0.5">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New candidate added</p>
                      <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
                    <div className="w-4 h-4 text-orange-600 mt-0.5">
                      <Clock className="w-4 h-4" />
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
              <div>
                <Button 
                  onClick={handleSeeAllNotifications}
                  className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3"
                >
                  {showAllNotifications ? 'Show less' : 'See all notifications'}
                </Button>
              </div>
              <div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs py-2 px-3 border border-gray-300 hover:bg-emerald-700"
                  onClick={() => setNotesOpen(true)}
                >
                  Notes
                </Button>
              </div>
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
            <Textarea
              className="w-full"
              rows={3}
              placeholder="Add a new note..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <div>
              <Button
                className="bg-black text-white px-3 py-1 hover:bg-emerald-700 text-xs"
                onClick={() => {
                  if (newNote.trim()) {
                    setNotes([newNote, ...notes]);
                    setNewNote("");
                  }
                }}
              >
                Add Note
              </Button>
            </div>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {notes.length === 0 ? (
              <div className="text-gray-400 text-xs text-center">No notes yet.</div>
            ) : (
              notes.map((note, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-100 rounded p-2 text-xs flex justify-between items-center"
                >
                  <span>{note}</span>
                  <div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 ml-2 text-xs p-0 h-auto" 
                      onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <div>
                <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-emerald-700">
                  Close
                </Button>
              </div>
            </DialogClose>
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
            <DialogClose asChild>
              <div>
                <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-emerald-700">
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
