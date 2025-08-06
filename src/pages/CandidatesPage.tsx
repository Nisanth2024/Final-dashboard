import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AddPersonModal } from "../components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HelpCircle, X, UserPlus, Clock, ArrowLeft, Mail, Phone, Calendar, MapPin, Star, Eye, MessageSquare, Download, Filter as FilterIcon, MoreHorizontal, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Candidate type definition
export type Candidate = {
  id: number
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  rating: number
  appliedDate: string
  experience: string
  skills: string[]
  department: 'Design Department' | 'Engineering Department'
}

// Round 1 candidates (10 candidates)
export const round1Candidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "reviewed",
    rating: 4.5,
    appliedDate: "June 12, 2025",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    department: "Engineering Department"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "shortlisted",
    rating: 4.8,
    appliedDate: "June 13, 2025",
    experience: "7 years",
    skills: ["Vue.js", "Python", "Docker", "MongoDB"],
    department: "Design Department"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    status: "pending",
    rating: 4.2,
    appliedDate: "June 14, 2025",
    experience: "3 years",
    skills: ["Angular", "Java", "Spring Boot", "MySQL"],
    department: "Engineering Department"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    status: "reviewed",
    rating: 4.6,
    appliedDate: "June 15, 2025",
    experience: "6 years",
    skills: ["React Native", "Firebase", "GraphQL", "Redux"],
    department: "Design Department"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Boston, MA",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    status: "shortlisted",
    rating: 4.9,
    appliedDate: "June 16, 2025",
    experience: "4 years",
    skills: ["Figma", "Sketch", "Adobe XD", "UI/UX Design"],
    department: "Design Department"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    status: "rejected",
    rating: 3.8,
    appliedDate: "June 17, 2025",
    experience: "2 years",
    skills: ["JavaScript", "HTML", "CSS", "Bootstrap"],
    department: "Engineering Department"
  },
  {
    id: 7,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    status: "reviewed",
    rating: 4.3,
    appliedDate: "June 18, 2025",
    experience: "5 years",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    department: "Engineering Department"
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    status: "pending",
    rating: 4.1,
    appliedDate: "June 19, 2025",
    experience: "3 years",
    skills: ["Java", "Spring", "Hibernate", "Maven"],
    department: "Engineering Department"
  },
  {
    id: 9,
    name: "Jennifer Brown",
    email: "jennifer.brown@email.com",
    phone: "+1 (555) 901-2345",
    location: "Portland, OR",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    status: "shortlisted",
    rating: 4.7,
    appliedDate: "June 20, 2025",
    experience: "6 years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    department: "Engineering Department"
  },
  {
    id: 10,
    name: "Christopher Davis",
    email: "christopher.davis@email.com",
    phone: "+1 (555) 012-3456",
    location: "Atlanta, GA",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    status: "reviewed",
    rating: 4.4,
    appliedDate: "June 21, 2025",
    experience: "4 years",
    skills: ["Vue.js", "Nuxt.js", "Vuetify", "Firebase"],
    department: "Engineering Department"
  }
];

// Round 2 candidates (5 candidates)
export const round2Candidates: Candidate[] = [
  {
    id: 11,
    name: "Amanda White",
    email: "amanda.white@email.com",
    phone: "+1 (555) 111-2222",
    location: "San Diego, CA",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    status: "shortlisted",
    rating: 4.8,
    appliedDate: "June 22, 2025",
    experience: "7 years",
    skills: ["React", "Redux", "Node.js", "MongoDB"],
    department: "Engineering Department"
  },
  {
    id: 12,
    name: "Daniel Martinez",
    email: "daniel.martinez@email.com",
    phone: "+1 (555) 222-3333",
    location: "Phoenix, AZ",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    status: "reviewed",
    rating: 4.6,
    appliedDate: "June 23, 2025",
    experience: "5 years",
    skills: ["Angular", "RxJS", "NgRx", "TypeScript"],
    department: "Engineering Department"
  },
  {
    id: 13,
    name: "Sophia Anderson",
    email: "sophia.anderson@email.com",
    phone: "+1 (555) 333-4444",
    location: "Dallas, TX",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    status: "pending",
    rating: 4.3,
    appliedDate: "June 24, 2025",
    experience: "4 years",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    department: "Design Department"
  },
  {
    id: 14,
    name: "Matthew Johnson",
    email: "matthew.johnson@email.com",
    phone: "+1 (555) 444-5555",
    location: "Las Vegas, NV",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    status: "shortlisted",
    rating: 4.9,
    appliedDate: "June 25, 2025",
    experience: "6 years",
    skills: ["Python", "Flask", "SQLAlchemy", "Docker"],
    department: "Engineering Department"
  },
  {
    id: 15,
    name: "Olivia Wilson",
    email: "olivia.wilson@email.com",
    phone: "+1 (555) 555-6666",
    location: "Nashville, TN",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    status: "reviewed",
    rating: 4.5,
    appliedDate: "June 26, 2025",
    experience: "3 years",
    skills: ["Sketch", "InVision", "Principle", "Design Systems"],
    department: "Design Department"
  }
];

