import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AddPersonModal } from "../components/AddPersonModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { useTranslation } from "@/lib/useTranslation";
import { 
  ArrowLeft, Settings, User, Users, Workflow, CreditCard, HelpCircle, Plus, Edit, Trash2, 
  Eye, EyeOff, Shield, Calendar, Zap, Bell, Lock, Key, FileText, 
  BarChart3, CreditCard as CreditCardIcon, AlertTriangle, CheckCircle, XCircle, 
  MoreHorizontal, Star, Crown, TrendingUp, Activity, Database, Globe, Moon, Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCandidates, type Candidate } from "./CandidatesPage";

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

  // Language and translation
  const t = useTranslation(language);

  // General settings state
  const [isLoading, setIsLoading] = useState(false);
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [timeZone, setTimeZone] = useState('UTC');
  const [dashboardLayout, setDashboardLayout] = useState('compact');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Profile settings state
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('john.doe@example.com');
  const [profileAvatar, setProfileAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const [password, setPassword] = useState('••••••••');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // Team & Roles
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', status: 'active' },
    { id: 2, name: 'Reviewer User', role: 'reviewer', email: 'reviewer@example.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', status: 'active' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('reviewer');

  // Workflow
  const [interviewStages, setInterviewStages] = useState([
    { id: 1, name: 'Round 1', description: 'Initial screening', active: true },
    { id: 2, name: 'Editing', description: 'Content review', active: true }
  ]);
  const [newStage, setNewStage] = useState('');
  const [newStageDescription, setNewStageDescription] = useState('');
  const [promptTemplates, setPromptTemplates] = useState([
    { id: 1, name: 'Default Template', description: 'Standard interview questions', active: true }
  ]);
  const [newPrompt, setNewPrompt] = useState('');
  const [evaluationCriteria, setEvaluationCriteria] = useState('Competencies, Duration');

  // Subscription
  const [plan, setPlan] = useState('PRO');
  const [usageLimit, setUsageLimit] = useState(100);
  const [currentUsage] = useState(45);

  // Integrations
  const [] = useState('Google');
  const [] = useState('••••••••••••••••');
  const [] = useState(false);

  // Dialog state for modals
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [planComparisonOpen, setPlanComparisonOpen] = useState(false);
  const [billingHistoryOpen, setBillingHistoryOpen] = useState(false);
  const [usageAnalyticsOpen, setUsageAnalyticsOpen] = useState(false);
  const [settingsExportOpen, setSettingsExportOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<number | null>(null);

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

  // Toggle sidebar open/close
  const handleMenuClick = () => setIsSidebarOpen((open) => !open)

  // Toggle notification panel open/close
  const handleNotificationClick = () => setIsNotificationOpen((open) => !open)

  // Toggle between showing one or all notifications
  const handleSeeAllNotifications = () => setShowAllNotifications(!showAllNotifications)

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

  const handleAddTeamMember = () => {
    if (newMemberName && newMemberEmail) {
      const newMember = {
        id: Date.now(),
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=150&h=150&fit=crop&crop=face`,
        status: 'active' as const
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberName('');
      setNewMemberEmail('');
      setNewMemberRole('reviewer');
    }
  };

  const handleAddStage = () => {
    if (newStage && newStageDescription) {
      const newStageObj = {
        id: Date.now(),
        name: newStage,
        description: newStageDescription,
        active: true
      };
      setInterviewStages([...interviewStages, newStageObj]);
      setNewStage('');
      setNewStageDescription('');
    }
  };

  const handleRemoveTeamMember = (id: number) => {
    setConfirmDeleteOpen(id);
  };

  const confirmDeleteMember = () => {
    if (confirmDeleteOpen) {
      setTeamMembers(teamMembers.filter(member => member.id !== confirmDeleteOpen));
      setConfirmDeleteOpen(null);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message or handle response
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
              // Handle candidate creation
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
          onAddPerson={() => {}}
          onNotificationClick={handleNotificationClick}
        />
      </div>
      {/* Mobile sidebar overlay (only on small screens) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[9999] flex md:hidden">
          <div className={`relative w-64 h-full z-50 bg-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar className="rounded-xl h-full bg-gray-200" onClose={() => setIsSidebarOpen(false)} onShowAllCandidates={handleShowAllCandidates} onShowInterviews={handleShowInterviews} onShowDashboard={handleShowDashboard} language={language} setLanguage={setLanguage} onAddPerson={() => {}} onNotificationClick={handleNotificationClick} />
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
                <Card className="max-w-6xl mx-auto p-4 w-full lg:pl-0 bg-gray-200 min-h-screen">
                  <CardContent className="p-0">
                    {/* Header */}
                    <Flex align="center" gap={3} className="mb-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 p-0 text-black hover:bg-emerald-700 hover:text-white"
                        aria-label="Back"
                        onClick={() => navigate('/dashboard')}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <Flex align="center" gap={2}>
                        <Settings className="w-6 h-6 text-emerald-700" />
                        <Typography variant="h1" size="2xl" weight="bold" className="text-2xl md:text-3xl font-bold text-gray-800">
                          {t.settings}
                        </Typography>
                      </Flex>
                    </Flex>

                    {/* Mobile Sheet for small screens */}
                    <div className="lg:hidden mb-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            <Typography variant="span" size="sm">Settings Menu</Typography>
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Settings</SheetTitle>
                            <SheetDescription>
                              Configure your application settings
                            </SheetDescription>
                          </SheetHeader>
                          <Stack spacing={2} className="mt-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start" onClick={() => (document.querySelector('[data-value="general"]') as HTMLButtonElement)?.click()}>
                              <Settings className="w-4 h-4 mr-2" />
                              <Typography variant="span" size="sm">General</Typography>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => (document.querySelector('[data-value="profile"]') as HTMLButtonElement)?.click()}>
                              <User className="w-4 h-4 mr-2" />
                              <Typography variant="span" size="sm">Profile</Typography>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => (document.querySelector('[data-value="team"]') as HTMLButtonElement)?.click()}>
                              <Users className="w-4 h-4 mr-2" />
                              <Typography variant="span" size="sm">Team & Roles</Typography>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => (document.querySelector('[data-value="workflow"]') as HTMLButtonElement)?.click()}>
                              <Workflow className="w-4 h-4 mr-2" />
                              <Typography variant="span" size="sm">Workflow</Typography>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => (document.querySelector('[data-value="subscription"]') as HTMLButtonElement)?.click()}>
                              <CreditCard className="w-4 h-4 mr-2" />
                              <Typography variant="span" size="sm">Subscription</Typography>
                            </Button>
                          </Stack>
                        </SheetContent>
                      </Sheet>
                    </div>

                    <Tabs defaultValue="general" className="w-full">
                      {/* Desktop Tabs */}
                      <TabsList className="hidden lg:flex mb-6 bg-white rounded-lg shadow border border-gray-200 p-1 h-auto">
                        <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-md">
                          <Settings className="w-4 h-4" />
                          <Typography variant="span" size="sm" className="hidden sm:inline">General</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-md">
                          <User className="w-4 h-4" />
                          <Typography variant="span" size="sm" className="hidden sm:inline">Profile</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-md">
                          <Users className="w-4 h-4" />
                          <Typography variant="span" size="sm" className="hidden sm:inline">Team & Roles</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="workflow" className="flex items-center gap-2 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-md">
                          <Workflow className="w-4 h-4" />
                          <Typography variant="span" size="sm" className="hidden sm:inline">Workflow</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="subscription" className="flex items-center gap-2 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-md">
                          <CreditCard className="w-4 h-4" />
                          <Typography variant="span" size="sm" className="hidden sm:inline">Subscription</Typography>
                        </TabsTrigger>
                      </TabsList>

                      {/* Mobile Tabs */}
                      <TabsList className="lg:hidden mb-4 flex flex-wrap gap-1 bg-white rounded-lg shadow border border-gray-200 p-2">
                        <TabsTrigger value="general" className="text-xs data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-2 py-1 rounded">
                          <Typography variant="span" size="xs">General</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="text-xs data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-2 py-1 rounded">
                          <Typography variant="span" size="xs">Profile</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="team" className="text-xs data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-2 py-1 rounded">
                          <Typography variant="span" size="xs">Team</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="workflow" className="text-xs data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-2 py-1 rounded">
                          <Typography variant="span" size="xs">Workflow</Typography>
                        </TabsTrigger>
                        <TabsTrigger value="subscription" className="text-xs data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-2 py-1 rounded">
                          <Typography variant="span" size="xs">Billing</Typography>
                        </TabsTrigger>
                      </TabsList>

                      <ScrollArea className="h-[calc(100vh-200px)]">
                        <TabsContent value="general" className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Card>
                              <CardHeader>
                                <Flex align="center" gap={2}>
                                  <Settings className="w-5 h-5 text-emerald-700" />
                                  <Typography variant="h3" size="lg" weight="semibold">
                                    General Application Settings
                                  </Typography>
                                </Flex>
                                <Typography variant="p" size="sm" color="muted">
                                  Configure basic application preferences and appearance
                                </Typography>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <Grid cols={2} gap={4} className="grid-cols-1 md:grid-cols-2 gap-4">
                                  <Stack spacing={2}>
                                    <Label htmlFor="dateFormat">Date Format</Label>
                                    <Select value={dateFormat} onValueChange={setDateFormat}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select format" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </Stack>
                                  <Stack spacing={2}>
                                    <Label htmlFor="timeZone">Time Zone</Label>
                                    <Select value={timeZone} onValueChange={setTimeZone}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select timezone" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="UTC">UTC</SelectItem>
                                        <SelectItem value="EST">EST</SelectItem>
                                        <SelectItem value="PST">PST</SelectItem>
                                        <SelectItem value="GMT">GMT</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </Stack>
                                </Grid>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 
