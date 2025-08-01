import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";
import { useTranslation } from "@/lib/useTranslation";
import { ArrowLeft } from "lucide-react";


interface SettingsPageProps {
  onBack?: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  // Language and translation
  const [language] = useState<'en' | 'es' | 'fr'>('en');
  const t = useTranslation(language);

  // General settings state
  const [darkMode, setDarkMode] = useState(false);
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [timeZone, setTimeZone] = useState('UTC');
  const [dashboardLayout, setDashboardLayout] = useState('compact');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Profile settings state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // Team & Roles
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Admin', role: 'admin' },
    { name: 'Reviewer', role: 'reviewer' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('reviewer');

  // Workflow
  const [interviewStages, setInterviewStages] = useState(['Round 1', 'Editing']);
  const [newStage, setNewStage] = useState('');
  const [promptTemplates, setPromptTemplates] = useState(['Default Template']);
  const [newPrompt, setNewPrompt] = useState('');
  const [evaluationCriteria, setEvaluationCriteria] = useState('Competencies, Duration');

  // Subscription
  const [plan, setPlan] = useState('Free');
  const [usageLimit, setUsageLimit] = useState(100);

  // Integrations
  const [calendarIntegration, setCalendarIntegration] = useState('Google');
  const [apiKey, setApiKey] = useState('');

  // Dialog state for modals
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4 w-full lg:pl-0 bg-gray-200 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 p-0 rounded-full bg-transparent text-black hover:bg-emerald-700 hover:text-white"
          aria-label="Back"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">{t.settings}</h1>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-1 bg-white rounded-lg shadow border border-gray-200 p-2">
          <TabsTrigger value="general" className="text-gray-700 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-lg">General</TabsTrigger>
          <TabsTrigger value="profile" className="text-gray-700 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-lg">Profile</TabsTrigger>
          <TabsTrigger value="team" className="text-gray-700 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-lg">Team & Roles</TabsTrigger>
          <TabsTrigger value="workflow" className="text-gray-700 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-lg">Interview/Workflow</TabsTrigger>
          <TabsTrigger value="subscription" className="text-gray-700 data-[state=active]:bg-emerald-700 data-[state=active]:text-white px-4 py-2 rounded-lg">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card className="p-4 mb-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="font-semibold text-base mb-2 text-gray-800">General Application Settings</div>
            <div className="space-y-2">
              {/* Removed Dark Mode option */}
              <div className="flex items-center gap-2">
                <span>Date Format</span>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span>Time Zone</span>
                <Input value={timeZone} onChange={e => setTimeZone(e.target.value)} className="min-w-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <span>Dashboard Layout</span>
                <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Removed Notifications option */}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card className="p-4 mb-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="font-semibold text-base mb-2 text-gray-800">User Profile Settings</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Name</span>
                <Input value={profileName} onChange={e => setProfileName(e.target.value)} className="min-w-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <span>Email</span>
                <Input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className="min-w-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <span>Avatar URL</span>
                <Input value={profileAvatar} onChange={e => setProfileAvatar(e.target.value)} className="min-w-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <span>Password</span>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="min-w-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <span>2FA Enabled</span>
                <Checkbox checked={twoFAEnabled} onCheckedChange={checked => setTwoFAEnabled(checked === true)} />
              </div>
              <Button className="mt-2 bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => setProfileDialogOpen(true)}>Edit Profile</Button>
            </div>
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Input value={profileName} onChange={e => setProfileName(e.target.value)} placeholder="Name" />
                  <Input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} placeholder="Email" />
                  <Input value={profileAvatar} onChange={e => setProfileAvatar(e.target.value)} placeholder="Avatar URL" />
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                  <Checkbox checked={twoFAEnabled} onCheckedChange={checked => setTwoFAEnabled(checked === true)}>Enable 2FA</Checkbox>
                </div>
                <DialogFooter>
                  <Button onClick={() => setProfileDialogOpen(false)}>Save</Button>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card className="p-4 mb-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="font-semibold text-base mb-2 text-gray-800">Team & Role Management</div>
            <div className="space-y-2">
              <ul className="list-disc ml-5 text-sm space-y-1">
                {teamMembers.map((member, idx) => (
                  <li key={idx}>{member.name} - {member.role}</li>
                ))}
              </ul>
              <Button className="mt-2 bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => setTeamDialogOpen(true)}>Add Member</Button>
            </div>
            <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Input value={newMemberName} onChange={e => setNewMemberName(e.target.value)} placeholder="Name" />
                  <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                    <SelectTrigger className="min-w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button className="bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => {
                    setTeamMembers([...teamMembers, { name: newMemberName, role: newMemberRole }]);
                    setNewMemberName('');
                    setNewMemberRole('reviewer');
                    setTeamDialogOpen(false);
                  }}>Add</Button>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>
        <TabsContent value="workflow">
          <Card className="p-4 mb-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="font-semibold text-base mb-2 text-gray-800">Interview/Workflow Settings</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Interview Stages</span>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {interviewStages.map((stage, idx) => (
                    <li key={idx}>{stage}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <Input value={newStage} onChange={e => setNewStage(e.target.value)} placeholder="Add stage" />
                <Button className="bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => {
                  if (newStage) setInterviewStages([...interviewStages, newStage]);
                  setNewStage('');
                }}>Add</Button>
              </div>
              <div className="flex items-center gap-2">
                <span>Prompt Templates</span>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {promptTemplates.map((prompt, idx) => (
                    <li key={idx}>{prompt}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <Input value={newPrompt} onChange={e => setNewPrompt(e.target.value)} placeholder="Add prompt" />
                <Button className="bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => {
                  if (newPrompt) setPromptTemplates([...promptTemplates, newPrompt]);
                  setNewPrompt('');
                }}>Add</Button>
              </div>
              <div className="flex items-center gap-2">
                <span>Evaluation Criteria</span>
                <Input value={evaluationCriteria} onChange={e => setEvaluationCriteria(e.target.value)} className="min-w-[120px]" />
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card className="p-4 mb-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="font-semibold text-base mb-2 text-gray-800">Subscription & Billing</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Plan</span>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="PRO">PRO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span>Usage Limit</span>
                <Input type="number" value={usageLimit} onChange={e => setUsageLimit(Number(e.target.value))} className="min-w-[120px]" />
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card className="p-4 mb-4">
            <div className="font-semibold text-base mb-2">Integrations</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Calendar Integration</span>
                <Select value={calendarIntegration} onValueChange={setCalendarIntegration}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="Select calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Outlook">Outlook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span>API Key</span>
                <Input value={apiKey} onChange={e => setApiKey(e.target.value)} className="min-w-[120px]" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}