import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flex } from "@/components/ui/flex"
import { Stack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Users, Settings, X, LogOut, Bell, UserPlus, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useProfile } from "../lib/profileContext";

interface SidebarProps {
  onClose?: () => void
  className?: string
  onShowAllCandidates?: () => void
  onShowInterviews?: () => void
  onShowDashboard?: () => void
  language: 'en' | 'es' | 'fr'
  setLanguage: (lang: 'en' | 'es' | 'fr') => void
  onAddPerson?: () => void
  onNotificationClick?: () => void
}

export function Sidebar({ onClose, className = "", language, onAddPerson, onNotificationClick }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation(language);
  const { profile, setProfile } = useProfile();
  const [proModalOpen, setProModalOpen] = useState(false)
  const [departments, setDepartments] = useState([
    { name: t.departments + " 1", color: "#a78bfa" },
    { name: t.departments + " 2", color: "#fb923c" }
  ])
  const [addDeptOpen, setAddDeptOpen] = useState(false)
  const [newDeptName, setNewDeptName] = useState("")
  const [newDeptColor, setNewDeptColor] = useState("#22d3ee")
  const [] = useState(false)
  // Add state for user authentication
  // Remove Popover logic for user profile. Instead, use a Dialog that opens when the user clicks the profile area.
  // Add state for profile modal open
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Navigation handlers
  const handleDashboardClick = () => {
    navigate('/dashboard');
    onClose && onClose();
  };

  const handleInterviewsClick = () => {
    navigate('/interviews');
    onClose && onClose();
  };

  const handleCandidatesClick = () => {
    navigate('/candidates');
    onClose && onClose();
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    onClose && onClose();
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Card
        className={`w-50 max-w-full bg-gray-200 flex flex-col h-screen overflow-hidden transition-transform duration-300 ease-in-out fixed z-40 inset-y-0 left-0 lg:static lg:translate-x-0 lg:top-[70px] lg:h-[calc(100vh-60px)] text-sm` +
          (typeof window !== 'undefined' && window.innerWidth < 1024 ? ' translate-x-0 mt-2' : '')}
        style={{ overflow: "hidden", marginTop: "8px" }} // Move sidebar a little top
      >
        {/* Mobile Header with Close Button */}
        <CardHeader className="p-2 lg:hidden flex-shrink-0"> {/* Reduced padding */}
          <Flex align="center" justify="between">
            <Typography variant="h2" size="base" weight="semibold" className="text-base font-semibold">Menu</Typography>
            <Button variant="ghost" size="sm" className="hover:bg-emerald-700 ml-2 sm:ml-0" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </Flex>
        </CardHeader>

        {/* Content Area - No scroll */}
        <CardContent className="flex-1 flex flex-col p-2 pb-0 overflow-visible">
          {/* Navigation and Departments */}
          <Stack spacing={3} className="p-0 flex-1"> {/* Reduced spacing */}
            <Typography variant="h2" size="sm" weight="semibold" className="text-sm font-semibold mb-1 mt-[-8px]">{t.round}</Typography>
            
            <motion.nav className="space-y-1" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}> {/* Reduced space-y */}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <Button 
                  className={`w-full justify-start h-9 text-sm font-normal ${
                    location.pathname === '/dashboard' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-black hover:bg-emerald-700 hover:text-white'
                  }`} 
                  onClick={handleDashboardClick}
                >
                  <Home className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm">{t.dashboard}</Typography>
                </Button>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <Button 
                  className={`w-full justify-start h-9 text-sm font-normal ${
                    location.pathname === '/interviews' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-black hover:bg-emerald-700 hover:text-white'
                  }`} 
                  onClick={handleInterviewsClick}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm">{t.interviews}</Typography>
                </Button>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <Button 
                  className={`w-full justify-start h-9 text-sm font-normal ${
                    location.pathname === '/candidates' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-black hover:bg-emerald-700 hover:text-white'
                  }`} 
                  onClick={handleCandidatesClick}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm">{t.candidates}</Typography>
                </Button>
              </motion.div>
              {/* Mobile-only notification button */}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="sm:hidden">
                <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal"
                  onClick={() => { onNotificationClick && onNotificationClick(); onClose && onClose(); }}>
                  <Bell className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm" className="text-black group-hover:text-white hover:text-white">{t.notification}</Typography>
                </Button>
              </motion.div>
              {/* Mobile-only add person button */}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="sm:hidden">
                <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal"
                  onClick={() => { onAddPerson && onAddPerson(); onClose && onClose(); }}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm" className="text-black group-hover:text-white hover:text-white">{t.addPerson}</Typography>
                </Button>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <Button 
                  className={`w-full justify-start h-9 text-sm font-normal ${
                    location.pathname === '/settings' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-black hover:bg-emerald-700 hover:text-white'
                  }`} 
                  onClick={handleSettingsClick}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <Typography variant="span" size="sm">{t.settings}</Typography>
                </Button>
              </motion.div>
            </motion.nav>
          </Stack>
          
          {/* Departments Section */}
          <Stack spacing={3} className="mt-2"> {/* Reduced spacing and margin */}
            <Flex align="center" className="mb-2">
              <Typography variant="h2" size="sm" weight="normal" className="text-sm font-normal text-black flex items-center">
                {t.departments}
                <Typography variant="span" size="base" className="cursor-pointer text-gray-400 hover:text-gray-600 text-base font-bold select-none ml-1" onClick={() => setAddDeptOpen(true)}>+</Typography>
              </Typography>
            </Flex>
            <motion.div className="flex flex-col gap-2 ml-6" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}> {/* Reduced gap and margin */}
              {departments.map((dept, idx) => (
                <motion.div key={idx} className="flex items-center gap-2" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <span className="w-3 h-3 rounded inline-block" style={{ backgroundColor: dept.color }}></span>
                  <Typography variant="span" size="sm" weight="normal" className="text-sm font-normal text-black">{dept.name}</Typography>
                </motion.div>
              ))}
            </motion.div>
              <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.addDepartment}</DialogTitle>
                  </DialogHeader>
                  <Stack spacing={2}>
                    <Input
                      className="border rounded px-2 py-1 text-sm"
                      placeholder={t.addDepartment}
                      value={newDeptName}
                      onChange={e => setNewDeptName(e.target.value)}
                      autoFocus
                    />
                    <Flex align="center" gap={2}>
                      <Label className="text-xs">{t.color}:</Label>
                      <div className="relative">
                        <input
                          type="color"
                          value={newDeptColor}
                          onChange={e => setNewDeptColor(e.target.value)}
                          className="w-6 h-6 p-0 border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                    </Flex>
                  </Stack>
                  <DialogFooter>
                    <Button
                      className="bg-black text-white hover:bg-emerald-700"
                      onClick={() => {
                        if (newDeptName.trim()) {
                          setDepartments([...departments, { name: newDeptName, color: newDeptColor }]);
                          setNewDeptName("");
                          setNewDeptColor("#22d3ee");
                          setAddDeptOpen(false);
                        }
                      }}
                      disabled={!newDeptName.trim()}
                    >
                      <Typography variant="span" size="sm">{t.add}</Typography>
                    </Button>
                    <DialogClose asChild>
                      <Button variant="ghost" className="hover:bg-emerald-700">
                        <Typography variant="span" size="sm">{t.cancel}</Typography>
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Stack>
          </CardContent>
          
          {/* Bottom area: PRO card and profile button INSIDE the sidebar */}
          <div className="w-full bg-gray-200 z-10 relative flex flex-col gap-1 pb-2">
            {/* Compact PRO Mode Card */}
            <Card className="p-1 md:p-0.5 max-w-[200px] mx-auto mb-1">
              <CardContent className="p-0">
                {/* Abstract Background Section */}
                <div className="h-8 md:h-6 bg-gradient-to-r from-teal-300 via-rose-200 to-orange-300 relative">
                  {/* Abstract shapes */}
                  <div className="absolute top-1 left-1 w-3 h-1.5 bg-teal-400/30 rounded-full"></div>
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400/40 rounded-full"></div>
                  <div className="absolute bottom-1 left-1/2 w-4 h-1 bg-rose-300/50 rounded-full transform -translate-x-1/2"></div>
                </div>
                {/* Content Section */}
                <CardContent className="bg-white p-1 text-center">
                  <Typography variant="h3" size="xs" weight="bold" className="font-bold text-xs mb-0.5">{t.proModeTitle}</Typography>
                  <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600 mb-1 leading-tight">{t.proModeDesc}</Typography>
                  {/* Compact Discount Card */}
                  <Card className="bg-green-50 border border-green-200 rounded p-0.5 mb-1">
                    <CardContent className="flex items-center justify-center space-x-1 p-0">
                      <div className="relative">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]">🎉</div>
                        <Badge className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] px-0.5 py-0">Pro</Badge>
                      </div>
                      <div className="text-left">
                        <Typography variant="p" size="xs" weight="bold" className="font-bold text-[10px]">{t.discount}</Typography>
                        <Typography variant="p" size="xs" color="muted" className="text-[10px] text-gray-600">{t.forFirstMonth}</Typography>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Call to Action Button */}
                  <Button className="w-full bg-black text-white hover:bg-emerald-700 hover:text-white text-xs h-7 md:h-6" onClick={() => setProModalOpen(true)}>
                    <Typography variant="span" size="xs" className="text-white">{t.explorePro}</Typography>
                  </Button>
                  <Dialog open={proModalOpen} onOpenChange={setProModalOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.proModeTitle}</DialogTitle>
                        <DialogDescription>{t.proModeDesc}</DialogDescription>
                      </DialogHeader>
                      <CardContent className="my-4 space-y-2">
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          <li>{t.allPremium}</li>
                          <li>{t.proModeDesc}</li>
                          <li>{t.discount} {t.forFirstMonth}</li>
                        </ul>
                      </CardContent>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="bg-black text-white hover:bg-emerald-700 text-xs h-8 w-full mt-2">
                            <Typography variant="span" size="xs">{t.create}</Typography>
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </CardContent>
            </Card>
            {/* User Profile - Now links to settings page */}
            <Link to="/settings">
              <Card
                className="p-1 bg-gray-200 flex-shrink-0 w-full max-w-[180px] mx-auto cursor-pointer border-none shadow-none"
                style={{
                  background: "#e5e7eb",
                  minHeight: "36px",
                  maxHeight: "40px"
                }}
              >
                <CardContent className="p-0">
                  <Flex align="center" gap={1} className="hover:bg-emerald-700 rounded px-1 py-0.5 transition-colors">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-xs">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Stack spacing={0} className="flex-1 min-w-0">
                      <Typography variant="p" size="xs" weight="medium" className="text-xs font-medium truncate text-black">
                        {profile.name}
                      </Typography>
                      <Typography variant="p" size="xs" color="muted" className="text-[10px] text-gray-500 truncate">
                        {profile.email}
                      </Typography>
                    </Stack>
                  </Flex>
                </CardContent>
              </Card>
            </Link>
            <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t.login}</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-3"
                  onSubmit={e => {
                    e.preventDefault();
                    // This form is for login, not profile editing.
                    // The profile context handles actual profile updates.
                    // This form is kept for consistency with the original file's structure.
                    // setUser({ name: loginName, email: loginEmail }); // This line is removed
                    // setLoginName(""); // This line is removed
                    // setLoginEmail(""); // This line is removed
                    // setLoginPassword(""); // This line is removed
                    // setProfileModalOpen(false); // This line is removed
                  }}
                >
                  <Flex direction="col" align="center" gap={2}>
                    <Label htmlFor="profile-pic-upload" className="cursor-pointer">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-xs">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <input
                        id="profile-pic-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setProfile(prev => ({ ...prev, avatar: url }));
                          }
                        }}
                      />
                      <Typography variant="span" size="xs" color="muted" className="block text-xs text-gray-500 mt-1 items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Upload Profile Picture
                      </Typography>
                    </Label>
                  </Flex>
                  <Stack spacing={1}>
                    <Label className="block text-xs font-medium mb-1">{t.profileName}</Label>
                    <Input
                      type="text"
                      placeholder={t.profileName}
                      className="text-xs"
                      value={profile.name}
                      onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Label className="block text-xs font-medium mb-1">{t.email}</Label>
                    <Input
                      type="email"
                      placeholder={t.email}
                      className="text-xs"
                      value={profile.email}
                      onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Label className="block text-xs font-medium mb-1">{t.password}</Label>
                    {/* Password input is removed as it's not part of the profile context */}
                  </Stack>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-emerald-700 text-xs mt-2">
                    <Typography variant="span" size="xs">{t.login}</Typography>
                  </Button>
                  <Button
                    className={`w-full text-xs mt-2 ${profile.name ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
                    onClick={() => {
                      if (profile.name) {
                        setProfile({ name: "", email: "", avatar: "" }); // Reset profile to default
                        // setLoginName(""); // This line is removed
                        // setLoginEmail(""); // This line is removed
                        // setLoginPassword(""); // This line is removed
                        setProfileModalOpen(false);
                      }
                    }}
                    disabled={!profile.name}
                  >
                    <Typography variant="span" size="xs">Logout</Typography>
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
  )
}