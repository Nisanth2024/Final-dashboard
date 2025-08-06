import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Grid } from "./ui/grid";
import { Flex } from "./ui/flex";
import { Stack } from "./ui/stack";
import { Typography } from "./ui/typography";
import { useTranslation } from "@/lib/useTranslation";
import { 
  ArrowLeft, Settings, User, Users, Workflow, CreditCard, HelpCircle, Plus, Edit, Trash2, 
  Eye, EyeOff, Shield, Calendar, Zap, Bell, Lock, Key, FileText, 
  BarChart3, CreditCard as CreditCardIcon, AlertTriangle, CheckCircle, XCircle, 
  MoreHorizontal, Star, Crown, TrendingUp, Activity, Database, Globe, Moon, Sun
} from "lucide-react";

interface SettingsPageProps {
  onBack?: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  // Language and translation
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
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
    <div className="max-w-6xl mx-auto p-4 w-full lg:pl-0 bg-gray-200 min-h-screen">
      {/* Header */}
      <Flex align="center" gap={3} className="mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 p-0 text-black hover:bg-emerald-700 hover:text-white"
          aria-label="Back"
          onClick={onBack}
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
                          <SelectItem value="EST">Eastern Time</SelectItem>
                          <SelectItem value="PST">Pacific Time</SelectItem>
                          <SelectItem value="GMT">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={theme} onValueChange={(value: 'light' | 'dark' | 'auto') => setTheme(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="dashboardLayout">Dashboard Layout</Label>
                <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                        <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
                    </Stack>
                  </Grid>

                  <Separator />

                  <Stack spacing={4}>
                    <Typography variant="h4" size="sm" weight="semibold">
                      Notifications
                    </Typography>
                    <Stack spacing={3}>
                      <Flex align="center" justify="between">
                        <div>
                          <Typography variant="p" size="sm" weight="medium">
                            Enable Notifications
                          </Typography>
                          <Typography variant="p" size="xs" color="muted">
                            Receive notifications about important updates
                          </Typography>
                        </div>
                        <Checkbox
                          checked={notificationsEnabled}
                          onCheckedChange={(checked) => setNotificationsEnabled(checked as boolean)}
                        />
                      </Flex>
                      <Flex align="center" justify="between">
                        <div>
                          <Typography variant="p" size="sm" weight="medium">
                            Email Notifications
                          </Typography>
                          <Typography variant="p" size="xs" color="muted">
                            Receive notifications via email
                          </Typography>
                        </div>
                        <Checkbox
                          checked={emailNotifications}
                          onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
                        />
                      </Flex>
                      <Flex align="center" justify="between">
                        <div>
                          <Typography variant="p" size="sm" weight="medium">
                            Push Notifications
                          </Typography>
                          <Typography variant="p" size="xs" color="muted">
                            Receive push notifications in browser
                          </Typography>
              </div>
                        <Checkbox
                          checked={pushNotifications}
                          onCheckedChange={(checked) => setPushNotifications(checked as boolean)}
                        />
                      </Flex>
                    </Stack>
                  </Stack>

                  <Separator />

                  <Stack spacing={4}>
                    <Typography variant="h4" size="sm" weight="semibold">
                      Auto-Save
                    </Typography>
                    <Flex align="center" justify="between">
                      <div>
                        <Typography variant="p" size="sm" weight="medium">
                          Enable Auto-Save
                        </Typography>
                        <Typography variant="p" size="xs" color="muted">
                          Automatically save changes every 30 seconds
                        </Typography>
            </div>
                      <Checkbox
                        checked={autoSave}
                        onCheckedChange={(checked) => setAutoSave(checked as boolean)}
                      />
                    </Flex>
                  </Stack>

                  <Flex justify="end">
                    <Button onClick={handleSaveSettings} disabled={isLoading}>
                      <Typography variant="span" size="sm">
                        {isLoading ? 'Saving...' : 'Save Settings'}
                      </Typography>
                    </Button>
                  </Flex>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <Flex align="center" gap={2}>
                    <User className="w-5 h-5 text-emerald-700" />
                    <Typography variant="h3" size="lg" weight="semibold">
                      User Profile Settings
                    </Typography>
                  </Flex>
                  <Typography variant="p" size="sm" color="muted">
                    Manage your personal information and security settings
                  </Typography>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Avatar Section */}
                  <Flex align="center" gap={4}>
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileAvatar} alt={profileName} />
                      <AvatarFallback>{profileName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Stack spacing={2}>
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <Flex gap={2}>
                        <Input 
                          id="avatar" 
                          value={profileAvatar} 
                          onChange={e => setProfileAvatar(e.target.value)} 
                          placeholder="Avatar URL"
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">Upload</Button>
                      </Flex>
                    </Stack>
                  </Flex>

                  <Separator />

                  {/* Profile Information */}
                  <Grid cols={2} gap={4} className="grid-cols-1 md:grid-cols-2 gap-4">
                    <Stack spacing={2}>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileName} 
                        onChange={e => setProfileName(e.target.value)} 
                        placeholder="Enter your full name"
                      />
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileEmail} 
                        onChange={e => setProfileEmail(e.target.value)} 
                        placeholder="Enter your email"
                      />
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="password">Password</Label>
                      <Flex className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          value={password} 
                          onChange={e => setPassword(e.target.value)} 
                          placeholder="Enter your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </Flex>
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="2fa">Two-Factor Authentication</Label>
                      <Flex align="center" gap={2}>
                        <Checkbox 
                          id="2fa" 
                          checked={twoFAEnabled} 
                          onCheckedChange={checked => setTwoFAEnabled(checked === true)} 
                        />
                        <Typography variant="p" size="sm" color="muted">Enable 2FA</Typography>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add an extra layer of security to your account</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Flex>
                    </Stack>
                  </Grid>

                  <Flex gap={2}>
                    <Button 
                      onClick={() => setProfileDialogOpen(true)}
                      className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Edit Profile</Typography>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSecurityDialogOpen(true)}
                      className="hover:bg-emerald-700 hover:text-white"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Security Settings</Typography>
                    </Button>
                  </Flex>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <Flex align="center" gap={2}>
                    <Users className="w-5 h-5 text-emerald-700" />
                    <Typography variant="h3" size="lg" weight="semibold">
                      Team & Role Management
                    </Typography>
                  </Flex>
                  <Typography variant="p" size="sm" color="muted">
                    Manage team members and their roles in the application
                  </Typography>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Flex justify="between" align="center">
                    <Typography variant="h4" size="sm" weight="semibold">
                      Team Members
                    </Typography>
                    <Button 
                      onClick={() => setTeamDialogOpen(true)}
                      className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Add Member</Typography>
                    </Button>
                  </Flex>

                  <Stack spacing={3}>
                    {teamMembers.map((member) => (
                      <Flex key={member.id} align="center" justify="between" className="p-3 bg-gray-50 rounded-lg">
                        <Flex align="center" gap={3}>
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <Stack spacing={1}>
                            <Typography variant="p" size="sm" weight="medium">
                              {member.name}
                            </Typography>
                            <Typography variant="p" size="xs" color="muted">
                              {member.email}
                            </Typography>
                          </Stack>
                        </Flex>
                        <Flex align="center" gap={2}>
                          <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                            {member.role}
                          </Badge>
                          <Badge variant={member.status === 'active' ? 'default' : 'destructive'}>
                            {member.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveTeamMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </Flex>
                      </Flex>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <Flex align="center" gap={2}>
                    <Workflow className="w-5 h-5 text-emerald-700" />
                    <Typography variant="h3" size="lg" weight="semibold">
                      Interview Workflow Settings
                    </Typography>
                  </Flex>
                  <Typography variant="p" size="sm" color="muted">
                    Configure interview stages, templates, and evaluation criteria
                  </Typography>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interview Stages */}
                  <Stack spacing={4}>
                    <Flex justify="between" align="center">
                      <Typography variant="h4" size="sm" weight="semibold">
                        Interview Stages
                      </Typography>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setWorkflowDialogOpen(true)}
                        className="hover:bg-emerald-700 hover:text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <Typography variant="span" size="sm">Add Stage</Typography>
                      </Button>
                    </Flex>
                    <Grid cols={2} gap={3} className="grid-cols-1 md:grid-cols-2 gap-3">
                      {interviewStages.map((stage) => (
                        <Flex key={stage.id} align="center" justify="between" className="p-3 bg-gray-50 rounded-lg">
                          <Stack spacing={1}>
                            <Typography variant="p" size="sm" weight="medium">
                              {stage.name}
                            </Typography>
                            <Typography variant="p" size="xs" color="muted">
                              {stage.description}
                            </Typography>
                          </Stack>
                          <Badge variant={stage.active ? 'default' : 'secondary'}>
                            {stage.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </Flex>
                      ))}
                    </Grid>
                  </Stack>

                  <Separator />

                  {/* Prompt Templates */}
                  <Stack spacing={4}>
                    <Typography variant="h4" size="sm" weight="semibold">
                      Prompt Templates
                    </Typography>
                    <Stack spacing={3}>
                      {promptTemplates.map((template) => (
                        <Flex key={template.id} align="center" justify="between" className="p-3 bg-gray-50 rounded-lg">
                          <Stack spacing={1}>
                            <Typography variant="p" size="sm" weight="medium">
                              {template.name}
                            </Typography>
                            <Typography variant="p" size="xs" color="muted">
                              {template.description}
                            </Typography>
                          </Stack>
                          <Badge variant={template.active ? 'default' : 'secondary'}>
                            {template.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </Flex>
                      ))}
                    </Stack>
                    <Flex gap={2}>
                      <Input 
                        value={newPrompt} 
                        onChange={e => setNewPrompt(e.target.value)} 
                        placeholder="Template name"
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => {
                          if (newPrompt) {
                            setPromptTemplates([...promptTemplates, { 
                              id: promptTemplates.length + 1, 
                              name: newPrompt, 
                              description: 'New template', 
                              active: true 
                            }]);
                            setNewPrompt('');
                          }
                        }}
                      >
                        <Typography variant="span" size="sm">Add</Typography>
                      </Button>
                    </Flex>
                  </Stack>

                  <Separator />

                  {/* Evaluation Criteria */}
                  <Stack spacing={2}>
                    <Label htmlFor="evaluationCriteria">Evaluation Criteria</Label>
                    <Input 
                      id="evaluationCriteria" 
                      value={evaluationCriteria} 
                      onChange={e => setEvaluationCriteria(e.target.value)} 
                      placeholder="Enter evaluation criteria"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <Flex align="center" gap={2}>
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                    <Typography variant="h3" size="lg" weight="semibold">
                      Subscription & Billing
                    </Typography>
                  </Flex>
                  <Typography variant="p" size="sm" color="muted">
                    Manage your subscription plan and usage limits
                  </Typography>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                                     <Flex direction="col" align="start" className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                    <Flex align="center" justify="between">
                      <Stack spacing={1}>
                        <Typography variant="h4" size="lg" weight="semibold" className="text-emerald-800">
                          {plan} Plan
                        </Typography>
                        <Typography variant="p" size="sm" className="text-emerald-600">
                          Active subscription
                        </Typography>
                      </Stack>
                      <Badge variant="default" className="bg-emerald-700">
                        <Zap className="w-3 h-3 mr-1" />
                        <Typography variant="span" size="sm">Active</Typography>
                      </Badge>
                    </Flex>
                  </Flex>

                  <Grid cols={2} gap={4} className="grid-cols-1 md:grid-cols-2 gap-4">
                    <Stack spacing={2}>
                      <Label htmlFor="plan">Current Plan</Label>
                      <Select value={plan} onValueChange={setPlan}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="PRO">PRO</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </Stack>
                    <Stack spacing={2}>
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input 
                        id="usageLimit" 
                        type="number" 
                        value={usageLimit} 
                        onChange={e => setUsageLimit(Number(e.target.value))} 
                      />
                    </Stack>
                  </Grid>

                  {/* Usage Progress */}
                  <Stack spacing={2}>
                    <Flex justify="between" className="text-sm">
                      <Typography variant="p" size="sm" color="muted">
                        Current Usage
                      </Typography>
                      <Typography variant="p" size="sm">
                        {currentUsage} / {usageLimit}
                      </Typography>
                    </Flex>
                    <Progress 
                      value={(currentUsage / usageLimit) * 100} 
                      className="h-2"
                    />
                  </Stack>

                  <Flex gap={2}>
                    <Button 
                      onClick={() => setPlanComparisonOpen(true)}
                      className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Upgrade Plan</Typography>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setBillingHistoryOpen(true)}
                      className="hover:bg-emerald-700 hover:text-white"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Billing History</Typography>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setUsageAnalyticsOpen(true)}
                      className="hover:bg-emerald-700 hover:text-white"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <Typography variant="span" size="sm">Usage Analytics</Typography>
                    </Button>
                  </Flex>
                </CardContent>
          </Card>
            </motion.div>
        </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Profile Dialog */}
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" value={profileName} onChange={e => setProfileName(e.target.value)} />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="dialog-email">Email</Label>
              <Input id="dialog-email" type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="dialog-avatar">Avatar URL</Label>
              <Input id="dialog-avatar" value={profileAvatar} onChange={e => setProfileAvatar(e.target.value)} />
            </Stack>
                <Stack spacing={2}>
              <Label htmlFor="dialog-password">Password</Label>
              <Input id="dialog-password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Stack>
            <Flex align="center" gap={2}>
              <Checkbox id="dialog-2fa" checked={twoFAEnabled} onCheckedChange={checked => setTwoFAEnabled(checked === true)} />
              <Label htmlFor="dialog-2fa">Enable 2FA</Label>
            </Flex>
                </Stack>
                <DialogFooter>
            <Button onClick={() => setProfileDialogOpen(false)}>Save Changes</Button>
                  <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

      {/* Team Member Dialog */}
            <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Label htmlFor="member-name">Name</Label>
              <Input id="member-name" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="member-email">Email</Label>
              <Input id="member-email" type="email" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} />
            </Stack>
                <Stack spacing={2}>
              <Label htmlFor="member-role">Role</Label>
                  <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
            </Stack>
                </Stack>
                <DialogFooter>
            <Button onClick={handleAddTeamMember}>Add Member</Button>
                  <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

      {/* Workflow Dialog */}
      <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Interview Stage</DialogTitle>
          </DialogHeader>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Label htmlFor="stage-name">Stage Name</Label>
              <Input id="stage-name" value={newStage} onChange={e => setNewStage(e.target.value)} />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="stage-description">Description</Label>
              <Input id="stage-description" value={newStageDescription} onChange={e => setNewStageDescription(e.target.value)} />
            </Stack>
              </Stack>
          <DialogFooter>
            <Button onClick={handleAddStage}>Add Stage</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Security Settings Dialog */}
      <Dialog open={securityDialogOpen} onOpenChange={setSecurityDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <Flex align="center" gap={2}>
              <Shield className="w-5 h-5 text-emerald-700" />
              <Typography variant="h3" size="lg" weight="semibold">
                Security Settings
              </Typography>
            </Flex>
            <DialogDescription>
              Configure your account security preferences and two-factor authentication
            </DialogDescription>
          </DialogHeader>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </Stack>
            <Stack spacing={2}>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </Stack>
            <Flex align="center" gap={2}>
              <Checkbox id="2fa-security" checked={twoFAEnabled} onCheckedChange={checked => setTwoFAEnabled(checked === true)} />
              <Label htmlFor="2fa-security">Enable Two-Factor Authentication</Label>
            </Flex>
            <Stack spacing={2}>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
            </Stack>
          </Stack>
          <DialogFooter>
            <Button 
              onClick={() => setSecurityDialogOpen(false)}
              className="bg-black text-white hover:bg-emerald-700 hover:text-white"
            >
              Save Security Settings
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700 hover:text-white">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Comparison Dialog */}
      <Dialog open={planComparisonOpen} onOpenChange={setPlanComparisonOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <Flex align="center" gap={2}>
              <Crown className="w-5 h-5 text-emerald-700" />
              <Typography variant="h3" size="lg" weight="semibold">
                Plan Comparison
              </Typography>
            </Flex>
            <DialogDescription>
              Compare features across different subscription plans
            </DialogDescription>
          </DialogHeader>
          <Grid cols={3} gap={4} className="grid-cols-1 md:grid-cols-3 gap-4">
                         <Flex direction="col" align="start" className="border rounded-lg p-4">
               <Typography variant="h4" size="lg" weight="semibold" className="mb-2">
                 Free
               </Typography>
               <Typography variant="p" size="2xl" weight="bold" className="mb-4">$0<Typography variant="span" size="sm" className="text-gray-500">/month</Typography></Typography>
               <Stack spacing={1} className="space-y-2 text-sm">
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />Basic features</Flex>
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />5 candidates</Flex>
                 <Flex align="center" gap={2}><XCircle className="w-4 h-4 text-gray-400" />Advanced analytics</Flex>
               </Stack>
             </Flex>
                         <Flex direction="col" align="start" className="border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50">
               <Typography variant="h4" size="lg" weight="semibold" className="mb-2">
                 PRO
               </Typography>
               <Typography variant="p" size="2xl" weight="bold" className="mb-4">$29<Typography variant="span" size="sm" className="text-gray-500">/month</Typography></Typography>
               <Stack spacing={1} className="space-y-2 text-sm">
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />All Free features</Flex>
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />Unlimited candidates</Flex>
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />Advanced analytics</Flex>
               </Stack>
             </Flex>
             <Flex direction="col" align="start" className="border rounded-lg p-4">
               <Typography variant="h4" size="lg" weight="semibold" className="mb-2">
                 Enterprise
               </Typography>
               <Typography variant="p" size="2xl" weight="bold" className="mb-4">$99<Typography variant="span" size="sm" className="text-gray-500">/month</Typography></Typography>
               <Stack spacing={1} className="space-y-2 text-sm">
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />All PRO features</Flex>
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />Custom integrations</Flex>
                 <Flex align="center" gap={2}><CheckCircle className="w-4 h-4 text-green-500" />Priority support</Flex>
                 </Stack>
             </Flex>
          </Grid>
          <DialogFooter>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 hover:text-white"
            >
              Upgrade to PRO
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700 hover:text-white">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Billing History Dialog */}
      <Dialog open={billingHistoryOpen} onOpenChange={setBillingHistoryOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <Flex align="center" gap={2}>
              <CreditCardIcon className="w-5 h-5 text-emerald-700" />
              <Typography variant="h3" size="lg" weight="semibold">
                Billing History
              </Typography>
            </Flex>
            <DialogDescription>
              View your past transactions and invoices
            </DialogDescription>
          </DialogHeader>
          <Stack spacing={3} className="max-h-96 overflow-y-auto">
            <Flex align="center" justify="between" className="p-3 border rounded-lg">
              <Stack spacing={1}>
                <Typography variant="p" size="sm" weight="medium">
                  PRO Plan - Monthly
                </Typography>
                <Typography variant="p" size="sm" className="text-gray-500">
                  August 1, 2025
                </Typography>
              </Stack>
              <Stack spacing={1} align="end">
                <Typography variant="p" size="sm" weight="medium">
                  $29.00
                </Typography>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </Stack>
            </Flex>
            <Flex align="center" justify="between" className="p-3 border rounded-lg">
              <Stack spacing={1}>
                <Typography variant="p" size="sm" weight="medium">
                  PRO Plan - Monthly
                </Typography>
                <Typography variant="p" size="sm" className="text-gray-500">
                  July 1, 2025
                </Typography>
              </Stack>
              <Stack spacing={1} align="end">
                <Typography variant="p" size="sm" weight="medium">
                  $29.00
                </Typography>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </Stack>
            </Flex>
            <Flex align="center" justify="between" className="p-3 border rounded-lg">
              <Stack spacing={1}>
                <Typography variant="p" size="sm" weight="medium">
                  PRO Plan - Monthly
                </Typography>
                <Typography variant="p" size="sm" className="text-gray-500">
                  June 1, 2025
                </Typography>
              </Stack>
              <Stack spacing={1} align="end">
                <Typography variant="p" size="sm" weight="medium">
                  $29.00
                </Typography>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </Stack>
            </Flex>
          </Stack>
          <DialogFooter>
            <Button 
              variant="outline"
              className="hover:bg-emerald-700 hover:text-white"
            >
              Export History
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700 hover:text-white">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Usage Analytics Dialog */}
      <Dialog open={usageAnalyticsOpen} onOpenChange={setUsageAnalyticsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <Flex align="center" gap={2}>
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              <Typography variant="h3" size="lg" weight="semibold">
                Usage Analytics
              </Typography>
            </Flex>
            <DialogDescription>
              Detailed usage statistics and analytics
            </DialogDescription>
          </DialogHeader>
          <Stack spacing={4}>
            <Grid cols={2} gap={4} className="grid-cols-2 gap-4">
                             <Flex direction="col" align="start" className="p-4 border rounded-lg">
                 <Typography variant="p" size="sm" className="text-gray-500">
                   Candidates Added
                 </Typography>
                 <Typography variant="p" size="2xl" weight="bold" className="text-emerald-700">
                   24
                 </Typography>
                 <Typography variant="p" size="xs" className="text-green-500">
                   +12% from last month
                 </Typography>
               </Flex>
               <Flex direction="col" align="start" className="p-4 border rounded-lg">
                 <Typography variant="p" size="sm" className="text-gray-500">
                   Interviews Conducted
                 </Typography>
                 <Typography variant="p" size="2xl" weight="bold" className="text-emerald-700">
                   18
                 </Typography>
                 <Typography variant="p" size="xs" className="text-green-500">
                   +8% from last month
                 </Typography>
               </Flex>
            </Grid>
            <Stack spacing={2}>
              <Flex justify="between" className="text-sm">
                <Typography variant="p" size="sm" color="muted">
                  Storage Used
                </Typography>
                <Typography variant="p" size="sm">
                  45%
                </Typography>
              </Flex>
              <Progress value={45} className="h-2" />
            </Stack>
            <Stack spacing={2}>
              <Flex justify="between" className="text-sm">
                <Typography variant="p" size="sm" color="muted">
                  API Calls
                </Typography>
                <Typography variant="p" size="sm">
                  1,234 / 10,000
                </Typography>
              </Flex>
              <Progress value={12} className="h-2" />
            </Stack>
          </Stack>
          <DialogFooter>
            <Button 
              variant="outline"
              className="hover:bg-emerald-700 hover:text-white"
            >
              Export Report
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700 hover:text-white">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen !== null} onOpenChange={() => setConfirmDeleteOpen(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <Flex align="center" gap={2}>
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <Typography variant="h3" size="lg" weight="semibold">
                Confirm Deletion
              </Typography>
            </Flex>
            <DialogDescription>
              Are you sure you want to remove this team member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={confirmDeleteMember}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete Member
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700 hover:text-white">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}