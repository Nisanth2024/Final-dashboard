import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Bell, Calendar, ArrowRight, ChevronDown, Menu, MoreHorizontal, HelpCircle, Sun, Moon, Plus, X, Settings, User } from "lucide-react"
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
  const [addPersonButtonVisible, setAddPersonButtonVisible] = useState(true);
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
    { id: 4, title: 'Feedback completed', desc: 'Feedback for Jane Doe has been submitted', icon: 'feedback' },
    { id: 5, title: 'Round 2 scheduled', desc: 'Round 2 for Michael Chen is scheduled for tomorrow', icon: 'round' },
  ];
  return (
    <header className="flex flex-wrap items-center justify-between p-1 sm:p-1.5 md:p-2 bg-white rounded-t-xl shadow-sm border-b border-gray-200 relative">
      <div className="flex items-center space-x-1.5 md:space-x-3">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden p-1 bg-black text-white hover:bg-emerald-700 hover:text-white transition-colors border border-gray-300" onClick={onMenuClick}>
          <Menu className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        {/* Logo */}
        <img src="dashboard logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-gray-100" />
        {/* Global Actions - hide some on mobile */}
        <div className="flex items-center space-x-0.5 md:space-x-1.5">
          <Button
            variant="outline"
            size="sm"
            className="p-1 sm:p-1.5 md:p-2 flex items-center gap-1 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors border border-gray-300 text-xs sm:text-sm md:text-base"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs font-medium">{t.search}</span>
          </Button>
          <Button 
            variant="outline"
            size="sm" 
            className="hidden sm:flex p-1 sm:p-1.5 md:p-2 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors border border-gray-300 text-xs sm:text-sm md:text-base"
            onClick={() => {
              setAddPersonOpen(true);
              setAddPersonButtonVisible(true);
            }}
          >
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs font-medium">{t.addPerson}</span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex relative p-1 md:p-1 fullscreen:hidden bg-grey-300 text-black hover:bg-emerald-700 hover:text-white transition-colors border border-black flex items-center gap-1" onClick={() => setNotificationOpen((v) => !v)}>
            <span className="relative flex items-center">
              <Bell className="w-3 h-3 md:w-4 md:h-4" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full"></Badge>
            </span>
            <span className="hidden sm:inline text-xs font-medium">{t.notification}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex p-1 md:p-1 bg-gray-200 text-black hover:bg-emerald-700 hover:text-white transition-colors border border-gray-300 items-center gap-0">
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
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => {
                const profile = document.getElementById('sidebar-user-profile');
                if (profile) profile.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}>
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Top-right controls - responsive positioning */}
      <div className="flex items-center space-x-1.5 md:space-x-3 flex-wrap mt-1 sm:mt-0 md:absolute md:right-0 md:top-2">
        {/* Language Selector - always visible */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1 p-1 md:p-1 bg-grey-300 text-black hover:bg-emerald-700 hover:text-white transition-colors border border-black">
              <span className="text-xs md:text-sm">{language === 'en' ? 'En' : language === 'es' ? 'Es' : 'Fr'}</span>
              <ChevronDown className="w-2.5 md:w-2 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLanguage('en')} className="hover:bg-emerald-700">English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('es')} className="hover:bg-emerald-700">Spanish</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('fr')} className="hover:bg-emerald-700">French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Date - always visible */}
        <div className="hidden sm:flex items-center space-x-1 text-xs md:text-sm text-gray-600">
          <Calendar className="w-3 h-3 md:w-3 md:h-4" />
          <span>{dateString}</span>
        </div>
        {/* Create Button with Dropdown - responsive */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-black text-white hover:bg-emerald-700 hover:text-white transition-colors text-xs md:text-sm w-full sm:w-auto py-1.5 md:py-2 px-2 md:px-2 border border-gray-300 justify-center flex items-center">
              <span className="hidden sm:inline">{t.create}</span>
              <span className="sm:hidden flex items-center"><Plus className="w-5 h-5" /></span>
              <ArrowRight className="hidden sm:block w-3 h-3 md:w-4 md:h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onCreateType && onCreateType('interview')} className="hover:bg-emerald-700">{t.newInterview}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCreateType && onCreateType('round')} className="hover:bg-emerald-700">{t.newRound}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCreateType && onCreateType('prompt')} className="hover:bg-emerald-700">{t.newPrompt}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCreateType && onCreateType('candidate')} className="hover:bg-emerald-700">{t.newCandidate}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <div className="fixed top-16 right-8 z-[9999] w-96 bg-white shadow-xl rounded-xl border animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => {
                setNotificationOpen(false);
                setShowAllNotifications(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 p-4">
            {!showAllNotifications ? (
              <div className="space-y-4">
                {/* Show only the first notification as a summary */}
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-4 h-4 text-black mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notifications[0].title}</p>
                    <p className="text-xs text-gray-600">{notifications[0].desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <Button variant="ghost" size="sm" className="mb-2 text-xs text-blue-600 hover:underline" onClick={() => setShowAllNotifications(false)}>&larr; Back</Button>
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 border-b last:border-b-0">
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
                    <div className="flex-1">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-gray-600">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs py-2 px-3"
                onClick={() => setShowAllNotifications(true)}
              >
                See all notifications
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="text-xs py-2 px-3 border border-gray-300 hover:bg-gray-50"
                onClick={() => setNotesOpen(true)}
              >
                Notes
              </Button>
            </div>
          </div>
        </div>
      )}
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
          <div className="max-h-40 overflow-y-auto space-y-2">
            {notes.length === 0 ? (
              <div className="text-gray-400 text-xs text-center">No notes yet.</div>
            ) : (
              notes.map((note, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-2 text-xs flex justify-between items-center">
                  <span>{note}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 ml-2 text-xs p-0 h-auto" 
                    onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-xs px-3 py-1 border rounded hover:bg-gray-100">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
} 