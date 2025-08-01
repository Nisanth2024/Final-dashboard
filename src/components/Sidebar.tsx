import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Settings, X, LogOut, Bell, UserPlus } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"

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

export function Sidebar({ onClose, className = "", onShowAllCandidates, onShowInterviews, onShowDashboard, language, onAddPerson, onNotificationClick }: SidebarProps) {
  const t = useTranslation(language);
  const [proModalOpen, setProModalOpen] = useState(false)
  const [departments, setDepartments] = useState([
    { name: t.departments + " 1", color: "#a78bfa" },
    { name: t.departments + " 2", color: "#fb923c" }
  ])
  const [addDeptOpen, setAddDeptOpen] = useState(false)
  const [newDeptName, setNewDeptName] = useState("")
  const [newDeptColor, setNewDeptColor] = useState("#22d3ee")
  const [settingsOpen, setSettingsOpen] = useState(false)
  // Add state for user authentication
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Remove Popover logic for user profile. Instead, use a Dialog that opens when the user clicks the profile area.
  // Add state for profile modal open
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("");

  return (
    <aside className={`w-50 max-w-full bg-gray-200 flex flex-col h-screen overflow-hidden transition-transform duration-300 ease-in-out fixed z-40 inset-y-0 left-0 lg:static lg:translate-x-0 lg:top-[80px] lg:h-[calc(100vh-70px)] text-sm ${className}` + (typeof window !== 'undefined' && window.innerWidth < 1024 ? ' translate-x-0' : '')}>
      {/* Mobile Header with Close Button */}
      <div className="flex items-center justify-between p-3 lg:hidden flex-shrink-0">
        <h2 className="text-base font-semibold">Menu</h2>
        <Button variant="ghost" size="sm" className="hover:bg-emerald-700 ml-2 sm:ml-0" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Area - No scroll */}
      <div className="flex-1 flex flex-col">
        {/* Navigation and Departments */}
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-sm font-semibold mb-2 mt-[-14px]">{t.round}</h2>
          
          <motion.nav className="space-y-0.5" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => { onShowDashboard && onShowDashboard(); onClose && onClose(); }}>
                <Home className="w-4 h-4 mr-2" />
                {t.dashboard}
              </Button>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => { onShowInterviews && onShowInterviews(); onClose && onClose(); }}>
                <Users className="w-4 h-4 mr-2" />
                {t.interviews}
              </Button>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => { onShowAllCandidates && onShowAllCandidates(); onClose && onClose(); }}>
                <Users className="w-4 h-4 mr-2" />
                {t.candidates}
              </Button>
            </motion.div>
            {/* Mobile-only notification button */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="sm:hidden">
              <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => { onNotificationClick && onNotificationClick(); onClose && onClose(); }}>
                <Bell className="w-4 h-4 mr-2" />
                {t.notification}
              </Button>
            </motion.div>
            {/* Mobile-only add person button */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="sm:hidden">
              <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => { onAddPerson && onAddPerson(); onClose && onClose(); }}>
                <UserPlus className="w-4 h-4 mr-2" />
                {t.addPerson}
              </Button>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start h-9 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white text-sm font-normal" onClick={() => setSettingsOpen(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {t.settings}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{t.settings}</DialogTitle>
                    <DialogDescription>{t.settings} - {t.departments}</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="interview" className="mt-2">
                    <TabsList className="mb-2">
                      <TabsTrigger value="interview">{t.interviewOverview}</TabsTrigger>
                      <TabsTrigger value="account">{t.userProfile}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="interview">
                      <div className="space-y-2">
                        <div className="font-semibold text-sm">{t.interviewOverview}</div>
                        <div className="text-xs text-gray-600">{t.guidelines} (Coming soon)</div>
                      </div>
                    </TabsContent>
                    <TabsContent value="account">
                      <div className="space-y-2">
                        <div className="font-semibold text-sm">{t.userProfile}</div>
                        <div className="text-xs text-gray-600">{t.email}, {t.password} (Coming soon)</div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="hover:bg-emerald-700">{t.cancel}</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.nav>
        {/* Departments Section */}
        <div className="mt-4">
          <div className="flex items-center mb-3">
            <h2 className="text-sm font-normal text-black flex items-center">{t.departments}
              <span className="cursor-pointer text-gray-400 hover:text-gray-600 text-base font-bold select-none ml-1" onClick={() => setAddDeptOpen(true)}>+</span>
            </h2>
          </div>
          <motion.div className="flex flex-col gap-3 ml-8" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            {departments.map((dept, idx) => (
              <motion.div key={idx} className="flex items-center gap-2" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <span className="w-3 h-3 rounded inline-block" style={{ backgroundColor: dept.color }}></span>
                <span className="text-sm font-normal text-black">{dept.name}</span>
              </motion.div>
            ))}
          </motion.div>
            <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addDepartment}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <input
                    className="border rounded px-2 py-1 text-sm"
                    placeholder={t.addDepartment}
                    value={newDeptName}
                    onChange={e => setNewDeptName(e.target.value)}
                    autoFocus
                  />
            <div className="flex items-center gap-2">
                    <label className="text-xs">{t.color}:</label>
                    <input
                      type="color"
                      value={newDeptColor}
                      onChange={e => setNewDeptColor(e.target.value)}
                      className="w-6 h-6 p-0 border-none bg-transparent"
                    />
                  </div>
            </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      if (newDeptName.trim()) {
                        setDepartments([...departments, { name: newDeptName, color: newDeptColor }]);
                        setNewDeptName("");
                        setNewDeptColor("#22d3ee");
                        setAddDeptOpen(false);
                      }
                    }}
                    disabled={!newDeptName.trim()}
                  >{t.add}</Button>
                  <DialogClose asChild>
                    <Button variant="ghost" className="hover:bg-emerald-700">{t.cancel}</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Group PRO card and user profile at the bottom */}
        <div className="mt-auto">
          {/* Compact PRO Mode Card */}
          <div className="p-1 md:p-0.5 max-w-[200px] ml-2">
            <div className="rounded-lg overflow-hidden shadow-sm">
              {/* Abstract Background Section */}
              <div className="h-8 md:h-6 bg-gradient-to-r from-teal-300 via-rose-200 to-orange-300 relative">
                {/* Abstract shapes */}
                <div className="absolute top-1 left-1 w-3 h-1.5 bg-teal-400/30 rounded-full"></div>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400/40 rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 w-4 h-1 bg-rose-300/50 rounded-full transform -translate-x-1/2"></div>
              </div>
              {/* Content Section */}
              <div className="bg-white p-1 text-center">
                <h3 className="font-bold text-xs mb-0.5">{t.proModeTitle}</h3>
                <p className="text-xs text-gray-600 mb-1 leading-tight">{t.proModeDesc}</p>
                {/* Compact Discount Card */}
                <div className="bg-green-50 border border-green-200 rounded p-0.5 mb-1 flex items-center justify-center space-x-1">
                  <div className="relative">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]">🎉</div>
                    <Badge className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] px-0.5 py-0">Pro</Badge>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[10px]">{t.discount}</p>
                    <p className="text-[10px] text-gray-600">{t.forFirstMonth}</p>
                  </div>
                </div>
                {/* Call to Action Button */}
                <Button className="w-full bg-black text-white hover:bg-emerald-700 text-xs h-7 md:h-6" onClick={() => setProModalOpen(true)}>{t.explorePro}</Button>
                <Dialog open={proModalOpen} onOpenChange={setProModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.proModeTitle}</DialogTitle>
                      <DialogDescription>{t.proModeDesc}</DialogDescription>
                    </DialogHeader>
                    <div className="my-4 space-y-2">
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>{t.allPremium}</li>
                        <li>{t.proModeDesc}</li>
                        <li>{t.discount} {t.forFirstMonth}</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="bg-black text-white hover:bg-emerald-700 text-xs h-8 w-full mt-2">{t.create}</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* User Profile - Fixed at bottom */}
          <div className="p-2 bg-gray-200 flex-shrink-0 max-w-[200px] ml-0 cursor-pointer" onClick={() => setProfileModalOpen(true)}>
            <div className="flex items-center space-x-2 hover:bg-gray-100 rounded p-1 transition-colors">
              <Avatar className="w-6 h-6">
                <AvatarImage src={profilePic || "https://randomuser.me/api/portraits/men/65.jpg"} />
                <AvatarFallback className="text-xs">AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user ? user.name : t.userProfile}</p>
                    <p className="text-xs text-gray-500 truncate">{user ? user.email : "user@example.com"}</p>
                  </div>
              <Button variant="ghost" size="icon" className="hover:bg-emerald-700" aria-label="Logout" onClick={user ? () => setUser(null) : undefined} disabled={!user}>
                    <LogOut className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>
          </div>
          <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{user ? 'Edit Profile' : t.login}</DialogTitle>
              </DialogHeader>
                    <form
                className="space-y-3"
                      onSubmit={e => {
                        e.preventDefault();
                        if (loginName && loginEmail && loginPassword) {
                          setUser({ name: loginName, email: loginEmail });
                          setLoginName("");
                          setLoginEmail("");
                          setLoginPassword("");
                    setProfileModalOpen(false);
                        }
                      }}
                    >
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="profile-pic-upload" className="cursor-pointer">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profilePic || "https://randomuser.me/api/portraits/men/65.jpg"} />
                      <AvatarFallback className="text-xs">{user ? user.name.split(' ').map(n => n[0]).join('') : "AC"}</AvatarFallback>
                    </Avatar>
                    <input
                      id="profile-pic-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setProfilePic(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <span className="block text-xs text-gray-500 mt-1">{'Upload Profile Picture'}</span>
                  </label>
                </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">{t.profileName}</label>
                  <Input type="text" placeholder={t.profileName} className="text-xs" value={user ? user.name : loginName} onChange={e => user ? setUser({ ...user, name: e.target.value }) : setLoginName(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">{t.email}</label>
                  <Input type="email" placeholder={t.email} className="text-xs" value={user ? user.email : loginEmail} onChange={e => user ? setUser({ ...user, email: e.target.value }) : setLoginEmail(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">{t.password}</label>
                        <Input type="password" placeholder={t.password} className="text-xs" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                      </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-emerald-700 text-xs mt-2">{user ? 'Save' : t.login}</Button>
                <Button
                  className={`w-full text-xs mt-2 ${user ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
                  onClick={() => {
                    if (user) {
                      setUser(null);
                      setProfilePic("");
                      setLoginName("");
                      setLoginEmail("");
                      setLoginPassword("");
                      setProfileModalOpen(false);
                    }
                  }}
                  disabled={!user}
                >
                  {'Logout'}
                </Button>
                    </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </aside>
  )
} 