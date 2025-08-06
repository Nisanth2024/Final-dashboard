import { useState } from "react"
import { ChevronRight, ChevronDown, Download, Filter as FilterIcon, Plus, ArrowRight, X } from "lucide-react"


import { CandidatesView } from "./CandidatesView"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { Grid } from "./ui/grid"
import { Flex } from "./ui/flex"
import { Stack } from "./ui/stack"
import { Typography } from "./ui/typography"
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

export function MainContent({ language, setLanguage, departments, Round1Card, Round2Card, NotificationPanel }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void, departments: { name: string, color: string }[], setDepartments: (depts: { name: string, color: string }[]) => void, Round1Card: React.ComponentType<{ onViewCandidates: () => void }>, Round2Card: React.ComponentType<{ onViewCandidatesRound2: () => void }>, NotificationPanel: React.ComponentType<{ language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }> }) {
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


      {/* Main Content Area - Responsive Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex-1 flex flex-col gap-4 sm:gap-4 md:gap-2 mb-10"
      >
        {/* ROUND Panel and Notification Panel - Enhanced Responsive Layout */}
        <Stack spacing={4} className="flex flex-col w-full gap-4 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8">
          {/* Mobile & Tablet: Stacked Layout */}
          <Grid cols={1} gap={4} className="grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:hidden gap-4 sm:gap-4 md:gap-4">
        <div className="w-full">
          <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
            <Round1Card onViewCandidates={handleViewCandidates} />
            <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
          </Grid>
        </div>
            <div className="w-full">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </Grid>
          
          {/* Nest Hub & iPad Pro: Special Stacked Layout */}
          <Grid cols={2} gap={6} className="hidden lg:grid lg:grid-cols-1 xl:hidden 2xl:grid-cols-[2.2fr_1fr] gap-4 lg:gap-6 xl:gap-8">
            <div className="w-full h-full flex flex-col justify-between">
              <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                <Round1Card onViewCandidates={handleViewCandidates} />
                <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
              </Grid>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-start">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </Grid>

          {/* Nest Hub Max: Special Layout - Swapped Positions */}
          <Grid cols={2} gap={0} className="hidden xl:grid xl:grid-cols-[2.3fr_1.1fr] 2xl:hidden gap-0 lg:gap-0 xl:gap-0">
           
            {/* Right Side: Interview Rounds (moved from left) */}
            <div className="w-full h-full flex flex-col justify-between items-start">
              <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                <Round1Card onViewCandidates={handleViewCandidates} />
                <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
              </Grid>
            </div>
             {/* Left Side: Notification Panel (moved from right) */}
             <div className="w-full h-full flex flex-col justify-start items-start">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </Grid>
          
          {/* Desktop (2XL): Swapped Layout - Notification Panel on Left, Rounds on Right */}
          <Grid cols={2} gap={4} className="hidden 2xl:grid 2xl:grid-cols-[1.8fr_1.4fr] gap-4 lg:gap-0 md:gap-0 xl:gap-2">
           
            
            {/* Right Side: Interview Rounds */}
            <div className="w-full h-full flex flex-col justify-between">
              <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                <Round1Card onViewCandidates={handleViewCandidates} />
                <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
              </Grid>
            </div>

             {/* Left Side: Notification Panel */}
             <div className="w-full h-full flex flex-col justify-start">
              <NotificationPanel language={language} setLanguage={setLanguage} />
            </div>
          </Grid>
        </Stack>

        {/* Previous Background Card and Right Side Stack - responsive layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-1 md:gap-2 items-start"
        >
          {/* Mobile & Tablet: Reordered Layout */}
          <Stack spacing={4} className="lg:hidden w-full flex flex-col gap-4 sm:gap-4 md:gap-4">
            {/* Assigned Interviewers Card - First on mobile/tablet */}
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
              <Card className="rounded-2xl shadow-md p-2 md:p-3 pb-6 flex flex-col justify-start min-h-[100px]">
                <CardHeader className="pb-2">
                  <Flex align="start" justify="between">
                    <Stack spacing={1}>
                      <Typography variant="h3" size="lg" weight="semibold" className="text-base md:text-lg leading-tight">Assigned Interviewers</Typography>
                      <Typography variant="p" size="xs" color="muted" className="text-gray-500 text-xs md:text-sm mt-0.5">Interview panel for this position</Typography>
                    </Stack>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto p-2 rounded-full hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
                      aria-label="View all interviewers"
                      onClick={() => setShowInterviewersModal(true)}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-700" />
                    </Button>
                  </Flex>
                </CardHeader>
                <CardContent className="pt-0">
                  <Flex align="center" className="flex flex-wrap items-center md:mt-[-20px] mt-0 lg:mt-0">
                    <Flex align="center" className="-space-x-3">
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
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>
            </motion.div>


          </Stack>


          {/* Right Side: Two stacked cards, responsive and visible on all screens - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="hidden lg:flex w-full lg:flex-[1] flex flex-col justify-start min-w-0 mt-1 md:mt-2 lg:mt-8 xl:mt-10 gap-1 md:gap-2 2xl:flex-[1]"
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
                <Card className="rounded-2xl shadow-md mt-0 lg:mt-0 mb-1 sm:mb-2 md:mb-1 p-1 md:p-2 pb-3 flex flex-col justify-start min-h-[80px]">
                  <CardHeader className="pb-0">
                    <Flex align="start" justify="between">
                      <Stack spacing={1}>
                        <Typography variant="h3" size="lg" weight="semibold" className="text-base md:text-lg leading-tight">Assigned Interviewers</Typography>
                        <Typography variant="p" size="xs" color="muted" className="text-gray-500 text-xs md:text-sm mt-0">Interview panel for this position</Typography>
                      </Stack>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto p-1 rounded-full hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
                        aria-label="View all interviewers"
                        onClick={() => setShowInterviewersModal(true)}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-700" />
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Flex align="center" className="flex flex-wrap items-center md:mt-[-15px] mt-0 lg:mt-0">
                      <div className="flex -space-x-2">
                        <Avatar className="w-6 h-6 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="Ryan King" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Miller" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-emerald-700 text-white text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ml-0 md:ml-1">+5</Badge>
                    </div>
                    </Flex>
                </CardContent>
              </Card>
            </motion.div>
          </div>

      {/* Bottom Card - Sections Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col gap-0"
            >
              <Card className="rounded-2xl shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col mt-0 sm:mt-0 md:mt-0">
                <CardHeader className="pb-0">
                  <Flex align="center" justify="between">
                    <Typography variant="h3" size="lg" weight="semibold" className="text-lg">{t.section || "Section"}</Typography>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-black text-white hover:bg-emerald-700 hover:text-white rounded-xl px-2 py-1 text-sm font-medium transition-colors"
                        >
                          <Typography variant="span" size="sm" className="hidden sm:inline md:inline text-white">{t.addSection}</Typography>
                          <span className="inline-flex sm:hidden md:hidden text-white"><Plus className="w-4 h-4" /></span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-6 max-w-sm">
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
                            className="flex-1 bg-gray-100 hover:bg-emerald-700 text-sm rounded px-3 py-2"
                            onClick={() => setAddDialogOpen(false)}
                            disabled={creating}
                          >
                            <Typography variant="span" size="sm">{t.cancel}</Typography>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-black text-white hover:bg-emerald-700 text-sm rounded px-3 py-2 font-medium"
                            onClick={handleCreateSection}
                            disabled={!newSection.trim() || creating}
                          >
                            <Typography variant="span" size="sm" className="text-white">{t.create}</Typography>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </Flex>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <Stack spacing={1} className="flex flex-col gap-0.5">
                    {sections.map((section, idx) => (
                      <Flex key={idx} align="center" justify="between" className="bg-white rounded-xl border px-3 py-2">
                        <Stack spacing={1}>
                          <Typography variant="p" size="xs" weight="medium" className="font-medium text-xs">{section.name}</Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-gray-400 text-xs">{section.details}</Typography>
                        </Stack>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-lg text-gray-400 cursor-pointer hover:bg-emerald-700 hover:text-white"
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
                              <Typography variant="span" size="xs">{t.delete}</Typography>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Flex>
                    ))}
                  </Stack>
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
          <Grid cols={2} gap={2} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interviewers.map((user, idx) => (
              <Flex key={idx} align="center" gap={2} className="flex items-center space-x-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user.img} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Typography variant="span" size="sm" weight="medium" className="font-medium text-xs text-gray-800">{user.name}</Typography>
              </Flex>
              ))}
          </Grid>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white w-full"
              >
                <Typography variant="span" size="sm" className="text-white">Close</Typography>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
} 