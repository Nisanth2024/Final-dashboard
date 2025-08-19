import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import { AddPersonModal } from "../components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, X, UserPlus, Clock, Eye, ArrowRight, Users, Bell, FileText, ChevronRight, ChevronDown, Download, Filter as FilterIcon, Plus, MoreHorizontal, Edit, Trash2, Save, ChevronUp, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCandidates, type Candidate } from "./CandidatesPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { Typography } from "@/components/ui/typography";
import { Stack } from "@/components/ui/stack";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@/components/ui/dialog";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [, setDepartmentFilter] = useState<'All' | 'Design Department' | 'Engineering Department'>('All')
  const [candidates, setCandidates] = useState<Candidate[]>(allCandidates)
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterDept, setFilterDept] = useState<string>('All');
  // Departments state for MainContent
  const [departments] = useState([
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
  const handleExport = () => {
    // Export logic can be implemented here or passed down
    // For now, just a placeholder
    if (window && window.alert) window.alert('Export triggered!');
  };

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

  // Interview Rounds handlers
  const handleViewCandidates = () => {
    navigate('/candidates?round=1');
  }

  const handleViewCandidatesRound2 = () => {
    navigate('/candidates?round=2');
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
      
      // Navigate to candidates view to show the new candidate
      navigate('/candidates');
      
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
  // Highlights card detail dialog state
  const [highlightOpen, setHighlightOpen] = useState(false);
  const [highlightTitle, setHighlightTitle] = useState<string>("");
  const [highlightDetail, setHighlightDetail] = useState<string>("");
  const handleHighlightClick = (title: string, detail: string) => {
    setHighlightTitle(title);
    setHighlightDetail(detail);
    setHighlightOpen(true);
  };

  // State for breadcrumbs and top right components (moved from MainContent)
  const [department] = useState<'All' | 'Design Department' | 'Engineering Department'>('All');

  // State for InterviewOverview components (moved from InterviewOverview)
  const defaultQuestions = [
    {
      prompt: "How Do JavaScript And jQuery Vary?",
      competency: "Team Building",
      time: "10 Min",
      level: "Pending",
      editing: false,
      deleted: false,
      answer: '',
      answering: false,
    },
  ];
  const [questions, setQuestions] = useState(defaultQuestions);
  const [] = useState(true);
  const editingBlockRef = useRef<HTMLDivElement | null>(null);
  const editPromptInputRef = useRef<HTMLInputElement | null>(null);
  const createPromptInputRef = useRef<HTMLInputElement | null>(null);
  const [createPromptOpen, setCreatePromptOpen] = useState(false);
  // Handler to open create prompt and focus input
  const handleOpenCreatePrompt = () => {
    setCreatePromptOpen(true);
    setTimeout(() => {
      createPromptInputRef.current?.focus();
    }, 100);
  };
  const [newPrompt, setNewPrompt] = useState("");
  const [newCompetency, setNewCompetency] = useState("Team Building");
  const [newTime, setNewTime] = useState("10");
  const [newLevel, setNewLevel] = useState("Pending");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");

  // Predefined templates for Insert From Library
  const predefinedTemplates = [
    {
      id: "js-basics",
      title: "JavaScript Basics",
      category: "Technical",
      questions: [
        {
          prompt: "Explain the difference between var, let, and const in JavaScript",
          competency: "JavaScript Fundamentals",
          time: "10",
          level: "Intermediate"
        },
        {
          prompt: "What is closure in JavaScript and how is it used?",
          competency: "JavaScript Concepts",
          time: "15",
          level: "Advanced"
        },
        {
          prompt: "Explain event bubbling and event delegation",
          competency: "DOM Manipulation",
          time: "10",
          level: "Intermediate"
        }
      ]
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      category: "General",
      questions: [
        {
          prompt: "Describe a challenging problem you solved in your previous role",
          competency: "Problem Solving",
          time: "15",
          level: "Advanced"
        },
        {
          prompt: "How do you approach debugging a complex issue?",
          competency: "Technical Skills",
          time: "10",
          level: "Intermediate"
        }
      ]
    },
    {
      id: "system-design",
      title: "System Design",
      category: "Technical",
      questions: [
        {
          prompt: "Design a scalable chat application",
          competency: "System Architecture",
          time: "20",
          level: "Advanced"
        },
        {
          prompt: "How would you design a URL shortening service?",
          competency: "System Design",
          time: "15",
          level: "Advanced"
        }
      ]
    }
  ];
  const [] = useState({
    prompt: '',
    competency: 'Team Building',
    time: '10 Min',
    level: 'Pending',
  });

  // Predefined question bank

  // State for Assigned Interviewers and Section Panel (moved from MainContent)
  const [showInterviewersModal, setShowInterviewersModal] = useState(false);
  const [sections, setSections] = useState([
    { name: "Introduction", details: "5m • 7 Questions" },
    { name: "Portfolio Review", details: "4m • 4 Questions" },
    { name: "Background Check", details: "6m • 5 Questions" },
    { name: "Skill Assessment", details: "30m • 7 Questions" },
  ]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [creating, setCreating] = useState(false);

  // Interviewers data
  const interviewers = [
    { name: "John Doe", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Ryan King", img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Sarah Miller", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Priya Patel", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Alex Lee", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Maria Garcia", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "David Kim", img: "https://randomuser.me/api/portraits/men/23.jpg" },
    { name: "Emily Chen", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];

  // Handlers for Section Panel
  const handleCreateSection = () => {
    if (newSection.trim()) {
      setCreating(true);
      setSections(prev => [...prev, { name: newSection.trim(), details: "New Section" }]);
      setAddDialogOpen(false);
      setNewSection("");
      setCreating(false);
    }
  };

  // Interview Rounds Components
  const Round1Card = ({ onViewCandidates }: { onViewCandidates: () => void }) => (
  <Card className="w-full min-h-[140px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] 2xl:min-h-[120px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden flex flex-col">
      <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pt-0 flex-shrink-0">
        <Flex align="center" gap={1} wrap="wrap" className="mb-[-20px] 2xl:mb-[-10px]">
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 2xl:text-[8px] 2xl:px-0.5 border border-black">
            <Typography variant="span" size="xs">Aug 10 - Aug 20</Typography>
          </Badge>
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1 2xl:text-[8px] 2xl:px-0.5 border border-black">
            <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 2xl:w-2 2xl:h-2" />
            <Typography variant="span" size="xs">10 Candidates</Typography>
          </Badge>
          <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-green-700 bg-green-100 2xl:text-[8px] 2xl:px-0.5 border border-black">
            Completed
          </Badge>
        </Flex>
      </CardHeader>
      
      <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0">
        <Typography 
          variant="h3" 
          size="2xl" 
          weight="medium" 
          className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-lg leading-tight mb-0"
        >
          Round 1
        </Typography>
        <Typography 
          variant="p" 
          size="xs" 
          color="muted" 
          className="text-xs sm:text-sm text-muted-foreground 2xl:text-[10px]"
        >
          Initial Review
        </Typography>
      </CardContent>
      
      <CardFooter className="px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0 pt-0 mt-auto">
        <Flex align="center" justify="between" className="w-full">
          <Flex align="center" className="-space-x-1 sm:-space-x-2 md:-space-x-3 lg:-space-x-3 xl:-space-x-4 2xl:-space-x-2">
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">JD</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">RK</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">SM</AvatarFallback>
            </Avatar>
            <Badge className="bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px] font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 flex items-center justify-center rounded-full border-2 border-white">
              +5
            </Badge>
          </Flex>
          <Button
            size="sm"
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-black text-white hover:bg-emerald-700 hover:text-white font-medium mr-2 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5"
            onClick={onViewCandidates}
          >
            <Typography variant="span" size="xs" className="truncate text-white">
              View Candidates
            </Typography>
            <ArrowRight className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-3 2xl:h-3 flex-shrink-0 text-white" />
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );

  const Round2Card = ({ onViewCandidatesRound2 }: { onViewCandidatesRound2: () => void }) => (
  <Card className="w-full min-h-[140px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] 2xl:min-h-[120px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden flex flex-col">
      <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pt-0 flex-shrink-0">
        <Flex align="center" gap={1} wrap="wrap" className="mb-[-20px] 2xl:mb-[-10px]">
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 2xl:text-[8px] 2xl:px-0.5 border border-black">
            <Typography variant="span" size="xs">Aug 10 - Aug 20</Typography>
          </Badge>
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1 2xl:text-[8px] 2xl:px-0.5 border border-black">
            <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 2xl:w-2 2xl:h-2" />
            <Typography variant="span" size="xs">10 Candidates</Typography>
          </Badge>
          <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-orange-700 bg-orange-100 2xl:text-[8px] 2xl:px-0.5 border border-black">
            In Progress
          </Badge>
        </Flex>
      </CardHeader>
      
      <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0">
        <Typography 
          variant="h3" 
          size="2xl" 
          weight="medium" 
          
          className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-lg leading-tight mb-0"
        >
          Round 2
        </Typography>
        <Typography 
          variant="p" 
          size="xs" 
          color="muted" 
       
          className="text-xs sm:text-sm text-muted-foreground 2xl:text-[10px]"
        >
          Initial Review
        </Typography>
      </CardContent>
      
      <CardFooter className="px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0 pt-0 mt-auto">
        <Flex align="center" justify="between" className="w-full">
          <Flex align="center" className="-space-x-1 sm:-space-x-2 md:-space-x-3 lg:-space-x-3 xl:-space-x-4 2xl:-space-x-2">
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">JD</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">RK</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px]">SM</AvatarFallback>
            </Avatar>
            <Badge className="bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm 2xl:text-[8px] font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-5 2xl:h-5 flex items-center justify-center rounded-full border-2 border-white">
              +3
            </Badge>
          </Flex>
          <Button
            size="sm"
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-black text-white hover:bg-emerald-700 hover:text-white font-medium mr-2 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5"
            onClick={onViewCandidatesRound2}
          >
            <Typography variant="span" size="xs" className="truncate text-white">
              View Candidates
            </Typography>
            <ArrowRight className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-3 2xl:h-3 flex-shrink-0 text-white" />
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );

  // NotificationPanel Component

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
            } else if (type === 'prompt') {
              handleOpenCreatePrompt();
            }
          }}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
      {/* Fixed Sidebar */}
  <div className="fixed top-[64px] left-4 h-[calc(100vh-64px)] w-64 z-40 hidden md:flex flex-col">
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
                key="main"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Breadcrumbs and Page Title */}
                <div className="w-full px-0 pt-4 pb-0">
                  <div className="mb-0 -pl-1 -mt-1 sm:mb-1 md:mb-2 lg:mb-3 flex-shrink-0">
                    <Flex align="center" gap={2} className="flex-wrap items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 mb-2">
                      <Typography variant="span" size="xs" color="muted">Candidates</Typography>
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      <Typography variant="span" size="xs" color="muted" className="hidden sm:inline">Junior FrontEnd Developer</Typography>
                      <Typography variant="span" size="xs" color="muted" className="sm:hidden">Junior FrontEnd Developer</Typography>
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      <Typography variant="span" size="xs" weight="medium" className="text-black">Round 3</Typography>
                    </Flex>
                    <Flex align="center" justify="between" className="flex-col md:flex-row md:items-center md:justify-between w-full gap-0 md:gap-2 lg:flex-nowrap lg:w-auto lg:space-x-2">
                      {/* Move Round title to the left on small screens */}
                      <Typography
                        variant="h2"
                        size="lg"
                        weight="bold"
                        className="text-lg md:text-xl lg:text-2xl w-full md:w-auto text-left md:text-center mb-2 md:mb-0"
                      >
                        Round
                      </Typography>
                      {/* All Departments, Export, Filter buttons at top right */}
                      <Flex
                        align="center"
                        gap={3}
                        className="flex-col sm:flex-row gap-3 w-full sm:w-auto md:ml-auto md:w-auto md:justify-end md:flex-row md:gap-3 lg:flex-nowrap lg:w-auto lg:space-x-2"
                      >
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="items-center space-x-1 text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white hidden sm:flex"
                            onClick={handleDropdown}
                          >
                            <Typography variant="span" size="xs">{department === 'All' ? 'All Departments' : department}</Typography>
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                          {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50 ">
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'All' ? 'font-semibold' : ''}`}
                                onClick={() => handleSelect('All')}
                              >
                                <Typography variant="span" size="sm">All Departments</Typography>
                              </Button>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'Design Department' ? 'font-semibold' : ''}`}
                                onClick={() => handleSelect('Design Department')}
                              >
                                <Typography variant="span" size="sm">Design Department</Typography>
                              </Button>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-4 py-2 hover:bg-emerald-700 hover:text-white ${department === 'Engineering Department' ? 'font-semibold' : ''}`}
                                onClick={() => handleSelect('Engineering Department')}
                              >
                                <Typography variant="span" size="sm">Engineering Department</Typography>
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="hidden md:flex text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white" onClick={handleExport}>
                          <Download className="w-3 h-3 mr-0" />
                          <Typography variant="span" size="xs">Export</Typography>
                        </Button>
                        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs px-2 py-1 min-w-[90px] hover:bg-emerald-700 hover:text-white hidden sm:flex" onClick={() => setFilterOpen(true)}>
                              <FilterIcon className="w-3 h-3 mr-0" />
                              <Typography variant="span" size="xs">Filter</Typography>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Filter Candidates</DialogTitle>
                            </DialogHeader>
                            <Stack spacing={2}>
                              <Stack spacing={1}>
                                <Label className="font-semibold text-xs mb-1">Status</Label>
                                <Flex align="center" gap={2} wrap="wrap">
                                  {['pending', 'reviewed', 'shortlisted', 'rejected'].map(status => (
                                    <Label key={status} className="flex items-center gap-1 text-xs">
                                      <Checkbox
                                        checked={filterStatus.includes(status)}
                                        onCheckedChange={checked => {
                                          setFilterStatus(s => checked ? [...s, status] : s.filter(st => st !== status));
                                        }}
                                      />
                                      <Typography variant="span" size="xs">{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
                                    </Label>
                                  ))}
                                </Flex>
                              </Stack>
                              <Stack spacing={1}>
                                <Label className="font-semibold text-xs mb-1">Department</Label>
                                <Select value={filterDept} onValueChange={setFilterDept}>
                                  <SelectTrigger className="border rounded px-2 py-1 text-xs">
                                    <SelectValue placeholder="Select Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                  {(departments || []).map((dept, idx) => (
                                      <SelectItem key={dept.name + idx} value={dept.name}>{dept.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Stack>
                            </Stack>
                            <DialogFooter>
                              <Button onClick={() => setFilterOpen(false)} className="bg-black hover:bg-emerald-700 text-white">
                                <Typography variant="span" size="sm" className="text-white">Apply</Typography>
                              </Button>
                              <DialogClose asChild>
                                <Button variant="ghost" className="hover:bg-emerald-700">
                                  <Typography variant="span" size="sm">Cancel</Typography>
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </Flex>
                    </Flex>
                  </div>
                </div>

                {/* Main Content Area - Responsive Layout */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-4 md:gap-2 mb-0"
                >
                  {/* Left Side: Main Content (Round Cards and Interview Overview) */}
                  <div className="flex-1 flex flex-col gap-4 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8 lg:min-w-0">
                    {/* ROUND Panel - Enhanced Responsive Layout */}
                    <Stack spacing={4} className="flex flex-col w-full gap-4 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8">
                      {/* Mobile & Tablet: Stacked Layout */}
                      <Grid cols={1} gap={4} className="grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:hidden gap-4 sm:gap-4 md:gap-4 w-full">
                        <Grid cols={1} gap={4} className="w-full animate-in fade-in slide-in-from-bottom-4">
                          <div className="w-full">
                            <Round1Card onViewCandidates={handleViewCandidates} />
                          </div>
                          <div className="w-full">
                            <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
                          </div>
                        </Grid>
                      </Grid>
                      
                      {/* Desktop: Side-by-side Layout with Optimized Card Sizes */}
                      <div className="hidden lg:flex lg:flex-row lg:gap-4 xl:gap-6 2xl:gap-6 lg:w-full pr-3 xl:pr-4">
                        <div className="w-[50%]">
                          <Round1Card onViewCandidates={handleViewCandidates} />
                        </div>
                        <div className="w-[50%]">
                          <Round2Card onViewCandidatesRound2={handleViewCandidatesRound2} />
                        </div>
                      </div>
                    </Stack>

                    {/* Interview Overview header and buttons placed above the Interview Overview section on large screens only */}
            <div className="hidden lg:flex w-full items-center justify-between mt-0 mb-2 px-2">
                      <Typography variant="h2" size="lg" weight="bold" className="text-left text-2xl lg:text-3xl">
                        Interview Overview
                      </Typography>
                      <Flex align="center" gap={2}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white"
                          onClick={() => {
                            setQuestions(prev => [
                              ...prev,
                              {
                                prompt: 'New Question',
                                competency: 'Team Building',
                                time: '10 Min',
                                level: 'Pending',
                                editing: true,
                                deleted: false,
                                answer: '',
                                answering: false,
                              },
                            ]);
                            editingBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                        >
                          <Plus className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white">
                              <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-600" onClick={() => setQuestions([])}>
                              <Typography variant="span" size="sm">Delete All Questions</Typography>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Flex>
                    </div>
                  </div>

                  {/* Right Side: Reserved Space (Notification panel removed) */}
                  <div className="hidden lg:block w-72 xl:w-80 2xl:w-[355px] border-l border-gray-200 pl-1 xl:pl-1 2xl:pl-2">
                    <motion.div
                      initial={{ opacity: 0, y: 32, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        transition: { duration: 0.2, ease: 'easeOut' }
                      }}
                    >
                      <Card className="rounded-2xl shadow-md w-full min-h-[20px] h-auto pb-3">
                        <CardContent className="px-1 pt-0 pb-1">
                          <Stack spacing={2}>
                          {/* Item 1: PRO mode activated */}
                          <Button
                            variant="ghost"
                            className="w-full justify-start pl-1 pr-2 sm:pl-2 py-2 h-14 border rounded-xl hover:bg-gray-50 text-left"
                            onClick={() => handleHighlightClick('PRO mode activated', 'All premium features are now available for your account')}
                          >
                            <Flex align="center" className="w-full gap-3 sm:gap-4 items-center overflow-hidden">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Eye className="w-5 h-5 text-gray-700" />
                  </div>
                              <Stack spacing={0} className="flex-1 min-w-0 text-left">
                                <Typography variant="p" size="sm" weight="semibold" className="text-[13px] sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap block">
                                  PRO mode activated
                                </Typography>
                                <Typography variant="p" size="xs" color="muted" className="text-[12px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap block">
                                  All premium features.....
                                </Typography>
                              </Stack>
                              <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            </Flex>
                          </Button>

                          {/* Item 2: New candidate added (emphasis) */}
                          <Button
                            variant="ghost"
                            className="w-full justify-start pl-1 pr-2 sm:pl-2 py-2 h-14 border rounded-xl hover:bg-gray-50 text-left"
                            onClick={() => handleHighlightClick('New candidate added', 'Alex Johnson has entered the Technical Review phase')}
                          >
                            <Flex align="center" className="w-full gap-3 sm:gap-4 items-center overflow-hidden">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <UserPlus className="w-5 h-5 text-gray-700" />
                  </div>
                              <Stack spacing={0} className="flex-1 min-w-0 text-left">
                                <Typography variant="p" size="sm" weight="semibold" className="text-[13px] sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap block">
                                  New candidate added
                                </Typography>
                                <Typography variant="p" size="xs" color="muted" className="text-[12px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap block">
                                  Alex Johnson has entered...
                                </Typography>
                              </Stack>
                              <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            </Flex>
                          </Button>

                          {/* Item 3: Phase deadline soon */}
                          <Button
                            variant="ghost"
                            className="w-full justify-start pl-1 pr-2 sm:pl-2 py-2 h-14 border rounded-xl hover:bg-gray-50 text-left"
                            onClick={() => handleHighlightClick('Phase deadline soon', 'Initial Review Phase 3 ends in 2 days')}
                          >
                             <Flex align="center" className="w-full gap-3 sm:gap-4 items-center overflow-hidden">
                               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Bell className="w-5 h-5 text-gray-700" />
                              </div>
                              <Stack spacing={0} className="flex-1 min-w-0 text-left">
                                <Typography variant="p" size="sm" weight="semibold" className="text-[13px] sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap block">
                                  Phase deadline soon
                                </Typography>
                                <Typography variant="p" size="xs" color="muted" className="text-[12px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap block">
                                  Initial Review Phase 3 ends..
                                </Typography>
                              </Stack>
                              <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            </Flex>
                          </Button>
                          {/* Divider and actions */}
                          <Separator className="my-2 sm:my-3 bg-gray-100 h-[1px]" />
                            <Flex align="center" justify="between" className="w-full gap-2">
                            <Button
                              size="lg"
                                className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-black text-white hover:bg-emerald-700 hover:text-white font-medium ml-2 sm:ml-3 mr-2 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5"
                             
                              onClick={() => {
                                setIsNotificationOpen(true);
                                setShowAllNotifications(true);
                              }}
                            >
                              <Typography variant="span" size="xs" className="text-white">See all notifications</Typography>
                              <ArrowRight className="ml-2 w-3 h-3 text-white" />
                            </Button>
                            <Button
                              variant="outline"

                              size="sm"
                              className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-gray-200 hover:bg-emerald-700 font-medium mr-2 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5"
                              onClick={() => setNotesOpen(true)}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Notes
                            </Button>
                          </Flex>
                          </Stack>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Mobile & Tablet: Notification panel removed */}
                </motion.div>

                {/* InterviewOverview Components with Right Side Cards */}
                <div className="w-full max-w-none px-0 ml-0 lg:ml-0 mt-2 ">
                  {/* Mobile/tablet header for Interview Overview (placed above Previous Background). Hidden on lg+. */}
                  <Flex align="center" justify="between" className="w-full gap-2 mb-2 pl-0 pr-2 flex lg:hidden">
                    <Typography variant="h2" size="lg" weight="bold" className="text-left text-xl md:text-2xl">
                      Interview Overview
                    </Typography>
                    <Flex align="center" gap={2} className="ml-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white"
                        onClick={() => {
                          setQuestions(prev => [
                            ...prev,
                            {
                              prompt: 'New Question',
                              competency: 'Team Building',
                              time: '10 Min',
                              level: 'Pending',
                              editing: true,
                              deleted: false,
                              answer: '',
                              answering: false,
                            },
                          ]);
                        }}
                      >
                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white">
                            <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-600" onClick={() => setQuestions([])}>
                            <Typography variant="span" size="sm">Delete All Questions</Typography>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Flex>
                  </Flex>
                  <div className="flex flex-col lg:flex-row gap-4 lg:min-h-0 lg:items-stretch">
                    {/* Left Side: InterviewOverview */}
                    <div className="w-full lg:flex-1 lg:w-auto lg:h-full lg:min-h-0">

                      {/* Previous Background Card with fixed height and scrollable questions area */}
                      <Card className="w-full rounded-2xl shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col h-[700px] md:h-[453px] min-h-0 sm:h-full">
                        <CardHeader className="pl-4 pr-4 pb-0">
                          <Typography variant="h2" size="2xl" weight="medium" className="text-lg md:text-xl">Previous Background</Typography>
                        </CardHeader>
                        <CardContent className="-mt-4 pb-0 px-4 flex flex-col flex-1 min-h-0">
                          {/* Only one question visible, rest scrollable, scrollbar hidden */}
                          <div className="flex-1 min-h-0">
                            <div className="overflow-y-auto h-[88px] scrollbar-none pr-2">
                              {questions.map((q, idx) => (
                                <div key={idx} className="flex items-start gap-2 mb-1 border-b pb-2 last:border-b-0 last:mb-0 last:pb-0 min-h-[88px] max-h-[88px]">
                                  <Badge className="w-6 h-6 md:w-7 md:h-7 bg-gray-200 text-black rounded-full flex items-center justify-center font-semibold flex-shrink-0">{idx + 1}</Badge>
                                  <div className="flex-1 min-w-0">
                                    <Typography variant="h4" size="lg" weight="medium" className="text-sm md:text-base lg:text-lg leading-snug break-words">
                                      {q.prompt}
                                    </Typography>
                                    <Typography variant="p" size="xs" color="muted" className="text-gray-500 text-[10px] mt-0">
                                      {q.time} • {q.competency} • {q.level}
                                    </Typography>
                                  </div>
                                  <Flex align="center" gap={1} className="flex-shrink-0">
                                    {/* Edit */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      onClick={() => {
                                        setQuestions(prev => prev.map((item, i) => i === idx ? { ...item, editing: true } : { ...item, editing: false }));
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    {/* Delete */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      onClick={() => {
                                        setQuestions(prev => prev.filter((_, i) => i !== idx));
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                    {/* Duplicate */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      onClick={() => {
                                        setQuestions(prev => {
                                          const copy = [...prev];
                                          copy.splice(idx + 1, 0, { ...q });
                                          return copy;
                                        });
                                      }}
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                    {/* Move Up */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      disabled={idx === 0}
                                      onClick={() => {
                                        if (idx === 0) return;
                                        setQuestions(prev => {
                                          const copy = [...prev];
                                          [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                                          return copy;
                                        });
                                      }}
                                    >
                                      <ChevronUp className="w-4 h-4" />
                                    </Button>
                                    {/* Move Down */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      disabled={idx === questions.length - 1}
                                      onClick={() => {
                                        if (idx === questions.length - 1) return;
                                        setQuestions(prev => {
                                          const copy = [...prev];
                                          [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
                                          return copy;
                                        });
                                      }}
                                    >
                                      <ChevronDown className="w-4 h-4" />
                                    </Button>
                                    {/* Preview */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      onClick={() => {
                                        alert(`Preview:\n${q.prompt}\nCompetency: ${q.competency}\nTime: ${q.time}\nLevel: ${q.level}`);
                                      }}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    {/* Add to Library */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-emerald-700 hover:text-white"
                                      onClick={() => {
                                        alert('Added to library!');
                                      }}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </Flex>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Editing Block */}
                          <Card ref={editingBlockRef} className="bg-gray-100 rounded-xl py-1 px-1 sm:py-1.5 sm:px-2 md:py-2 md:px-3 lg:py-2 lg:px-3 xl:py-2 xl:px-4 2xl:py-1 2xl:px-2">
                            <CardContent className="py-0.5 px-1 sm:px-2 md:px-3 md:py-1">
                                  <Flex align="start" gap={2} className="mb-1">
                                <Badge className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center font-semibold">2</Badge>
                                <Typography variant="h3" size="lg" weight="medium">Editing</Typography>
                                  </Flex>

                              <Grid cols={1} gap={2} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-start">
                                <div className="md:col-span-2">
                                  <Label className="text-sm mb-1">Prompt</Label>
                                  <Input ref={editPromptInputRef} className="w-full h-8 bg-white" placeholder="How are JavaScript and........" />
                                </div>
                                <div>
                                  <Label className="text-sm mb-1">Competencies</Label>
                                  <Select defaultValue="Teambuilding">
                                    <SelectTrigger className="w-full h-8 bg-white">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Teambuilding">Teambuilding</SelectItem>
                                          <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                                          <SelectItem value="Communication">Communication</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                <div>
                                  <Label className="text-sm mb-1">Time</Label>
                                  <Flex align="center" gap={2}>
                                    <Input className="w-16 h-8  bg-white" defaultValue="10" />
                                    <Typography variant="span" size="xs" color="muted">min</Typography>
                                      </Flex>
                                    </div>
                                <div>
                                  <Label className="text-sm mb-1">Level</Label>
                                  <Select defaultValue="Pending">
                                    <SelectTrigger className="w-full h-8  bg-white">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Pending">Pending</SelectItem>
                                          <SelectItem value="Beginner">Beginner</SelectItem>
                                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                                          <SelectItem value="Advanced">Advanced</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                              </Grid>

                              <Typography variant="h4" size="sm" weight="bold" className="mt-0.5 mb-1">Guidelines</Typography>
                              <Card className="bg-white rounded-xl overflow-hidden py-1 px-1 sm:py-1.5 sm:px-2 md:py-2 md:px-3">
                                <CardContent className="p-1 sm:p-1 md:p-1.5">
                                  <Typography variant="p" size="xs" weight="bold" className="mb-0.5">Some of the key features of design are:</Typography>
                                  <div className="max-h-[48px] overflow-y-auto pr-1 text-[10px] sm:max-h-[64px] sm:text-xs md:max-h-[76px] lg:max-h-[88px] xl:max-h-[96px] scrollbar-none">
                                    <ul className="list-disc pl-3 sm:pl-4 leading-snug text-gray-700 space-y-0">
                                      <li>A line is a visual trace created by any writing tool or the meeting point of two shapes</li>
                                      <li>Size refers to how much visual space one element occupies compared to another</li>
                                    </ul>
                                  </div>
                                </CardContent>
                              </Card>
                                  
                              <Flex gap={2} className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 flex-col md:flex-row">
                                {/* Insert From Library Button and Modal */}
                                <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="w-full md:flex-1 bg-white hover:bg-emerald-700 hover:text-white">Insert From Library</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg w-full">
                                    <DialogHeader>
                                      <DialogTitle>Template Library</DialogTitle>
                                    </DialogHeader>
                                    <Input
                                      placeholder="Search or filter by category..."
                                      className="mb-2"
                                      value={librarySearch}
                                      onChange={e => setLibrarySearch(e.target.value)}
                                    />
                                    <ScrollArea className="h-[300px] pr-2">
                                      <div className="grid gap-3">
                                        {predefinedTemplates
                                          .filter(t =>
                                            t.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
                                            t.category.toLowerCase().includes(librarySearch.toLowerCase())
                                          )
                                          .map(template => (
                                            <Card
                                              key={template.id}
                                              className="cursor-pointer hover:border-primary transition-colors"
                                              onClick={() => {
                                                setQuestions(prev => [
                                                  ...prev,
                                                  ...template.questions.map(q => ({
                                                    ...q,
                                                    time: q.time + ' Min',
                                                    editing: false,
                                                    deleted: false,
                                                    answer: '',
                                                    answering: false,
                                                  }))
                                                ]);
                                                setLibraryOpen(false);
                                              }}
                                            >
                                              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                                <CardTitle className="text-base">{template.title}</CardTitle>
                                                <Badge>{template.category}</Badge>
                                              </CardHeader>
                                              <CardContent>
                                                <p className="text-xs text-muted-foreground">
                                                  {template.questions.length} questions
                                                </p>
                                              </CardContent>
                                            </Card>
                                          ))}
                                        {predefinedTemplates.filter(t =>
                                          t.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
                                          t.category.toLowerCase().includes(librarySearch.toLowerCase())
                                        ).length === 0 && (
                                          <Typography variant="p" size="sm" className="text-gray-400">No templates found.</Typography>
                                        )}
                                      </div>
                                    </ScrollArea>
                                  </DialogContent>
                                </Dialog>
                                {/* Create New Prompt Button and Modal */}
                                <Dialog open={createPromptOpen} onOpenChange={setCreatePromptOpen}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" className="w-full md:flex-1 bg-black text-white hover:bg-emerald-700">Create New Prompt</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-sm w-full">
                                    <DialogHeader>
                                      <DialogTitle>Create New Prompt</DialogTitle>
                                    </DialogHeader>
                                    <Grid cols={1} gap={2} className="grid grid-cols-1 gap-2">
                                      <div>
                                        <Label className="text-sm mb-1">Prompt</Label>
                                        <Input
                                          className="w-full h-8 bg-white"
                                          placeholder="Type the question..."
                                          value={newPrompt}
                                          onChange={e => setNewPrompt(e.target.value)}
                                          ref={createPromptInputRef}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm mb-1">Competency</Label>
                                        <Select value={newCompetency} onValueChange={setNewCompetency}>
                                          <SelectTrigger className="w-full h-8 bg-white">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Team Building">Team Building</SelectItem>
                                            <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                                            <SelectItem value="Communication">Communication</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-sm mb-1">Time</Label>
                                        <Flex align="center" gap={2}>
                                          <Input
                                            className="w-16 h-8 bg-white"
                                            value={newTime}
                                            onChange={e => setNewTime(e.target.value.replace(/[^0-9]/g, ""))}
                                          />
                                          <Typography variant="span" size="xs" color="muted">min</Typography>
                                        </Flex>
                                      </div>
                                      <div>
                                        <Label className="text-sm mb-1">Level</Label>
                                        <Select value={newLevel} onValueChange={setNewLevel}>
                                          <SelectTrigger className="w-full h-8 bg-white">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Advanced">Advanced</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </Grid>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                                          onClick={() => {
                                            if (!newPrompt.trim() || !newCompetency || !newTime.trim() || !newLevel) return;
                                            const minutes = newTime.replace(/[^0-9]/g, "") || "10";
                                            const newQuestion = {
                                              prompt: newPrompt.trim(),
                                              competency: newCompetency,
                                              time: `${minutes} Min`,
                                              level: newLevel,
                                              editing: false,
                                              deleted: false,
                                              answer: "",
                                              answering: false,
                                            };
                                            setQuestions(prev => [...prev, newQuestion]);
                                            setNewPrompt("");
                                            setNewCompetency("Team Building");
                                            setNewTime("10");
                                            setNewLevel("Pending");
                                            setCreatePromptOpen(false);
                                          }}
                                          disabled={!newPrompt.trim() || !newCompetency || !newTime.trim() || !newLevel}
                                        >
                                          <Typography variant="span" size="sm" className="text-white">Save</Typography>
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </Flex>
                            </CardContent>
                          </Card>
                          </CardContent>
                        </Card>
                    </div>

                    {/* Right Side: Assigned Interviewers and Section Panel */}
                    <div className="w-full lg:w-72 xl:w-80 2xl:w-[355px] flex flex-col gap-4 lg:h-full lg:min-h-0 lg:ml-2">
                      {/* Assigned Interviewers Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                        whileHover={{
                          y: -4,
                          scale: 1.02,
                          transition: { duration: 0.2, ease: 'easeOut' }
                        }}
                        className="lg:flex-[3] lg:min-h-0 lg:h-0"
                      >
                        <Card
                          className="rounded-2xl shadow-md px-3 py-2 md:px-3 md:py-2 flex flex-col justify-center min-h-[120px] w-full"
                        >
                          <CardHeader className="p-0 mb-1">
                            <Flex align="center" justify="between" className="w-full">
                              <Typography
                                variant="h2"
                                size="2xl"
                                weight="medium"
                                className="text-lg md:text-xl lg:text-xl"
                              >
                                Assigned Interviewers
                              </Typography>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 rounded-full hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                aria-label="View all interviewers"
                                onClick={() => setShowInterviewersModal(true)}
                              >
                                <ArrowRight className="w-5 h-5 text-gray-700" />
                              </Button>
                            </Flex>
                            <Typography
                              variant="p"
                              size="xs"
                              color="muted"
                              className="text-gray-500 text-[11px] md:text-xs mt-0.5"
                            >
                              Interview panel for this position
                            </Typography>
                          </CardHeader>
                          <CardContent className="p-0">
                            <Flex align="center" className="w-full">
                              <Flex align="center" className="-space-x-2">
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
                                <Badge className="bg-emerald-700 text-white text-[11px] md:text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full">+5</Badge>
                              </Flex>
                            </Flex>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Section Panel Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                        whileHover={{
                          y: -4,
                          scale: 1.02,
                          transition: { duration: 0.2, ease: 'easeOut' }
                        }}
                        className="flex flex-col gap-0 lg:flex-[7] lg:min-h-0 lg:h-0"
                      >
                        <Card className="rounded-2xl shadow hover:shadow-md transition-all duration-200 flex flex-col gap-2 md:gap-3 mt-0 h-[305px] w-full lg:max-w-[355px] py-2 md:py-3">
                          <CardHeader className="pt-0 pb-0 px-3 md:px-4 flex-shrink-0">
                            <Flex align="center" justify="between" className="gap-2">
                              <Typography variant="h2" size="2xl" weight="medium" className="text-lg md:text-xl lg:text-xl">Section</Typography>
                              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="bg-black text-white hover:bg-emerald-700 hover:text-white rounded-xl px-2 py-1 text-sm font-medium transition-colors"
                                  >
                                    <Typography variant="span" size="sm" className="hidden sm:inline md:inline text-white">Add Section</Typography>
                                    <span className="inline-flex sm:hidden md:hidden text-white"><Plus className="w-4 h-4" /></span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="p-6 max-w-sm">
                                  <DialogHeader>
                                    <DialogTitle>Add Section</DialogTitle>
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
                                      <Typography variant="span" size="sm">Cancel</Typography>
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-black text-white hover:bg-emerald-700 text-sm rounded px-3 py-2 font-medium"
                                      onClick={handleCreateSection}
                                      disabled={!newSection.trim() || creating}
                                    >
                                      <Typography variant="span" size="sm" className="text-white">Create</Typography>
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </Flex>
                          </CardHeader>
                           <CardContent className="pt-0 pb-1 md:pb-2 w-full px-3 md:px-4 flex-grow overflow-y-auto scrollbar-none">
                            <Stack spacing={1} className="flex flex-col gap-1 w-full">
                              {sections.map((section, idx) => (
                                <Flex key={idx} align="center" justify="between" className="bg-white rounded-xl border px-3 py-1.5 w-full">
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
                                        <Typography variant="span" size="xs">Delete</Typography>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </Flex>
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Highlights detail dialog */}
      <Dialog open={highlightOpen} onOpenChange={setHighlightOpen}>
        <DialogContent className="max-w-xs w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{highlightTitle}</DialogTitle>
          </DialogHeader>
          <Typography variant="p" size="sm" className="text-gray-600">
            {highlightDetail}
          </Typography>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-black text-white hover:bg-emerald-700">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Responsive Notification Dropdown/Modal - Single Source of Truth */}
      {isNotificationOpen && (
        <>
          {/* Mobile: Full-screen slide-in panel */}
          <div className="md:hidden fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out">
        <Card className="w-80 h-full rounded-none border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsNotificationOpen(false)
                setShowAllNotifications(false)
              }}
                  className="p-1.5 hover:bg-emerald-700 rounded-lg"
            >
                  <X className="w-4 h-4" />
            </Button>
          </CardHeader>
              <CardContent className="flex-1 p-2">
            <ScrollArea className={`h-full ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
                  <div className="space-y-1.5">
                {/* Always show the first notification */}
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200">
                      <CardContent className="p-2">
                        <Flex align="center" gap={2} className="w-full">
                          <Bell className="w-4 h-4 text-black flex-shrink-0" />
                          <Stack spacing={0} className="flex-1 min-w-0">
                            <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                              PRO mode activated
                            </Typography>
                            <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                              All premium features are now available for your account
                            </Typography>
                          </Stack>
                          <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        </Flex>
                  </CardContent>
                </Card>
                {showAllNotifications && (
                  <>
                        <Card className="hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200" onClick={() => setAddPersonModalOpen(true)}>
                          <CardContent className="p-2">
                            <Flex align="center" gap={2} className="w-full">
                              <Users className="w-4 h-4 text-black flex-shrink-0" />
                              <Stack spacing={0} className="flex-1 min-w-0">
                                <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                                  New candidate added
                                </Typography>
                                <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                                  Alex Johnson has entered the Technical Review phase
                                </Typography>
                              </Stack>
                              <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            </Flex>
                      </CardContent>
                    </Card>
                        <Card className="hover:bg-gray-50 transition-colors border border-gray-200">
                          <CardContent className="p-2">
                            <Flex align="center" gap={2} className="w-full">
                              <Clock className="w-4 h-4 text-black flex-shrink-0" />
                              <Stack spacing={0} className="flex-1 min-w-0">
                                <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                                  Phase deadline soon
                                </Typography>
                                <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                                  Initial Review Phase 3 ends in 2 days
                                </Typography>
                              </Stack>
                              <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            </Flex>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
              <CardFooter className="p-2 border-t">
                <Flex align="center" justify="center" className="w-full gap-2">
              <Button 
                onClick={handleSeeAllNotifications}
                    className="flex-1 bg-black text-white hover:bg-emerald-700 text-[11px] h-6"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                    className="text-[11px] h-6 border border-gray-300 hover:bg-emerald-700"
                onClick={() => setNotesOpen(true)}
              >
                Notes
              </Button>
                </Flex>
          </CardFooter>
        </Card>
      </div>

          {/* Desktop: Dropdown modal */}
        <Card className="hidden md:block fixed top-20 right-8 z-[9999] w-96 shadow-xl border animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsNotificationOpen(false)
                setShowAllNotifications(false)
              }}
                className="p-1.5 hover:bg-emerald-700 rounded-lg"
            >
                <X className="w-4 h-4" />
            </Button>
          </CardHeader>
            <CardContent className="p-2">
            <ScrollArea className={`${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
                <div className="space-y-1.5">
                  <Card className="hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200">
                    <CardContent className="p-1">
                      <Flex align="center" gap={2} className="w-full">
                        <Bell className="w-3 h-3 text-black flex-shrink-0" />
                        <Stack spacing={0} className="flex-1 min-w-0">
                          <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                            PRO mode activated
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                            All premium features are now available for your account
                          </Typography>
                        </Stack>
                        <ArrowRight className="w-2 h-2 text-gray-400 flex-shrink-0" />
                      </Flex>
                  </CardContent>
                </Card>
                {showAllNotifications && (
                  <>
                      <Card className="hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200" onClick={() => setAddPersonModalOpen(true)}>
                        <CardContent className="p-1">
                          <Flex align="center" gap={2} className="w-full">
                            <Users className="w-3 h-3 text-black flex-shrink-0" />
                            <Stack spacing={0} className="flex-1 min-w-0">
                              <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                                New candidate added
                              </Typography>
                              <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                                Alex Johnson has entered the Technical Review phase
                              </Typography>
                            </Stack>
                            <ArrowRight className="w-2 h-2 text-gray-400 flex-shrink-0" />
                          </Flex>
                      </CardContent>
                    </Card>
                      <Card className="hover:bg-gray-50 transition-colors border border-gray-200">
                        <CardContent className="p-1">
                          <Flex align="center" gap={2} className="w-full">
                            <Clock className="w-3 h-3 text-black flex-shrink-0" />
                            <Stack spacing={0} className="flex-1 min-w-0">
                              <Typography variant="p" size="sm" weight="medium" className="text-xs leading-tight">
                                Phase deadline soon
                              </Typography>
                              <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500 truncate">
                                Initial Review Phase 3 ends in 2 days
                              </Typography>
                            </Stack>
                            <ArrowRight className="w-2 h-2 text-gray-400 flex-shrink-0" />
                          </Flex>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
            <CardFooter className="p-2 pt-0 w-full bg-transparent">
              <Flex align="center" justify="center" className="w-full gap-2">
              <Button 
                onClick={handleSeeAllNotifications}
                  className="flex-1 bg-black text-white hover:bg-emerald-700 text-[11px] h-6"
              >
                {showAllNotifications ? 'Show less' : 'See all notifications'}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                  className="text-[11px] h-6 border border-gray-300 hover:bg-emerald-700"
                onClick={() => setNotesOpen(true)}
              >
                Notes
              </Button>
              </Flex>
          </CardFooter>
        </Card>
        </>
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
          <ScrollArea className="max-h-40">
            <div className="space-y-2">
              {notes.length === 0 ? (
                <div className="text-gray-400 text-xs text-center">No notes yet.</div>
              ) : (
                notes.map((note, idx) => (
                  <Card key={idx} className="bg-gray-100">
                    <CardContent className="p-2 text-xs flex justify-between items-center">
                      <span>{note}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 ml-2 text-xs p-0 h-auto" 
                        onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-emerald-700">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          <Card className="bg-gray-100">
            <CardContent className="p-3 text-xs text-gray-700">
              <strong>Common Topics:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>How to add a candidate</li>
                <li>How to schedule an interview</li>
                <li>How to use the dashboard</li>
                <li>Contact support</li>
              </ul>
            </CardContent>
          </Card>
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
