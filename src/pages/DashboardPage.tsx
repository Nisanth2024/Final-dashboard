import { useState } from "react";
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
import { HelpCircle, X, UserPlus, Clock, Eye, ArrowRight, Users, Bell, FileText, ChevronRight, ChevronDown, Download, Filter as FilterIcon, Plus, MoreHorizontal, Edit, Trash2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCandidates, type Candidate } from "./CandidatesPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { Typography } from "@/components/ui/typography";
import { Stack } from "@/components/ui/stack";
import { useTranslation } from "@/lib/useTranslation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@/components/ui/dialog";
import { Fragment } from "react";

export default function DashboardPage() {
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
    navigate('/candidates');
  }

  const handleViewCandidatesRound2 = () => {
    navigate('/candidates');
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

  // State for breadcrumbs and top right components (moved from MainContent)
  const [department, setDepartment] = useState<'All' | 'Design Department' | 'Engineering Department'>('All');

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
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [selectedLibraryIndexes, setSelectedLibraryIndexes] = useState<number[]>([]);
  const [editingPrompt, setEditingPrompt] = useState({
    prompt: '',
    competency: 'Team Building',
    time: '10 Min',
    level: 'Pending',
  });

  // Predefined question bank
  const questionBank = [
    {
      prompt: "What is a closure in JavaScript?",
      competency: "Technical Skills",
      time: "10 Min",
      level: "Beginner",
    },
    {
      prompt: "Describe a time you resolved a team conflict.",
      competency: "Team Building",
      time: "10 Min",
      level: "Intermediate",
    },
    {
      prompt: "How do you optimize React performance?",
      competency: "Technical Skills",
      time: "15 Min",
      level: "Advanced",
    },
    {
      prompt: "Explain the difference between == and === in JavaScript.",
      competency: "Technical Skills",
      time: "10 Min",
      level: "Beginner",
    },
    {
      prompt: "How do you handle feedback from a manager or peer?",
      competency: "Communication",
      time: "10 Min",
      level: "Intermediate",
    },
  ];

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
    <Card className="w-full min-h-[180px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] 2xl:min-h-[160px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden flex flex-col">
      <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pt-0 flex-shrink-0">
        <Flex align="center" gap={1} wrap="wrap" className="mb-[-20px] 2xl:mb-[-10px]">
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 2xl:text-[8px] 2xl:px-0.5">
            Aug 10 - Aug 20
          </Badge>
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1 2xl:text-[8px] 2xl:px-0.5">
            <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 2xl:w-2 2xl:h-2" />
            <Typography variant="span" size="xs">10 Candidates</Typography>
          </Badge>
          <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-green-700 bg-green-100 2xl:text-[8px] 2xl:px-0.5">
            Completed
          </Badge>
        </Flex>
      </CardHeader>
      
      <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0">
        <Typography 
          variant="h3" 
          size="lg" 
          weight="semibold" 
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
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-black text-white hover:bg-emerald-700 hover:text-white font-medium"
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
    <Card className="w-full min-h-[180px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] 2xl:min-h-[160px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden flex flex-col">
      <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pt-0 flex-shrink-0">
        <Flex align="center" gap={1} wrap="wrap" className="mb-[-20px] 2xl:mb-[-10px]">
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 2xl:text-[8px] 2xl:px-0.5">
            Aug 10 - Aug 20
          </Badge>
          <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1 2xl:text-[8px] 2xl:px-0.5">
            <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 2xl:w-2 2xl:h-2" />
            <Typography variant="span" size="xs">10 Candidates</Typography>
          </Badge>
          <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-orange-700 bg-orange-100 2xl:text-[8px] 2xl:px-0.5">
            In Progress
          </Badge>
        </Flex>
      </CardHeader>
      
      <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 pb-0">
        <Typography 
          variant="h3" 
          size="lg" 
          weight="semibold" 
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
            className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-xs px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-2 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-1 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 2xl:h-6 bg-black text-white hover:bg-emerald-700 hover:text-white font-medium"
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
  const NotificationPanel = ({ language }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }) => {
    const t = useTranslation(language);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [allOpen, setAllOpen] = useState(false);
    // Example notifications array
    const allNotifications = [
      {
        title: t.proMode,
        message: t.allPremium,
        time: 'Just now',
        icon: <Bell className="w-4 h-4 text-black" />,
        action: () => window.open('/pro', '_blank'),
        actionLabel: t.proMode,
      },
      {
        title: t.newCandidate,
        message: t.newCandidateDesc,
        time: '5 min ago',
        icon: <Users className="w-4 h-4 text-black" />,
        action: () => window.location.href = '/candidates',
        actionLabel: t.newCandidate,
      },
      {
        title: t.phaseDeadline,
        message: t.phaseDeadlineDesc,
        time: '1 hour ago',
        icon: <Clock className="w-4 h-4 text-black" />,
        action: () => window.location.href = '/dashboard',
        actionLabel: t.phaseDeadline,
      },
      // Add more notifications as needed
    ];

    const handleConfirm = (action: () => void, type: 'pro' | 'candidates' | 'dashboard') => {
      setPendingAction(() => action);
      let detail = '';
      if (type === 'pro') {
        detail = 'You are about to view the PRO features overview in a new tab. This page will show you all premium features, benefits, and settings available with your PRO subscription.';
      } else if (type === 'candidates') {
        detail = 'You are about to navigate to the Candidates page. Here you can review all candidates, their profiles, and notes in your pipeline.';
      } else if (type === 'dashboard') {
        detail = 'You are about to view the Dashboard. This page summarizes your interview progress, deadlines, and tasks.';
      }
      setConfirmMessage(detail + ' Do you want to continue?');
      setConfirmOpen(true);
    };
    const handleProceed = () => {
      if (pendingAction) pendingAction();
      setConfirmOpen(false);
      setPendingAction(null);
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        whileHover={{ 
          y: -4, 
          scale: 1.02,
          transition: { duration: 0.2, ease: 'easeOut' }
        }}className="h-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px] xl:min-h-[90px] w-full"
      >
        
        <Card className="h-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px] xl:min-h-[90px] 2xl:min-h-[60px] w-full rounded-2xl shadow-md hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
          <CardHeader className="pb-0 px-3 sm:px-2 md:px-3 lg:px-3 xl:px-4 2xl:px-2 w-full">
            <Typography 
              variant="h3" 
              size="sm" 
              weight="semibold" 
              className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-sm mb-0 -mt-2"
            >
              Notifications
            </Typography>
          </CardHeader>
          
          <CardContent className="flex-1 space-y-0 w-full px-0 pt-0 pb-[-20px] -mt-7 2xl:-mt-4">
            <Stack spacing={0} className="w-full">
            {allNotifications.map((notification, index) => (
                <Card 
                  key={index} 
                  className="w-full p-1 sm:p-1 md:p-1.5 lg:p-2 xl:p-2 2xl:p-1 bg-transparent border-0 hover:bg-emerald-700 transition-colors cursor-pointer" 
                  onClick={() => handleConfirm(notification.action, index === 0 ? 'pro' : index === 1 ? 'candidates' : 'dashboard')}
                >
                  <CardContent className="p-0 w-full bg-transparent">
                    <Flex align="center" gap={2} className="w-full">
                <div className="flex-shrink-0">
                  {notification.icon}
                </div>
                <div className="flex-1 min-w-0">
                        <Typography 
                          variant="p" 
                          size="xs" 
                          weight="medium" 
                          className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm 2xl:text-[10px] leading-tight"
                        >
                          {notification.title}
                        </Typography>
                        <Typography 
                          variant="p" 
                          size="xs" 
                          color="muted" 
                          className="text-[8px] sm:text-[9px] md:text-xs lg:text-xs xl:text-xs 2xl:text-[8px] truncate"
                        >
                          {notification.message}
                        </Typography>
                </div>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-2.5 2xl:h-2.5 text-gray-400 flex-shrink-0" />
                    </Flex>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
          
          <CardFooter className="pt-0 px-0 pb-1.5 sm:pb-1.5 md:pb-2 lg:pb-2.5 xl:pb-3 2xl:pb-1.5 -mt-4 2xl:-mt-2 w-full bg-transparent">
            <Flex align="center" justify="center" className="md:mt[-20px] w-full -ml-1">
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-xs h-7 sm:h-6 md:h-7 lg:h-7 xl:h-8 2xl:h-6 font-medium px-3"
                onClick={() => setAllOpen(true)}
              >
                <Typography variant="span" size="xs" className="truncate text-white">
                  See All Notifications
                </Typography>
                <ArrowRight className="ml-1 w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-3 2xl:h-3 text-white" />
              </Button>
            </Flex>
          </CardFooter>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="max-w-xs w-full sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <Typography variant="p" size="sm" className="py-2">
              {confirmMessage}
            </Typography>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="bg-gray-200 text-black">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white font-medium"
                onClick={handleProceed}
              >
                <Typography variant="span" size="sm" className="text-white">Proceed</Typography>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
       
        {/* See All Notifications Modal */}
        <Dialog open={allOpen} onOpenChange={setAllOpen}>
          <DialogContent className="max-w-md w-full sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>All Notifications</DialogTitle>
            </DialogHeader>
            <Stack spacing={2} className="max-h-80 overflow-y-auto mt-2 w-full">
              {allNotifications.length === 0 ? (
                <Typography variant="p" size="sm" color="muted" align="center" className="py-8">
                  No notifications found.
                </Typography>
              ) : (
                allNotifications.map((n, i) => (
                  <Card key={i} className="bg-gray-100">
                    <CardContent className="p-2">
                      <Flex align="start" gap={2} className="relative w-full min-w-0">
                    <div>{n.icon}</div>
                    <div className="flex-1 min-w-0">
                          <Typography variant="p" size="sm" weight="bold" className="text-xs sm:text-sm leading-tight">
                            {n.title}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-gray-500 text-xs mb-0.5 break-words">
                            {n.message}
                          </Typography>
                          <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-400">
                            {n.time}
                          </Typography>
                    </div>
                    <Button
                      size="sm"
                          className="bg-black text-white hover:bg-emerald-700 hover:text-white text-xs font-medium"
                      onClick={n.action}
                    >
                          <Typography variant="span" size="xs" className="text-white">{n.actionLabel}</Typography>
                    </Button>
                      </Flex>
                    </CardContent>
                  </Card>
                ))
              )}
            </Stack>
            <DialogFooter>
              <DialogClose asChild>
                <Button 
                  className="bg-black text-white hover:bg-emerald-700 hover:text-white w-full font-medium"
                >
                  <Typography variant="span" size="sm" className="text-white">Close</Typography>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    );
  };

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
                        className="flex-col sm:flex-row gap-3 w-full sm:w-auto md:flex-wrap md:w-full md:space-x-0 md:gap-y-2 lg:flex-nowrap lg:w-auto lg:space-x-2"
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
                                <Typography variant="span" size="sm">Apply</Typography>
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
                            <Round1Card onViewCandidates={() => {}} />
                          </div>
                          <div className="w-full">
                            <Round2Card onViewCandidatesRound2={() => {}} />
                          </div>
                        </Grid>
                      </Grid>
                      
                      {/* Desktop: Side-by-side Layout with Optimized Card Sizes */}
                      <div className="hidden lg:flex lg:flex-row lg:gap-4 xl:gap-6 2xl:gap-6 lg:w-full">
                        <div className="w-[50%]">
                          <Round1Card onViewCandidates={() => {}} />
                        </div>
                        <div className="w-[50%]">
                          <Round2Card onViewCandidatesRound2={() => {}} />
                        </div>
                      </div>
                    </Stack>

                    {/* Header placed at the bottom of Round cards (aligns with Notification panel bottom on lg+) */}
                    <Flex align="center" justify="between" className="w-full gap-2 mt-2 lg:mt-auto">
                      <Typography variant="h2" size="lg" weight="bold" className="text-left text-xl md:text-2xl lg:text-3xl">
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
                  </div>

                  {/* Right Side: Notification Panel with Vertical Divider */}
                  <div className="hidden lg:block w-72 xl:w-80 2xl:w-[320px] border-l border-gray-200 pl-4">
                    <NotificationPanel language={language} setLanguage={setLanguage} />
                  </div>

                  {/* Mobile & Tablet: Notification Panel (stacked below) */}
                  <div className="lg:hidden w-full">
                    <NotificationPanel language={language} setLanguage={setLanguage} />
                  </div>
                </motion.div>

                {/* InterviewOverview Components with Right Side Cards */}
                <div className="w-full max-w-none px-2 2xl:px-0 ml-0 lg:ml-2 mt-2">
                  <div className="flex flex-col lg:flex-row gap-4 lg:min-h-0 lg:items-stretch">
                    {/* Left Side: InterviewOverview */}
                    <div className="w-full lg:flex-1 lg:w-auto lg:h-full lg:min-h-0">

                      {/* Previous Background Card */}
                      <Card className="w-full rounded-2xl shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col">
                        <CardHeader className="pl-4 pr-4 pb-0">
                          <Typography variant="h3" size="lg" weight="medium" className="text-lg md:text-xl">Previous Background</Typography>
                              </CardHeader>
                        <CardContent className="pt-0 pb-2">
                          {/* Question Row */}
                          <Card className="border rounded-xl mb-0.5">
                            <CardContent className="py-0.5 px-2">
                              <Flex align="start" justify="between" className="w-full gap-1.5">
                                <Badge className="w-6 h-6 md:w-7 md:h-7 bg-gray-200 text-black rounded-full flex items-center justify-center font-semibold flex-shrink-0">1</Badge>
                                <div className="flex-1 min-w-0">
                                  <Typography variant="h4" size="lg" weight="medium" className="text-sm md:text-base lg:text-lg leading-snug break-words">
                                    In what ways do JavaScript and jQuery vary?
                                        </Typography>
                                  <Typography variant="p" size="xs" color="muted" className="text-gray-500 text-[10px] mt-0">3m • 4 Questions</Typography>
                                            </div>
                                <Flex align="center" gap={1} className="flex-shrink-0">
                                  <Button variant="ghost" size="icon" className="hover:bg-emerald-700 hover:text-white"><Edit className="w-4 h-4" /></Button>
                                  <Button variant="ghost" size="icon" className="hover:bg-emerald-700 hover:text-white"><Trash2 className="w-4 h-4" /></Button>
                                  <Button variant="ghost" size="icon" className="hover:bg-emerald-700 hover:text-white"><MoreHorizontal className="w-4 h-4" /></Button>
                                          </Flex>
                                          </Flex>
                                </CardContent>
                              </Card>

                          {/* Editing Block */}
                          <Card className="bg-gray-100 rounded-xl">
                            <CardContent className="p-2 md:p-2">
                              <Flex align="start" gap={2} className="mb-1">
                                <Badge className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center font-semibold">2</Badge>
                                <Typography variant="h3" size="lg" weight="semibold">Editing</Typography>
                                  </Flex>

                              <Grid cols={1} gap={1.5} className="grid grid-cols-1 md:grid-cols-5 gap-1.5 items-start">
                                <div className="md:col-span-2">
                                  <Label className="text-sm mb-1">Prompt</Label>
                                  <Input className="w-full h-8" placeholder="How are JavaScript and jQuery different?" />
                                </div>
                                <div>
                                  <Label className="text-sm mb-1">Competencies</Label>
                                  <Select defaultValue="Teambuilding">
                                    <SelectTrigger className="w-full h-8">
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
                                    <Input className="w-16 h-8" defaultValue="10" />
                                    <Typography variant="span" size="xs" color="muted">min</Typography>
                                      </Flex>
                                    </div>
                                <div>
                                  <Label className="text-sm mb-1">Level</Label>
                                  <Select defaultValue="Pending">
                                    <SelectTrigger className="w-full h-8">
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
                              <Card className="bg-white">
                                <CardContent className="p-1.5">
                                  <Typography variant="p" size="sm" weight="bold" className="mb-1">Some of the key features of design are:</Typography>
                                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-0.5">
                                        <li>A line is a visual trace created by any writing tool or the meeting point of two shapes</li>
                                        <li>Size refers to how much visual space one element occupies compared to another</li>
                                      </ul>
                                    </CardContent>
                                  </Card>
                                  
                              <Flex gap={2} className="mt-1 flex-col md:flex-row">
                                <Button size="sm" variant="outline" className="flex-1 hover:bg-emerald-700 hover:text-white">Insert From Library</Button>
                                <Button size="sm" className="flex-1 bg-black text-white hover:bg-emerald-700">Create New Prompt</Button>
                                  </Flex>
                                </CardContent>
                              </Card>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Side: Assigned Interviewers and Section Panel */}
                    <div className="w-full lg:w-72 xl:w-80 2xl:w-[320px] flex flex-col gap-4 lg:h-full lg:min-h-0 lg:ml-2">
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
                        <Card className="rounded-2xl shadow-md p-2 md:p-3 pb-6 flex flex-col justify-start min-h-[180px] h-full w-full">
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

                      {/* Section Panel Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex flex-col gap-0 lg:flex-[7] lg:min-h-0 lg:h-0"
                      >
                        <Card className="rounded-2xl shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col mt-0 sm:mt-0 md:mt-0 h-full min-h-[295px] w-full lg:max-w-[355px]">
                          <CardHeader className="pb-0">
                            <Flex align="center" justify="between">
                              <Typography variant="h3" size="lg" weight="semibold" className="text-lg">Section</Typography>
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
                           <CardContent className="pt-0 pb-2 w-full">
                            <Stack spacing={1} className="flex flex-col gap-0.5 w-full">
                              {sections.map((section, idx) => (
                                <Flex key={idx} align="center" justify="between" className="bg-white rounded-xl border px-3 py-2 w-full">
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
      {/* Notification Panel - slides in from right on mobile, dropdown/modal on desktop */}
      {/* Mobile Notification Panel */}
      <div className={
        `md:hidden fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out
        ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`
      }>
        <Card className="w-80 h-full rounded-none border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
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
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <ScrollArea className={`h-full ${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              <div className="space-y-4">
                {/* Always show the first notification */}
                {/* Always show the first notification */}
                <Card className="hover:bg-emerald-700/10 transition-colors cursor-pointer">
                 
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
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
                  </CardContent>
                </Card>
                {showAllNotifications && (
                  <>
                    <Card className="hover:bg-emerald-700/10 transition-colors cursor-pointer" onClick={() => setAddPersonModalOpen(true)}>
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-4 h-4 text-green-600 mt-0.5">
                            <UserPlus className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">New candidate added</p>
                            <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="hover:bg-emerald-700/10 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-4 h-4 text-orange-600 mt-0.5">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Phase deadline soon</p>
                            <p className="text-xs text-gray-600">Initial Review Phase 3 ends in 2 days</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex space-x-2 w-full">
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
          </CardFooter>
        </Card>
      </div>
      {/* Desktop Notification Dropdown/Modal */}
      {isNotificationOpen && (
        <Card className="hidden md:block fixed top-20 right-8 z-[9999] w-96 shadow-xl border animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
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
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className={`${showAllNotifications ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              <div className="space-y-4">
                <Card className="hover:bg-emerald-700/10 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
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
                  </CardContent>
                </Card>
                {showAllNotifications && (
                  <>
                    <Card className="hover:bg-emerald-700/10 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-4 h-4 text-green-600 mt-0.5">
                            <UserPlus className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">New candidate added</p>
                            <p className="text-xs text-gray-600">Alex Johnson has entered the Technical Review phase</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="hover:bg-emerald-700/10 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-4 h-4 text-orange-600 mt-0.5">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Phase deadline soon</p>
                            <p className="text-xs text-gray-600">Initial Review Phase 3 ends in 2 days</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex space-x-2 w-full">
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
          </CardFooter>
        </Card>
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
