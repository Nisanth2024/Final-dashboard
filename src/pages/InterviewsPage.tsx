import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AddPersonModal } from "../components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { HelpCircle, X, UserPlus, Clock, Calendar, Users, Filter, Plus, Edit, Eye, CheckCircle, AlertCircle, Star, MapPin, Phone, Mail, ExternalLink, Download, Upload, Settings, MoreHorizontal, ArrowLeft, Table } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCandidates, type Candidate } from "./CandidatesPage";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function InterviewsPage() {
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
  const [helpOpen, setHelpOpen] = useState(false);

  // Enhanced data structures
  type Interviewer = {
    id: number
    name: string
    email: string
    avatar: string
    department: string
    expertise: string[]
    availability: string[]
    rating: number
    interviewsConducted: number
  }

  type Interview = {
    id: number
    candidateId: number
    interviewerId: number
    position: string
    department: string
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
    date: string
    time: string
    duration: string
    stage: string
    progress: number
    rating?: number
    notes?: string
    feedback?: string
    meetingLink?: string
    location?: string
  }

  // Assigned interviewers data from InterviewsView
  const [interviewers] = useState<Interviewer[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      department: "Engineering Department",
      expertise: ["Frontend Development", "React", "TypeScript", "UI/UX"],
      availability: ["Monday", "Wednesday", "Friday"],
      rating: 4.8,
      interviewsConducted: 45
    },
    {
      id: 2,
      name: "Ryan King",
      email: "ryan.king@company.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      department: "Engineering Department",
      expertise: ["Backend Development", "Python", "Django", "Database Design"],
      availability: ["Tuesday", "Thursday", "Friday"],
      rating: 4.6,
      interviewsConducted: 32
    },
    {
      id: 3,
      name: "Sarah Miller",
      email: "sarah.miller@company.com",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      department: "Design Department",
      expertise: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
      availability: ["Monday", "Tuesday", "Thursday"],
      rating: 4.7,
      interviewsConducted: 38
    },
    {
      id: 4,
      name: "Priya Patel",
      email: "priya.patel@company.com",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      department: "Marketing Department",
      expertise: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      availability: ["Wednesday", "Thursday", "Friday"],
      rating: 4.9,
      interviewsConducted: 52
    },
    {
      id: 5,
      name: "Alex Lee",
      email: "alex.lee@company.com",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      department: "Sales Department",
      expertise: ["Sales Strategy", "CRM", "Lead Generation", "Negotiation"],
      availability: ["Monday", "Tuesday", "Wednesday"],
      rating: 4.5,
      interviewsConducted: 28
    },
    {
      id: 6,
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      department: "Engineering Department",
      expertise: ["Full Stack", "Node.js", "React", "AWS"],
      availability: ["Tuesday", "Thursday", "Friday"],
      rating: 4.8,
      interviewsConducted: 41
    },
    {
      id: 7,
      name: "David Kim",
      email: "david.kim@company.com",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      department: "Design Department",
      expertise: ["Product Design", "User Research", "Prototyping", "Design Systems"],
      availability: ["Monday", "Wednesday", "Friday"],
      rating: 4.6,
      interviewsConducted: 35
    },
    {
      id: 8,
      name: "Emily Chen",
      email: "emily.chen@company.com",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      department: "Marketing Department",
      expertise: ["Brand Strategy", "Social Media", "Campaign Management", "Analytics"],
      availability: ["Tuesday", "Thursday", "Friday"],
      rating: 4.7,
      interviewsConducted: 39
    }
  ]);

  // Enhanced interviews data with proper relationships
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      candidateId: 1,
      interviewerId: 1,
      position: "Senior Frontend Developer",
      department: "Engineering Department",
      status: "scheduled",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "45 minutes",
      stage: "Technical Round",
      progress: 75,
      rating: 4.2,
      notes: "Candidate shows strong React skills",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      location: "Virtual"
    },
    {
      id: 2,
      candidateId: 2,
      interviewerId: 2,
      position: "UI/UX Designer",
      department: "Design Department",
      status: "completed",
      date: "2024-01-14",
      time: "2:00 PM",
      duration: "60 minutes",
      stage: "Final Round",
      progress: 100,
      rating: 4.8,
      notes: "Excellent portfolio and communication skills",
      feedback: "Highly recommended for the position",
      location: "Office - Conference Room A"
    },
    {
      id: 3,
      candidateId: 3,
      interviewerId: 3,
      position: "Backend Developer",
      department: "Engineering Department",
      status: "scheduled",
      date: "2024-01-16",
      time: "11:30 AM",
      duration: "50 minutes",
      stage: "Initial Screening",
      progress: 25,
      meetingLink: "https://meet.google.com/xyz-uvw-rst",
      location: "Virtual"
    },
    {
      id: 4,
      candidateId: 4,
      interviewerId: 4,
      position: "Full Stack Developer",
      department: "Engineering Department",
      status: "cancelled",
      date: "2024-01-17",
      time: "3:00 PM",
      duration: "60 minutes",
      stage: "Technical Round",
      progress: 0,
      notes: "Candidate requested reschedule",
      location: "Virtual"
    },
    {
      id: 5,
      candidateId: 5,
      interviewerId: 1,
      position: "React Developer",
      department: "Engineering Department",
      status: "completed",
      date: "2024-01-13",
      time: "1:00 PM",
      duration: "45 minutes",
      stage: "Final Round",
      progress: 100,
      rating: 4.5,
      notes: "Strong technical skills, good cultural fit",
      feedback: "Ready for offer",
      location: "Office - Conference Room B"
    }
  ]);

  // Simple interview creation state (from InterviewsView)
  const [createOpen, setCreateOpen] = useState(false);
  const [interviewTitle, setInterviewTitle] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [roundType, setRoundType] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  // Simple interview type (from InterviewsView)
  type SimpleInterview = {
    title: string;
    date: string;
    time: string;
    interviewers: string[];
    candidates: string[];
    roundType: string;
    duration: string;
    instructions: string;
  };

  const [simpleInterviews, setSimpleInterviews] = useState<SimpleInterview[]>([]);

  // Default simple interviews (from InterviewsView)
  const defaultSimpleInterviews: SimpleInterview[] = [
    {
      title: "Frontend Developer - Technical Round",
      date: "2025-08-01",
      time: "10:00",
      interviewers: ["John Doe", "Sarah Miller"],
      candidates: ["Sarah Johnson", "Michael Chen"],
      roundType: "Technical",
      duration: "45 min",
      instructions: "Bring your laptop and portfolio."
    },
    {
      title: "Backend Developer - Screening",
      date: "2025-08-02",
      time: "14:00",
      interviewers: ["Ryan King", "Alex Lee"],
      candidates: ["Emily Rodriguez", "David Kim"],
      roundType: "Screening",
      duration: "30 min",
      instructions: "Prepare for algorithm questions."
    },
    {
      title: "UI/UX Designer - HR Round",
      date: "2025-08-03",
      time: "11:30",
      interviewers: ["Priya Patel"],
      candidates: ["Lisa Thompson"],
      roundType: "HR",
      duration: "20 min",
      instructions: "Discuss your design process."
    }
  ];

  // Initialize simple interviews
  useEffect(() => {
    setSimpleInterviews(defaultSimpleInterviews);
  }, []);

  // Simple interview handlers (from InterviewsView)
  const handleEditSimpleInterview = (index: number) => {
    const interviewToEdit = simpleInterviews[index];
    setInterviewTitle(interviewToEdit.title);
    setInterviewDate(interviewToEdit.date);
    setInterviewTime(interviewToEdit.time);
    setSelectedInterviewer(interviewToEdit.interviewers[0] || "");
    setSelectedCandidate(interviewToEdit.candidates[0] || "");
    setRoundType(interviewToEdit.roundType);
    setDuration(interviewToEdit.duration);
    setInstructions(interviewToEdit.instructions);
    setCreateOpen(true);
  };

    const handleDeleteSimpleInterview = (index: number) => {
    setSimpleInterviews(prev => prev.filter((_, i) => i !== index));
  };

  // Simple interviewers data (from InterviewsView)
  const simpleInterviewers = [
    { name: "John Doe", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Ryan King", img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Sarah Miller", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Priya Patel", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Alex Lee", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Maria Garcia", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "David Kim", img: "https://randomuser.me/api/portraits/men/23.jpg" },
    { name: "Emily Chen", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];
  
  // State for modals and UI
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [interviewDetailsModalOpen, setInterviewDetailsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [assignInterviewerModalOpen, setAssignInterviewerModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  
  // Form data for interview creation/editing
  const [interviewFormData, setInterviewFormData] = useState({
    candidateId: 1,
    interviewerId: 1,
    position: '',
    department: '',
    date: '',
    time: '',
    duration: '',
    stage: '',
    location: ''
  });

  // Helper functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case 'rescheduled':
        return <Badge variant="outline" className="text-orange-700"><Clock className="w-3 h-3 mr-1" />Rescheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Helper function to get candidate data
  const getCandidateById = (id: number) => {
    return candidates.find(candidate => candidate.id === id);
  };

  // Helper function to get interviewer data
  const getInterviewerById = (id: number) => {
    return interviewers.find(interviewer => interviewer.id === id);
  };

  // Interview management functions
  const handleScheduleInterview = () => {
    setScheduleModalOpen(true);
  };

  const handleViewInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    setInterviewDetailsModalOpen(true);
  };

  const handleEditInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    setInterviewFormData({
      candidateId: interview.candidateId,
      interviewerId: interview.interviewerId,
      position: interview.position,
      department: interview.department,
      date: interview.date,
      time: interview.time,
      duration: interview.duration ?? '',
      stage: interview.stage ?? '',
      location: interview.location ?? ''
    });
    setScheduleModalOpen(true);
  };

  const handleCancelInterview = (interviewId: number) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: 'cancelled' as const }
        : interview
    ));
  };

  const handleCompleteInterview = (interviewId: number) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: 'completed' as const, progress: 100 }
        : interview
    ));
  };

  const handleAssignInterviewer = (interviewId: number, interviewerId: number) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, interviewerId }
        : interview
    ));
  };

  const handleAddFeedback = (interviewId: number, feedback: string, rating: number) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, feedback, rating, status: 'completed' as const, progress: 100 }
        : interview
    ));
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
                key="interviews"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Enhanced Header Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={handleBackToDashboard} 
                        variant="ghost" 
                        className="p-2 hover:bg-emerald-700 rounded-full transition-colors w-9 h-9 flex items-center justify-center"
                        aria-label="Back to Dashboard"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                      </Button>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Interviews</h1>
                        <p className="text-gray-600">Manage and track interview schedules</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleScheduleInterview} 
                        className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                      >
                        <Plus className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Schedule Interview</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="p-1.5 bg-blue-100 rounded-lg mb-2">
                              <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-xl font-bold text-gray-900 mb-1">24</p>
                            <p className="text-xs font-medium text-gray-600">Total Interviews</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="p-1.5 bg-blue-100 rounded-lg mb-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-xl font-bold text-blue-600 mb-1">8</p>
                            <p className="text-xs font-medium text-gray-600">Scheduled</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="p-1.5 bg-green-100 rounded-lg mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xl font-bold text-green-600 mb-1">12</p>
                            <p className="text-xs font-medium text-gray-600">Completed</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="p-1.5 bg-orange-100 rounded-lg mb-2">
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                            </div>
                            <p className="text-xl font-bold text-orange-600 mb-1">4</p>
                            <p className="text-xs font-medium text-gray-600">Pending</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Interviews Table */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-700" />
                      Recent Interviews
                    </CardTitle>
                    <CardDescription>
                      Track interview progress and manage schedules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mobile View - Enhanced Cards */}
                      <div className="md:hidden space-y-4">
                        {interviews.map((interview, index) => {
                          const candidate = getCandidateById(interview.candidateId);
                          const interviewer = getInterviewerById(interview.interviewerId);
                          
                          if (!candidate || !interviewer) return null;
                          
                          return (
                            <motion.div
                              key={interview.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                        <AvatarFallback>{candidate.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{candidate.name}</p>
                                        <p className="text-sm text-gray-600">{interview.position}</p>
                                      </div>
                                    </div>
                                    {getStatusBadge(interview.status)}
                                  </div>
                                  
                                  <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span>{interview.date} at {interview.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <span>Interviewer: {interviewer.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="w-4 h-4 text-gray-500" />
                                      <span>{interview.duration} • {interview.stage}</span>
                                    </div>
                                    {interview.rating && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span>Rating: {interview.rating}/5.0</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span>{interview.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${interview.progress}%` }}></div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2 mt-3">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                                      onClick={() => handleViewInterview(interview)}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                                      onClick={() => handleEditInterview(interview)}
                                    >
                                      <Edit className="w-4 h-4 mr-1" />
                                      Edit
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      {/* Desktop View - Enhanced Table */}
                      <div className="hidden md:block">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-left px-4 py-2 font-medium">Candidate</th>
                                <th className="text-left px-4 py-2 font-medium">Position</th>
                                <th className="text-left px-4 py-2 font-medium">Interviewer</th>
                                <th className="text-left px-4 py-2 font-medium">Date & Time</th>
                                <th className="text-left px-4 py-2 font-medium">Status</th>
                                <th className="text-left px-4 py-2 font-medium">Rating</th>
                                <th className="text-left px-4 py-2 font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {interviews.map((interview, index) => {
                                const candidate = getCandidateById(interview.candidateId);
                                const interviewer = getInterviewerById(interview.interviewerId);
                                
                                if (!candidate || !interviewer) return null;
                                
                                return (
                                  <motion.tr
                                    key={interview.id}
                                    className="hover:bg-gray-50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <td className="px-4 py-2">
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                          <AvatarFallback>{candidate.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{candidate.name}</p>
                                          <p className="text-sm text-gray-600">{candidate.email}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2">
                                      <div>
                                        <p className="font-medium">{interview.position}</p>
                                        <p className="text-sm text-gray-600">{interview.department}</p>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                          <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                                          <AvatarFallback>{interviewer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{interviewer.name}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2">
                                      <span className="font-medium">{interview.date}</span>
                                      <span className="mx-2 text-gray-400">|</span>
                                      <span className="text-sm text-gray-600">{interview.time}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                      {getStatusBadge(interview.status)}
                                    </td>
                                    <td className="px-4 py-2">
                                      {interview.rating ? (
                                        <div className="flex items-center gap-1">
                                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                          <span className="text-sm font-medium">{interview.rating}</span>
                                        </div>
                                      ) : (
                                        <span className="text-sm text-gray-500 flex justify-center items-center w-full">-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-2">
                                      <div className="flex gap-1">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                                                onClick={() => handleViewInterview(interview)}
                                              >
                                                <Eye className="w-4 h-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>View Details</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                                                onClick={() => handleEditInterview(interview)}
                                              >
                                                <Edit className="w-4 h-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit Interview</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </td>
                                  </motion.tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Notification Panels - Same as SettingsPage */}
      {/* Mobile Notification Panel */}
      {isNotificationOpen && (
        <div className={`md:hidden fixed inset-y-0 right-0 z-[9999] transform transition-transform duration-300 ease-in-out ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="w-80 h-full bg-white shadow-lg flex flex-col">
            {/* Notification Panel Header */}
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsNotificationOpen(false)
                    setShowAllNotifications(false)
                  }}
                  className="p-2 bg-black text-white hover:bg-emerald-700 hover:text-white rounded-lg"
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
                    <p className="text-sm font-medium">Interview scheduled</p>
                    <p className="text-xs text-gray-600">Alex Johnson's interview is scheduled for tomorrow at 10:00 AM</p>
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
                        <p className="text-xs text-gray-600">Michael Chen has been added to the interview pipeline</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
                      <div className="w-4 h-4 text-orange-600 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Interview reminder</p>
                        <p className="text-xs text-gray-600">Emily Davis's interview starts in 30 minutes</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Notification Panel Footer */}
            <div className="p-4">
              <div className="flex space-x-2">
                <div>
                  <Button 
                    onClick={handleSeeAllNotifications}
                    className="flex-1 bg-black text-white hover:bg-emerald-700 hover:text-white text-xs py-2 px-3"
                  >
                    {showAllNotifications ? 'Show less' : 'See all notifications'}
                  </Button>
                </div>
                <div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-xs py-2 px-3 bg-black text-white hover:bg-emerald-700 hover:text-white"
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
        <div className="hidden md:block fixed top-20 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsNotificationOpen(false)
                  setShowAllNotifications(false)
                }}
                className="p-2 bg-black text-white hover:bg-emerald-700 hover:text-white rounded-lg"
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
                  <p className="text-sm font-medium">Interview scheduled</p>
                  <p className="text-xs text-gray-600">Alex Johnson's interview is scheduled for tomorrow at 10:00 AM</p>
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
                      <p className="text-xs text-gray-600">Michael Chen has been added to the interview pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-700">
                    <div className="w-4 h-4 text-orange-600 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Interview reminder</p>
                      <p className="text-xs text-gray-600">Emily Davis's interview starts in 30 minutes</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="flex space-x-2">
              <div>
                <Button 
                  onClick={handleSeeAllNotifications}
                  className="flex-1 bg-black text-white hover:bg-emerald-700 hover:text-white text-xs py-2 px-3"
                >
                  {showAllNotifications ? 'Show less' : 'See all notifications'}
                </Button>
              </div>
              <div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs py-2 px-3 bg-black text-white hover:bg-emerald-700 hover:text-white"
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
      
      {/* Schedule Interview Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl md:text-2xl font-semibold">
              {selectedInterview ? 'Edit Interview' : 'Schedule New Interview'}
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              {selectedInterview ? 'Update interview details' : 'Schedule a new interview with candidate and interviewer'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Candidate and Interviewer Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 min-w-0">
                <Label htmlFor="candidate" className="text-sm font-medium">Candidate</Label>
                <Select value={interviewFormData.candidateId.toString()} onValueChange={(value) => setInterviewFormData({...interviewFormData, candidateId: parseInt(value)})}>
                  <SelectTrigger className="h-10 md:h-11 w-full">
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent className="w-full min-w-[200px]">
                    {allCandidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id.toString()}>
                        <div className="flex items-center gap-2 w-full">
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback>{candidate.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{candidate.name} - {candidate.department}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="interviewer" className="text-sm font-medium">Interviewer</Label>
                <Select value={interviewFormData.interviewerId.toString()} onValueChange={(value) => setInterviewFormData({...interviewFormData, interviewerId: parseInt(value)})}>
                  <SelectTrigger className="h-10 md:h-11 w-full">
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent className="w-full min-w-[200px]">
                    {interviewers.map((interviewer) => (
                      <SelectItem key={interviewer.id} value={interviewer.id.toString()}>
                        <div className="flex items-center gap-2 w-full">
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            <AvatarImage src={interviewer.avatar} />
                            <AvatarFallback>{interviewer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{interviewer.name} - {interviewer.department}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Position and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 min-w-0">
                <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                <Input 
                  id="position"
                  value={interviewFormData.position} 
                  onChange={(e) => setInterviewFormData({...interviewFormData, position: e.target.value})}
                  placeholder="e.g., Senior Frontend Developer"
                  className="h-10 md:h-11 w-full"
                />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                <Select value={interviewFormData.department} onValueChange={(value) => setInterviewFormData({...interviewFormData, department: value})}>
                  <SelectTrigger className="h-10 md:h-11 w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="w-full min-w-[200px]">
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date, Time, and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                <Input 
                  id="date"
                  type="date"
                  value={interviewFormData.date} 
                  onChange={(e) => setInterviewFormData({...interviewFormData, date: e.target.value})}
                  className="h-10 md:h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                <Input 
                  id="time"
                  type="time"
                  value={interviewFormData.time} 
                  onChange={(e) => setInterviewFormData({...interviewFormData, time: e.target.value})}
                  className="h-10 md:h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium">Duration (minutes)</Label>
                <Input 
                  id="duration"
                  type="number"
                  value={interviewFormData.duration} 
                  onChange={(e) => setInterviewFormData({...interviewFormData, duration: e.target.value})}
                  placeholder="60"
                  className="h-10 md:h-11"
                />
              </div>
            </div>

            {/* Stage and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stage" className="text-sm font-medium">Stage</Label>
                <Select value={interviewFormData.stage} onValueChange={(value) => setInterviewFormData({...interviewFormData, stage: value})}>
                  <SelectTrigger className="h-10 md:h-11 w-full">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent className="w-full min-w-[200px]">
                    <SelectItem value="Initial Screening">Initial Screening</SelectItem>
                    <SelectItem value="Technical Round">Technical Round</SelectItem>
                    <SelectItem value="Final Round">Final Round</SelectItem>
                    <SelectItem value="HR Round">HR Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="location" className="text-sm font-medium">Location/Meeting Link</Label>
                <Input 
                  id="location"
                  value={interviewFormData.location} 
                  onChange={(e) => setInterviewFormData({...interviewFormData, location: e.target.value})}
                  placeholder="Office location or video call link"
                  className="h-10 md:h-11 w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-6">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={() => setScheduleModalOpen(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white flex-1 sm:flex-none"
                onClick={() => {
                  if (selectedInterview) {
                    // Update existing interview
                    const updatedInterview: Interview = {
                      ...selectedInterview,
                      candidateId: interviewFormData.candidateId,
                      interviewerId: interviewFormData.interviewerId,
                      position: interviewFormData.position,
                      department: interviewFormData.department,
                      date: interviewFormData.date,
                      time: interviewFormData.time,
                      duration: interviewFormData.duration,
                      stage: interviewFormData.stage,
                      location: interviewFormData.location
                    };
                    setInterviews(interviews.map(interview => 
                      interview.id === selectedInterview.id ? updatedInterview : interview
                    ));
                  } else {
                    // Create new interview
                    const newInterview: Interview = {
                      id: interviews.length + 1,
                      candidateId: interviewFormData.candidateId,
                      interviewerId: interviewFormData.interviewerId,
                      position: interviewFormData.position,
                      department: interviewFormData.department,
                      status: 'scheduled',
                      date: interviewFormData.date,
                      time: interviewFormData.time,
                      duration: interviewFormData.duration,
                      stage: interviewFormData.stage,
                      progress: 0,
                      location: interviewFormData.location
                    };
                    setInterviews([...interviews, newInterview]);
                  }
                  setScheduleModalOpen(false);
                  setSelectedInterview(null);
                  // Reset form data
                  setInterviewFormData({
                    candidateId: 1,
                    interviewerId: 1,
                    position: '',
                    department: '',
                    date: '',
                    time: '',
                    duration: '',
                    stage: '',
                    location: ''
                  });
                }}
              >
                {selectedInterview ? 'Update Interview' : 'Schedule Interview'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Interview Details Modal */}
      <Dialog open={interviewDetailsModalOpen} onOpenChange={setInterviewDetailsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription>
              View and manage interview information
            </DialogDescription>
          </DialogHeader>
          {selectedInterview && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Interview Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-medium">{selectedInterview.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedInterview.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{selectedInterview.date} at {selectedInterview.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedInterview.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stage:</span>
                      <Badge variant="outline">{selectedInterview.stage}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedInterview.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{selectedInterview.progress}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Participants</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={getCandidateById(selectedInterview.candidateId)?.avatar} />
                        <AvatarFallback>{getCandidateById(selectedInterview.candidateId)?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getCandidateById(selectedInterview.candidateId)?.name}</p>
                        <p className="text-sm text-gray-600">{getCandidateById(selectedInterview.candidateId)?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={getInterviewerById(selectedInterview.interviewerId)?.avatar} />
                        <AvatarFallback>{getInterviewerById(selectedInterview.interviewerId)?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getInterviewerById(selectedInterview.interviewerId)?.name}</p>
                        <p className="text-sm text-gray-600">{getInterviewerById(selectedInterview.interviewerId)?.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleEditInterview(selectedInterview)}
                    className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Interview
                  </Button>
                  <Button 
                    onClick={() => handleCompleteInterview(selectedInterview.id)}
                    variant="outline"
                    className="text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button 
                    onClick={() => handleCancelInterview(selectedInterview.id)}
                    variant="outline"
                    className="text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Interview
                  </Button>
                  <Button 
                    onClick={() => setAssignInterviewerModalOpen(true)}
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Assign Interviewer
                  </Button>
                  <Button 
                    onClick={() => setFeedbackModalOpen(true)}
                    variant="outline"
                    className="text-purple-600 hover:bg-purple-600 hover:text-white"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Add Feedback
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setInterviewDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Interviewer Modal */}
      <Dialog open={assignInterviewerModalOpen} onOpenChange={setAssignInterviewerModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Interviewer</DialogTitle>
            <DialogDescription>
              Select a new interviewer for this interview
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="interviewer">Interviewer</Label>
              <Select onValueChange={(value) => handleAssignInterviewer(selectedInterview?.id || 0, parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {interviewers.map((interviewer) => (
                    <SelectItem key={interviewer.id} value={interviewer.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={interviewer.avatar} />
                          <AvatarFallback>{interviewer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{interviewer.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignInterviewerModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 hover:text-white"
              onClick={() => setAssignInterviewerModalOpen(false)}
            >
              Assign Interviewer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
            <DialogDescription>
              Provide feedback and rating for this interview
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select onValueChange={(value) => setFeedbackRating(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Poor</SelectItem>
                  <SelectItem value="2">2 - Fair</SelectItem>
                  <SelectItem value="3">3 - Good</SelectItem>
                  <SelectItem value="4">4 - Very Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea 
                id="feedback"
                placeholder="Provide detailed feedback about the interview..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 hover:text-white"
              onClick={() => {
                if (selectedInterview && feedbackText && feedbackRating) {
                  handleAddFeedback(selectedInterview.id, feedbackText, feedbackRating);
                  setFeedbackText('');
                  setFeedbackRating(0);
                  setFeedbackModalOpen(false);
                }
              }}
            >
              Add Feedback
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
            Add, view, or edit private notes related to interviews, candidates, or interviewers.
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
                className="bg-black text-white px-3 py-1 hover:bg-emerald-700 hover:text-white text-xs"
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
                <Button variant="outline" className="text-xs px-3 py-1 rounded bg-black text-white hover:bg-emerald-700 hover:text-white">
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
              <li>How to schedule an interview</li>
              <li>How to manage interview stages</li>
              <li>How to track interview progress</li>
              <li>Contact support</li>
            </ul>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <div>
                <Button variant="outline" className="text-xs px-3 py-1 rounded bg-black text-white hover:bg-emerald-700 hover:text-white">
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Simple Interview Creation Modal (from InterviewsView) */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Interview Title (e.g., Junior Frontend Developer - Round 1)"
              value={interviewTitle}
              onChange={e => setInterviewTitle(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Date"
                value={interviewDate}
                onChange={e => setInterviewDate(e.target.value)}
                required
              />
              <Input
                type="time"
                placeholder="Time"
                value={interviewTime}
                onChange={e => setInterviewTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="block text-xs font-medium mb-1">Interviewers</Label>
              <Select value={selectedInterviewer} onValueChange={setSelectedInterviewer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {simpleInterviewers.map((user) => (
                    <SelectItem key={user.name} value={user.name}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="block text-xs font-medium mb-1">Candidates</Label>
              <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  {allCandidates.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="block text-xs font-medium mb-1">Round Type</Label>
              <Select value={roundType} onValueChange={setRoundType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select round type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Screening">Screening</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Duration (e.g., 30 min)"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
            />
            <Textarea
              placeholder="Instructions (optional guidelines or documents)"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setSimpleInterviews(prev => [
                ...prev,
                {
                  title: interviewTitle,
                  date: interviewDate,
                  time: interviewTime,
                  interviewers: selectedInterviewer ? [selectedInterviewer] : [],
                  candidates: selectedCandidate ? [selectedCandidate] : [],
                  roundType,
                  duration,
                  instructions,
                }
              ]);
              setCreateOpen(false);
              setInterviewTitle("");
              setInterviewDate("");
              setInterviewTime("");
              setSelectedInterviewer("");
              setSelectedCandidate("");
              setRoundType("");
              setDuration("");
              setInstructions("");
            }} className="hover:bg-emerald-700">
              Create
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" className="hover:bg-emerald-700">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                        </div>
  );
} 
 