// All candidates combined
export const allCandidates: Candidate[] = [...round1Candidates, ...round2Candidates];

export default function CandidatesPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
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

  // Helper functions from CandidatesView
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shortlisted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'reviewed':
        return 'Reviewed'
      case 'shortlisted':
        return 'Shortlisted'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  // State for modals from CandidatesView
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null)
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null);
  const [commentsCandidate, setCommentsCandidate] = useState<Candidate | null>(null);
  const [commentsMap, setCommentsMap] = useState<{ [id: number]: string[] }>({});
  const [newComment, setNewComment] = useState("");

  // Filter candidates based on department
  const filteredCandidates = departmentFilter === 'All' 
    ? candidates 
    : candidates.filter(c => c.department === departmentFilter)

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
                key="candidates"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="bg-gray-200 p-2 sm:p-4 md:p-6 rounded-lg min-h-screen flex flex-col">
                  <CardContent className="p-0">
                    <Flex direction="col" className="w-full min-w-0 flex-1">
                      <Flex align="center" justify="between" className="w-full gap-2 mb-4">
                        <Flex align="center" gap={2}>
                          <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-emerald-700" onClick={handleBackToDashboard} aria-label="Back">
                            <ArrowLeft className="w-5 h-5" />
                          </Button>
                          <Typography variant="h1" size="lg" weight="bold" className="text-base sm:text-lg md:text-xl">
                            All Candidates
                          </Typography>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* Stats */}
                    <Grid cols={4} gap={2} className="grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                      <Card className="rounded-lg">
                        <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
                          <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-blue-600">
                            {filteredCandidates.length}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
                            Total Candidates
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card className="rounded-lg">
                        <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
                          <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-yellow-600">
                            {filteredCandidates.filter(c => c.status === 'pending').length}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
                            Pending Review
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card className="rounded-lg">
                        <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
                          <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-emerald-700">
                            {filteredCandidates.filter(c => c.status === 'shortlisted').length}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
                            Shortlisted
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card className="rounded-lg">
                        <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
                          <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-red-600">
                            {filteredCandidates.filter(c => c.status === 'rejected').length}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
                            Rejected
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Candidates List */}
                    <Stack spacing={3} className="flex flex-col gap-3 w-full">
                      {(filteredCandidates && filteredCandidates.length === 0) ? (
                        <Typography variant="p" size="lg" color="muted" align="center" className="text-center text-gray-500 text-lg py-12">
                          No candidates found
                        </Typography>
                      ) : (
                        filteredCandidates.map(candidate => (
                          <Card key={candidate.id} className="bg-white rounded-md shadow p-3 sm:p-4 md:p-5 text-sm">
                            <CardContent className="p-1.5 md:p-2">
                              <Flex align="start" justify="between" wrap="wrap">
                                <Flex align="start" gap={3}>
                                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback className="text-xs md:text-sm">
                                      {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <Stack spacing={1} className="flex-1 space-y-0.5">
                                    <Flex align="center" gap={2}>
                                      <Typography variant="h3" size="lg" weight="semibold" className="text-base md:text-lg font-semibold">
                                        {candidate.name}
                                      </Typography>
                                      <Badge className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(candidate.status)}`}>
                                        {getStatusText(candidate.status)}
                                      </Badge>
                                    </Flex>
                                    <Stack spacing={1}>
                                      <Flex align="center" gap={2}>
                                        <Mail className="w-3 h-3 text-gray-400" />
                                        <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-600">{candidate.email}</Typography>
                                      </Flex>
                                      <Flex align="center" gap={2}>
                                        <Phone className="w-3 h-3 text-gray-400" />
                                        <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-600">{candidate.phone}</Typography>
                                      </Flex>
                                      <Flex align="center" gap={2}>
                                        <MapPin className="w-3 h-3 text-gray-400" />
                                        <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-600">{candidate.location}</Typography>
                                      </Flex>
                                    </Stack>
                                    <Flex align="center" gap={2}>
                                      <Star className="w-3 h-3 text-yellow-500" />
                                      <Typography variant="span" size="xs" className="text-xs font-medium">{candidate.rating}</Typography>
                                      <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-500">•</Typography>
                                      <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-500">{candidate.experience}</Typography>
                                    </Flex>
                                  </Stack>
                                </Flex>
                                <Flex gap={1}>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-xs p-1 hover:bg-emerald-700" 
                                    onClick={() => setPreviewCandidate(candidate)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-xs p-1 hover:bg-emerald-700" 
                                    onClick={() => setCommentsCandidate(candidate)}
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" variant="ghost" className="text-xs p-1 hover:bg-emerald-700">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setPreviewCandidate(candidate)}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        <Typography variant="span" size="sm">View Details</Typography>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => setCommentsCandidate(candidate)}>
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        <Typography variant="span" size="sm">Add Comments</Typography>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => setDeleteDialogOpen(candidate.id)}>
                                        <Typography variant="span" size="sm" className="text-red-600">Delete</Typography>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </Flex>
                              </Flex>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
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
              <Button 
                onClick={handleSeeAllNotifications}
                className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </Button>
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
      {/* Desktop Notification Dropdown/Modal */}
      {isNotificationOpen && (
        <div className="hidden md:block fixed top-20 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl border animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
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
              <Button 
                onClick={handleSeeAllNotifications}
                className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </Button>
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
      )}
      {/* AddPersonModal for notification redirect */}
      <AddPersonModal 
        open={addPersonModalOpen}
        onOpenChange={setAddPersonModalOpen}
        onAddPerson={handleAddPerson}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this candidate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
              <Typography variant="span" size="sm">Cancel</Typography>
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (deleteDialogOpen !== null) {
                  handleDeleteCandidate(deleteDialogOpen);
                  setDeleteDialogOpen(null);
                }
              }}
            >
              <Typography variant="span" size="sm">Delete</Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={previewCandidate !== null} onOpenChange={() => setPreviewCandidate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
          </DialogHeader>
          {previewCandidate && (
            <Stack spacing={4}>
              <Flex align="start" gap={4}>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={previewCandidate.avatar} />
                  <AvatarFallback className="text-lg">
                    {previewCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Stack spacing={2} className="flex-1">
                  <Typography variant="h3" size="lg" weight="bold">{previewCandidate.name}</Typography>
                  <Badge className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(previewCandidate.status)}`}>
                    {getStatusText(previewCandidate.status)}
                  </Badge>
                  <Typography variant="p" size="sm" color="muted">{previewCandidate.email}</Typography>
                  <Typography variant="p" size="sm" color="muted">{previewCandidate.phone}</Typography>
                  <Typography variant="p" size="sm" color="muted">{previewCandidate.location}</Typography>
                </Stack>
              </Flex>
              
              <Grid cols={2} gap={4}>
                <Stack spacing={2}>
                  <Typography variant="h4" size="sm" weight="semibold" className="font-semibold mb-2">
                    Application Details
                  </Typography>
                  <Stack spacing={2}>
                    <Flex align="center" gap={2}>
                      <Calendar className="w-4 h-4" />
                      <Typography variant="span" size="sm">Applied: {previewCandidate.appliedDate}</Typography>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Typography variant="span" size="sm">Rating: {previewCandidate.rating}</Typography>
                    </Flex>
                    <Typography variant="span" size="sm">
                      Experience: {previewCandidate.experience}
                    </Typography>
                  </Stack>
                </Stack>
                
                <Stack spacing={2}>
                  <Typography variant="h4" size="sm" weight="semibold" className="font-semibold mb-2">
                    Skills
                  </Typography>
                  <Flex align="center" gap={1} wrap="wrap">
                    {previewCandidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Typography variant="span" size="xs">{skill}</Typography>
                      </Badge>
                    ))}
                  </Flex>
                </Stack>
              </Grid>
            </Stack>
          )}
          <DialogFooter>
            <Button onClick={() => setPreviewCandidate(null)}>
              <Typography variant="span" size="sm">Close</Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Comments Modal */}
      <Dialog open={commentsCandidate !== null} onOpenChange={() => setCommentsCandidate(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>Add notes about this candidate.</DialogDescription>
          </DialogHeader>
          {commentsCandidate && (
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Label htmlFor="new-comment">Add Comment</Label>
                <Input
                  id="new-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment..."
                />
              </Stack>
              
              <Button 
                onClick={() => {
                  if (newComment.trim() && commentsCandidate) {
                    const candidateId = commentsCandidate.id;
                    setCommentsMap(prev => ({
                      ...prev,
                      [candidateId]: [...(prev[candidateId] || []), newComment]
                    }));
                    setNewComment("");
                  }
                }}
                disabled={!newComment.trim()}
                className="w-full"
              >
                <Typography variant="span" size="sm">Add Comment</Typography>
              </Button>
              
              <ScrollArea className="max-h-40">
                <Stack spacing={2}>
                  {(commentsMap[commentsCandidate.id] || []).map((comment, index) => (
                    <Card key={index} className="p-2">
                      <Typography variant="p" size="sm">{comment}</Typography>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          )}
          <DialogFooter>
            <Button onClick={() => setCommentsCandidate(null)}>
              <Typography variant="span" size="sm">Close</Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          <div className="max-h-40 overflow-y-auto space-y-2">
            {notes.length === 0 ? (
              <div className="text-gray-400 text-xs text-center">No notes yet.</div>
            ) : (
              notes.map((note, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-2 text-xs flex justify-between items-center">
                  <span>{note}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 ml-2 text-xs p-0 h-auto" 
                    onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-emerald-700">
                Close
              </Button>
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
              <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-emerald-700">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
