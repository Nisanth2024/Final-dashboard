import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useProfile } from "../lib/profileContext";
import { useEffect } from "react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const { profile, setProfile } = useProfile();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Local state for editing
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);

  useEffect(() => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditAvatar(profile.avatar);
  }, [profile]);

  // Avatar upload handler (local only)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEditAvatar(url);
    }
  };

  // Save handler (update global profile)
  const handleSave = () => {
    setProfile({ name: editName, email: editEmail, avatar: editAvatar });
    alert("Profile updated!");
  };

  // Sidebar navigation handlers
  const handleShowAllCandidates = () => navigate('/candidates');
  const handleShowInterviews = () => navigate('/interviews');
  const handleShowDashboard = () => navigate('/dashboard');
  const handleMenuClick = () => setIsSidebarOpen((open) => !open);

  return (
    <div className="w-full h-screen bg-gray-200">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header
          onMenuClick={handleMenuClick}
          onNotificationClick={() => {}}
          onAddPerson={() => {}}
          onCreateType={() => {}}
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
          onNotificationClick={() => {}}
        />
      </div>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[9999] flex md:hidden">
          <div className={`relative w-64 h-full z-50 bg-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar className="rounded-xl h-full bg-gray-200" onClose={() => setIsSidebarOpen(false)} onShowAllCandidates={handleShowAllCandidates} onShowInterviews={handleShowInterviews} onShowDashboard={handleShowDashboard} language={language} setLanguage={setLanguage} onAddPerson={() => {}} onNotificationClick={() => {}} />
          </div>
          <div className="flex-1 h-full bg-black/30 z-40" onClick={() => setIsSidebarOpen(false)}></div>
        </div>
      )}
      {/* Main Content Area */}
      <div className="md:pl-64 h-screen pt-10">
        <div className="h-full overflow-y-auto p-2 sm:p-3 md:p-4">
          <div className="flex flex-1 flex-col min-h-[calc(100vh-64px)] w-full max-w-none">
            <div className="flex items-center gap-2 mb-6 mt-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 p-0 rounded-full hover:bg-emerald-700"
                onClick={() => navigate(-1)}
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Typography variant="h1" size="lg" weight="bold" className="text-2xl md:text-3xl">
                Settings
              </Typography>
            </div>
            <Card className="rounded-2xl shadow bg-white p-0 border-none w-full">
              <CardHeader className="pb-2 pt-6 px-6">
                <CardTitle className="text-lg md:text-xl font-semibold">Account & Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 px-6 pb-8 pt-2 w-full">
                <Flex align="center" gap={4}>
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={editAvatar} />
                    <AvatarFallback className="text-xl">{editName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar-upload">
                      <Button
                        asChild
                        className="bg-black text-white hover:bg-emerald-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        <span>
                          <Upload className="inline w-4 h-4 mr-2" />
                          Change Photo
                        </span>
                      </Button>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </Label>
                  </div>
                </Flex>
                <Stack spacing={4}>
                  <div>
                    <Label htmlFor="name" className="mb-1 block text-sm font-medium">Name</Label>
                    <Input
                      id="name"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1 block text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="mb-1 block text-sm font-medium">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 bg-black text-white hover:bg-emerald-700 hover:text-white"
                      onClick={() => setShowPassword(v => !v)}
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </Button>
                  </div>
                </Stack>
                <Button
                  className="mt-4 bg-black text-white hover:bg-emerald-700 hover:text-white w-full py-2 rounded-lg font-semibold"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
