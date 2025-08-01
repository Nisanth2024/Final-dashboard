import { useState } from "react"
import { ChevronRight, ChevronDown, Download, Filter as FilterIcon, Plus, ArrowRight, X } from "lucide-react"
import { InterviewRounds } from "./InterviewRounds"
import { InterviewOverview } from "./InterviewOverview"
import { CandidatesView } from "./CandidatesView"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"
import { NotificationPanel } from "./NotificationPanel"

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
      className="flex-1 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-200 overflow-x-hidden flex flex-col pt-4 pb-9 scroll-pt-16 min-w-0"
    >
      {/* Breadcrumbs and Page Title */}
      
      <div className="w-full px-0 pt-4 pb-0">
        <div className="mb-0 -pl-1 -mt-6 sm:mb-1 md:mb-2 lg:mb-3 flex-shrink-0">
          <div className="flex flex-wrap items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 mb-2">
            <span>{t.candidates}</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Junior FrontEnd Developer</span>
            <span className="sm:hidden">Junior FrontEnd Developer</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-black">{t.round} 3</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-0 md:gap-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{t.round}</h2>
            {/* All Departments, Export, Filter buttons at top right */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto md:flex-wrap md:w-full md:space-x-0 md:gap-y-2 lg:flex-nowrap lg:w-auto lg:space-x-2">
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
        {/* ROUND Panel and Notification Panel - Enhanced Responsive Layout */}
        <div className="flex flex-col w-full gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          {/* Mobile & Tablet: Stacked Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:hidden gap-2 sm:gap-3 md:gap-4">
            <div className="w-full">
          <InterviewRounds onViewCandidates={handleViewCandidates} onViewCandidatesRound2={handleViewCandidatesRound2} language={language} setLanguage={setLanguage} />
            </div>
            <div className="w-full">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </div>
          
          {/* Desktop: Side-by-side Layout with Better Proportions */}
          <div className="hidden lg:grid lg:grid-cols-[2.2fr_1fr] xl:grid-cols-[2.5fr_1fr] 2xl:grid-cols-[3fr_1fr] gap-4 lg:gap-6 xl:gap-8">
            <div className="w-full h-full flex flex-col justify-between">
              <InterviewRounds onViewCandidates={handleViewCandidates} onViewCandidatesRound2={handleViewCandidatesRound2} language={language} setLanguage={setLanguage} />
            </div>
            <div className="w-full h-full flex flex-col justify-start">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </div>
        </div>

        {/* Previous Background Card and Right Side Stack - responsive layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-1 md:gap-2 items-stretch"
        >
          {/* Previous Background Card - full width on iPad, responsive on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="w-full lg:flex-[2] min-w-0 h-full flex flex-col md:mt-0"
          >
            <InterviewOverview language={language} setLanguage={setLanguage} />
          </motion.div>
          {/* Right Side: Two stacked cards, responsive and visible on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="w-full lg:flex-[1] flex flex-col justify-between min-w-0 mt-1 md:mt-2 lg:mt-0 gap-2 md:gap-3"
            style={{ marginLeft: 0 }}
          >
            {/* Top Card - Assigned Interviewers */}
            <div className="mb-1 md:mb-0" style={{ height: undefined }}>
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
              >
                <Card className="rounded-2xl shadow-md mt-2 lg:mt-0 mb-2 sm:mb-4 md:mb-2 p-2 md:p-3 pb-6 flex flex-col justify-start min-h-[100px]">
                  <CardHeader className="pb-2">
                    <div className="flex flex-row items-start justify-between">
                  <div>
                        <CardTitle className="text-base md:text-lg leading-tight">Assigned Interviewers</CardTitle>
                        <CardDescription className="text-gray-500 text-xs md:text-sm mt-0.5">Interview panel for this position</CardDescription>
                  </div>
                      <Button
                        variant="ghost"
                        size="sm"
                    className="ml-auto p-2 rounded-full hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
                        aria-label="View all interviewers"
                    onClick={() => setShowInterviewersModal(true)}
                  >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                      </Button>
                </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap items-center md:mt-[-20px] mt-0 lg:mt-0">
                  <div className="flex -space-x-3">
                        <Avatar className="w-7 h-7 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-7 h-7 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="Ryan King" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-7 h-7 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Miller" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-emerald-700 text-white text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full ml-0 md:ml-2">+5</Badge>
                  </div>
                </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
      {/* Bottom Card - Sections Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col gap-1"
            >
              <Card className="rounded-2xl shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col mt-1 sm:mt-2 md:mt-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t.section || "Section"}</CardTitle>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-black text-white hover:bg-emerald-700 hover:text-white rounded-xl px-2 py-1 text-sm font-medium transition-colors"
              >
                 <span className="hidden sm:inline md:inline">{t.addSection}</span>
                 <span className="inline-flex sm:hidden md:hidden"><Plus className="w-4 h-4" /></span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 max-w-xs">
              <DialogHeader>
                        <DialogTitle>{t.addSection}</DialogTitle>
                          <DialogDescription>Add a new section to the interview.</DialogDescription>
              </DialogHeader>
              <Input
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Section Name"
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
                          >
                            {t.cancel}
                          </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-emerald-700 text-sm rounded px-3 py-2"
                  onClick={handleCreateSection}
                  disabled={!newSection.trim() || creating}
                          >
                            {t.create}
                          </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-0.5">
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
                              aria-label="Section actions"
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
                </CardContent>
      </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Assigned Interviewers Modal */}
      <Dialog open={showInterviewersModal} onOpenChange={setShowInterviewersModal}>
        <DialogContent className="max-w-xs sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assigned Interviewers</DialogTitle>
          </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interviewers.map((user, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user.img} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                  <span className="font-medium text-xs text-gray-800">{user.name}</span>
                </div>
              ))}
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white w-full"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
} 