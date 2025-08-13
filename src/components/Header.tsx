import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Flex } from "@/components/ui/flex"
import { Stack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, UserPlus, Bell, Calendar, ArrowRight, ChevronDown, Menu, Plus, X, Settings, User } from "lucide-react"
import { SearchModal } from "./SearchModal"
import { AddPersonModal } from "./AddPersonModal"
import { useTranslation } from "@/lib/useTranslation"

interface HeaderProps {
  onMenuClick: () => void
  onNotificationClick: () => void
  onCreateSection?: () => void
  onCreateType?: (type: 'interview' | 'round' | 'prompt' | 'candidate') => void
  onAddPerson?: (person: {
    type: 'candidate' | 'interviewer'
    name: string
    email: string
    phone: string
    location: string
    department: string
    experience: string
    skills: string[]
    avatar?: string
  }) => void
  language: 'en' | 'es' | 'fr'
  setLanguage: (lang: 'en' | 'es' | 'fr') => void
}

export function Header({ onMenuClick, onCreateType, onAddPerson, language, setLanguage }: HeaderProps) {
  const t = useTranslation(language);
  // Get today's date in a readable format
  const today = new Date();
  const dateString = today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [, setAddPersonButtonVisible] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [] = useState<'light' | 'dark'>("light");
  // Example notifications
  const notifications = [
    { id: 1, title: 'PRO mode activated', desc: 'All premium features are now available for your account', icon: 'pro' },
    { id: 2, title: 'New candidate added', desc: 'Alex Johnson has entered the Technical Review phase', icon: 'candidate' },
    { id: 3, title: 'Phase deadline soon', desc: 'Initial Review Phase 3 ends in 2 days', icon: 'deadline' },
    // Removed feedback completed and round 2 scheduled
  ];
  return (
    <Card className="flex flex-wrap items-left justify-between p-1 sm:p-1.5 md:p-2 bg-white rounded-t-xl shadow-sm relative">
      <Flex align="center" gap={3} className="space-x-1.5 md:space-x-3 w-full justify-between">
        {/* Left group: menu, logo, actions */}
        <Flex align="center" gap={3}>
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden p-1 bg-black text-white hover:bg-emerald-700 hover:text-white transition-colors" onClick={onMenuClick}>
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          {/* Logo */}
          <img src="dashboard logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-gray-100" />
          {/* Global Actions - hide some on mobile */}
          <Flex align="center" gap={1} className="space-x-0.5 md:space-x-1.5">
            <Button
              variant="outline"
              size="sm"
              className="p-1 sm:p-1.5 md:p-2 flex items-center gap-1 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors text-xs sm:text-sm md:text-base"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <Typography variant="span" size="xs" className="hidden sm:inline text-xs font-medium">{t.search}</Typography>
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              className="hidden sm:flex p-1 sm:p-1.5 md:p-2 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors text-xs sm:text-sm md:text-base"
              onClick={() => {
                setAddPersonOpen(true);
                setAddPersonButtonVisible(true);
              }}
            >
              <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
              <Typography variant="span" size="xs" className="hidden sm:inline text-xs font-medium">{t.addPerson}</Typography>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex relative p-1 md:p-1 fullscreen:hidden bg-grey-300 text-black hover:bg-emerald-700 hover:text-white transition-colors items-center gap-1" onClick={() => setNotificationOpen((v) => !v)}>
              <span className="relative flex items-center">
                <Bell className="w-3 h-3 md:w-4 md:h-4" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full"></Badge>
              </span>
              <Typography variant="span" size="xs" className="hidden sm:inline text-xs font-medium">{t.notification}</Typography>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex p-1 md:p-1 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors items-center gap-0">
                  <div className="flex flex-col space-y-0.5">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => window.location.assign('/settings')}>
                  <Settings className="w-4 h-4" />
                  <Typography variant="span" size="sm">Settings</Typography>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => {
                  const profile = document.getElementById('sidebar-user-profile');
                  if (profile) profile.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}>
                  <User className="w-4 h-4" />
                  <Typography variant="span" size="sm">Profile</Typography>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Flex>
        {/* Right group: plus button and others */}
        <Flex align="center" gap={2}>
          {/* Language Selector - always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1 p-1 md:p-1 bg-grey-300 text-black hover:bg-emerald-700 hover:text-white transition-colors">
                <Typography variant="span" size="xs" className="text-xs md:text-sm">{language === 'en' ? 'En' : language === 'es' ? 'Es' : 'Fr'}</Typography>
                <ChevronDown className="w-2.5 md:w-2 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">English</Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">Spanish</Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">French</Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Date - always visible */}
          <Flex align="center" gap={1} className="hidden sm:flex items-center space-x-1 text-xs md:text-sm text-gray-600">
            <Calendar className="w-3 h-3 md:w-3 md:h-4" />
            <Typography variant="span" size="xs" className="text-xs md:text-sm text-gray-600">{dateString}</Typography>
          </Flex>
          {/* Create Button with Dropdown - always top right */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-black text-white hover:bg-emerald-700 hover:text-white transition-colors text-xs md:text-sm w-8 h-8 min-w-0 rounded-full flex items-center justify-center p-0 sm:w-auto sm:h-auto sm:rounded sm:px-2 sm:py-1.5 sm:ml-2"
              >
                <Typography variant="span" size="xs" className="hidden sm:inline text-white">{t.create}</Typography>
                <span className="sm:hidden flex items-center justify-center text-white"><Plus className="w-5 h-5" /></span>
                <ArrowRight className="hidden sm:block w-3 h-3 md:w-4 md:h-4 ml-1 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onCreateType && onCreateType('interview')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">{t.newInterview}</Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCreateType && onCreateType('prompt')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">{t.newPrompt}</Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCreateType && onCreateType('candidate')} className="hover:bg-emerald-700">
                <Typography variant="span" size="sm">{t.newCandidate}</Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>
      {/* REMOVE this duplicate block below */}
      {/* Top-right controls - responsive positioning */}
      {/* <Flex align="center" gap={3} className="space-x-1.5 md:space-x-3 flex-wrap mt-1 sm:mt-0 md:absolute md:right-0 md:top-2 w-full justify-end">
        ...DUPLICATE CONTENT...
      </Flex> */}
      {/* ...rest of the code... */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} language={language} setLanguage={setLanguage} />
      <AddPersonModal 
        open={addPersonOpen} 
        onOpenChange={setAddPersonOpen} 
        onAddPerson={onAddPerson || (() => {})}
        language={language}
        setLanguage={setLanguage}
      />
      {/* Notification Dropdown/Modal */}
      {notificationOpen && (
        <Card className="fixed top-16 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl animate-fade-in">
          <CardHeader className="p-4">
            <Flex align="center" justify="between">
              <Typography variant="h2" size="lg" weight="semibold" className="text-lg font-semibold">Notifications</Typography>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => {
                  setNotificationOpen(false);
                  setShowAllNotifications(false);
                }}
                className="p-2 hover:bg-emerald-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </Flex>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            {!showAllNotifications ? (
              <Stack spacing={4}>
                {/* Show only the first notification as a summary */}
                <Flex align="start" gap={3} className="p-3 rounded-lg">
                  <div className="w-4 h-4 text-black mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <Stack spacing={1} className="flex-1">
                    <Typography variant="p" size="sm" weight="medium">{notifications[0].title}</Typography>
                    <Typography variant="p" size="xs" color="muted">{notifications[0].desc}</Typography>
                  </Stack>
                </Flex>
              </Stack>
            ) : (
              <ScrollArea className="max-h-64">
                <Stack spacing={2}>
                  <Button variant="ghost" size="sm" className="mb-2 text-xs text-blue-600 hover:bg-emerald-700 hover:text-white" onClick={() => setShowAllNotifications(false)}>
                    <Typography variant="span" size="xs">&larr; Back</Typography>
                  </Button>
                  {notifications.map((n) => (
                    <Flex key={n.id} align="start" gap={3} className="p-3 rounded-lg">
                      <div className="w-4 h-4 mt-0.5">
                        {/* Simple icon logic for demo */}
                        {n.icon === 'pro' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                        {n.icon === 'candidate' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        )}
                        {n.icon === 'deadline' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" /></svg>
                        )}
                        {n.icon === 'feedback' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        )}
                        {n.icon === 'round' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
                        )}
                      </div>
                      <Stack spacing={1} className="flex-1">
                        <Typography variant="p" size="sm" weight="medium">{n.title}</Typography>
                        <Typography variant="p" size="xs" color="muted">{n.desc}</Typography>
                      </Stack>
                    </Flex>
                  ))}
                </Stack>
              </ScrollArea>
            )}
          </CardContent>
          <CardContent className="p-4">
            <Flex gap={2}>
              <Button 
                className="flex-1 bg-black text-white hover:bg-emerald-700 hover:text-white text-xs py-2 px-3"
                onClick={() => setShowAllNotifications(true)}
              >
                <Typography variant="span" size="xs" className="text-white">See all notifications</Typography>
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="text-xs py-2 px-3 hover:bg-emerald-700 hover:text-white"
                onClick={() => setNotesOpen(true)}
              >
                <Typography variant="span" size="xs">Notes</Typography>
              </Button>
            </Flex>
          </CardContent>
        </Card>
      )}
      {/* Notes Modal */}
      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <Typography variant="p" size="sm" color="muted" className="mb-2 text-sm text-gray-600">
            Add, view, or edit private notes related to candidates, interview rounds, questions, sections, or interviewers.
          </Typography>
          <Stack spacing={2} className="mb-2">
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
              <Typography variant="span" size="xs">Add Note</Typography>
            </Button>
          </Stack>
          <ScrollArea className="max-h-40">
            <Stack spacing={2}>
              {notes.length === 0 ? (
                <Typography variant="p" size="xs" color="muted" align="center" className="text-gray-400 text-xs text-center">No notes yet.</Typography>
              ) : (
                notes.map((note, idx) => (
                  <Flex key={idx} align="center" justify="between" className="bg-gray-100 rounded p-2 text-xs">
                    <Typography variant="span" size="xs">{note}</Typography>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 ml-2 text-xs p-0 h-auto" 
                      onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                    >
                      <Typography variant="span" size="xs">Delete</Typography>
                    </Button>
                  </Flex>
                ))
              )}
            </Stack>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-xs px-3 py-1 rounded hover:bg-emerald-700">
                <Typography variant="span" size="xs">Close</Typography>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}