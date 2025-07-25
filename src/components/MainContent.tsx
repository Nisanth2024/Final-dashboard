import { useState } from "react"
import { ChevronRight, ChevronDown, Download, Filter as FilterIcon } from "lucide-react"
import { InterviewRounds } from "./InterviewRounds"
import { InterviewOverview } from "./InterviewOverview"
import { CandidatesView } from "./CandidatesView"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"

const interviewers = [
  { name: "John Doe", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Ryan King", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Sarah Miller", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Priya Patel", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Alex Lee", img: "https://randomuser.me/api/portraits/men/51.jpg" },
  { name: "Maria Garcia", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "David Kim", img: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Emily Chen", img: "https://randomuser.me/api/portraits/women/12.jpg" },
]

export function MainContent({ language, setLanguage, departments }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void, departments: { name: string, color: string }[], setDepartments: (depts: { name: string, color: string }[]) => void }) {
  const t = useTranslation(language);
  const [currentView, setCurrentView] = useState<'dashboard' | 'candidates'>('dashboard')
  const [currentCandidatesRound, setCurrentCandidatesRound] = useState<1 | 2>(1)
  const [showInterviewersModal, setShowInterviewersModal] = useState(false)

  // Section panel state
  const [sections, setSections] = useState([
    { name: "Introduction", details: "5m • 7 Questions" },
    { name: "Portfolio Review", details: "4m • 4 Questions" },
    { name: "Background Check", details: "6m • 5 Questions" },
    { name: "Skill Assessment", details: "30m • 7 Questions" },
  ])
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newSection, setNewSection] = useState("")
  const [creating, setCreating] = useState(false)

  // State for department filter and export (lifted from CandidatesView)
  const [department, setDepartment] = useState<'All' | 'Design Department' | 'Engineering Department'>('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterDept, setFilterDept] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdown = () => setDropdownOpen((v) => !v);
  const handleSelect = (dept: string) => {
    setDropdownOpen(false);
    setDepartment(dept as 'All' | 'Design Department' | 'Engineering Department');
    setCurrentView('candidates');
  };
  const handleExport = () => {
    // Export logic can be implemented here or passed down
    // For now, just a placeholder
    if (window && window.alert) window.alert('Export triggered!');
  };

  const handleViewCandidates = () => {
    setCurrentCandidatesRound(1)
    setCurrentView('candidates')
  }

  const handleViewCandidatesRound2 = () => {
    setCurrentCandidatesRound(2)
    setCurrentView('candidates')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleCreateSection = () => {
    if (newSection.trim()) {
      setCreating(true)
      setSections(prev => [...prev, { name: newSection.trim(), details: "New Section" }])
      setAddDialogOpen(false)
      setNewSection("")
      setCreating(false)
    }
  }

  if (currentView === 'candidates') {
    return (
      <div className="flex-1 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-200 overflow-hidden flex flex-col">
        <CandidatesView
          onBack={handleBackToDashboard}
          round={currentCandidatesRound}
          language={language}
          setLanguage={setLanguage}
          departments={departments}
          department={department}
          onDepartmentChange={handleSelect}
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
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-200 overflow-x-auto flex flex-col pt-4 pb-9 scroll-pt-16"
    >
      {/* Breadcrumbs and Page Title */}
      
      <div className="w-full px-0 pt-4 pb-0">
        <div className="mb-0 -pl-1 -mt-6 sm:mb-1 md:mb-2 lg:mb-3 flex-shrink-0">
          <div className="flex flex-wrap items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 mb-2">
            <span>{t.candidates}</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">{t.candidatesTitle || "Candidates"}</span>
            <span className="sm:hidden">{t.candidatesTitle || "Candidates"}</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-black">{t.round} 3</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-0">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{t.round}</h2>
            {/* All Departments, Export, Filter buttons at top right */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto md:flex-wrap md:w-full md:space-x-2 md:gap-y-2 lg:flex-nowrap lg:w-auto lg:space-x-2">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="items-center space-x-1 text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white hidden sm:flex"
                  onClick={handleDropdown}
                >
                  <span>{department === 'All' ? 'All Departments' : department}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50 ">
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'All' ? 'font-semibold' : ''}`}
                      onClick={() => handleSelect('All')}
                    >
                      All Departments
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'Design Department' ? 'font-semibold' : ''}`}
                      onClick={() => handleSelect('Design Department')}
                    >
                      Design Department
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'Engineering Department' ? 'font-semibold' : ''}`}
                      onClick={() => handleSelect('Engineering Department')}
                    >
                      Engineering Department
                    </button>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white" onClick={handleExport}>
                <Download className="w-3 h-3 mr-0" />
                Export
              </Button>
              <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white hidden sm:flex" onClick={() => setFilterOpen(true)}>
                    <FilterIcon className="w-3 h-3 mr-0" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Candidates</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="font-semibold text-xs mb-1">Status</div>
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'reviewed', 'shortlisted', 'rejected'].map(status => (
                          <label key={status} className="flex items-center gap-1 text-xs">
                            <input
                              type="checkbox"
                              checked={filterStatus.includes(status)}
                              onChange={e => {
                                setFilterStatus(s => e.target.checked ? [...s, status] : s.filter(st => st !== status));
                              }}
                            />
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-xs mb-1">Department</div>
                      <select
                        className="border rounded px-2 py-1 text-xs"
                        value={filterDept}
                        onChange={e => setFilterDept(e.target.value)}
                      >
                        <option value="All">All</option>
                        {(departments || []).map((dept, idx) => (
                          <option key={dept.name + idx} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setFilterOpen(false)} className="bg-black hover:bg-emerald-700 text-white">Apply</Button>
                    <DialogClose asChild>
                      <Button variant="ghost" className="hover:bg-emerald-700">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Responsive Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex-1 flex flex-col gap-1 md:gap-2 mb-10"
      >
        {/* ROUND Panel - Full width, no right panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="w-full"
        >
          <InterviewRounds onViewCandidates={handleViewCandidates} onViewCandidatesRound2={handleViewCandidatesRound2} language={language} setLanguage={setLanguage} />
        </motion.div>

        {/* Previous Background Card and Right Side Stack - responsive layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-1 md:gap-2 items-stretch"
        >
          {/* Previous Background Card - responsive width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="w-full md:flex-[2] min-w-0 h-full flex flex-col md:mt-0"
          >
            <InterviewOverview language={language} setLanguage={setLanguage} />
          </motion.div>
          {/* Right Side: Two stacked cards, responsive and visible on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="w-full md:flex-[1] flex flex-col justify-between min-w-0 mt-1 md:mt-2"
            style={{ marginLeft: 0 }}
          >
            {/* Top Card - responsive height */}
            <div className="mb-1 md:mb-0" style={{ height: undefined }}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-md mt-11 mb-6 md:mb-2 p-2 md:p-3 pb-6 flex flex-col justify-start min-h-[100px]"
              >
                <div className="flex flex-row items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg leading-tight">{"Assigned Interviewers"}</h3>
                    <p className="text-gray-500 text-xs md:text-sm mt-0.5">{"Interview panel for this position"}</p>
                  </div>
                  <button
                    className="ml-auto p-2 rounded-full hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
                    aria-label={"View all interviewers"}
                    onClick={() => setShowInterviewersModal(true)}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="flex flex-wrap items-center mt-2 gap-1">
                  <div className="flex -space-x-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User 2" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 3" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <div className="bg-emerald-700 text-white text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full ml-0 md:ml-2">+5</div>
                  </div>
                  
                </div>
              </motion.div>
            </div>
      {/* Bottom Card - Sections Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col gap-1"
            >
      <Card className="rounded-lg p-4 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col mt-4 md:mt-0">
        <div className="flex items-center justify-between mb-1 -mt-2">
                  <span className="font-bold text-lg">{t.section || "Section"}</span>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black text-white hover:bg-emerald-700 hover:text-white rounded-xl px-2 py-1 text-sm font-medium transition-colors"
              >
                 {t.addSection}
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 max-w-xs">
              <DialogHeader>
                        <DialogTitle>{t.addSection}</DialogTitle>
                        <DialogDescription>{"Add a new section to the interview."}</DialogDescription>
              </DialogHeader>
              <Input
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={"Section Name"}
                value={newSection}
                onChange={e => setNewSection(e.target.value)}
                autoFocus
              />
              <DialogFooter className="flex gap-2 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm rounded px-3 py-2"
                  onClick={() => setAddDialogOpen(false)}
                  disabled={creating}
                >{t.cancel}</Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-emerald-700 text-sm rounded px-3 py-2"
                  onClick={handleCreateSection}
                  disabled={!newSection.trim() || creating}
                        >{t.create}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-0.5 -mt-5">
          {sections.map((section, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white rounded-xl border px-2 py-2">
              <div>
                <div className="font-medium text-xs">{section.name}</div>
                <div className="text-gray-400 text-xs">{section.details}</div>
              </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-lg text-gray-400 cursor-pointer"
                            aria-label={"Section actions"}
                  >
                    ⋮
                </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-20">
                  <DropdownMenuItem
                    className="px-2 py-0.5 text-left text-xs text-red-600 focus:bg-red-50"
                    onClick={() => setSections(sections => sections.filter((_, i) => i !== idx))}
                  >
                    {t.delete}
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          ))}
        </div>
      </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Assigned Interviewers Modal */}
      {showInterviewersModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Content (no overlay) */}
          <div
            className="relative bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md mx-2 transition-opacity duration-300 ease-out opacity-100 scale-100 animate-modalIn border border-gray-200"
            style={{ animation: 'modalIn 0.3s' }}
          >
              <button className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-green-600 rounded-full bg-white" onClick={() => setShowInterviewersModal(false)} aria-label={"Close"}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
            </button>
              <h2 className="text-lg font-bold mb-2">{"Assigned Interviewers"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interviewers.map((user, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <img src={user.img} alt={user.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <span className="font-medium text-xs text-gray-800">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
      </div>
      )}
    </motion.div>
  )
} 