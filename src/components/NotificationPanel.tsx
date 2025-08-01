import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/useTranslation";
import { motion } from "framer-motion";
import { ArrowRight, Bell, FileText, Users, Clock } from "lucide-react";

export function NotificationPanel({ language }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }) {
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

  // Demo candidate list
  const candidateList = [
    { id: 'cand-1', name: 'Sarah Johnson' },
    { id: 'cand-2', name: 'Michael Chen' },
    { id: 'cand-3', name: 'Emily Rodriguez' },
  ];
  const [selectedCandidate, setSelectedCandidate] = useState(candidateList[0].id);
  // Notes: { candidateId, text, createdAt }
  const [notes, setNotes] = useState<{ candidateId: string, text: string, createdAt: string }[]>([]);
  const [newNote, setNewNote] = useState('');
  const [notesOpen, setNotesOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [] = useState<number | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dashboardNotes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);
  // Save notes to localStorage on change
  useEffect(() => {
    localStorage.setItem('dashboardNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        { candidateId: selectedCandidate, text: newNote, createdAt: new Date().toISOString() },
        ...notes
      ]);
      setNewNote('');
    }
  };

  // Edit note
  const handleEditNote = (idx: number) => {
    setEditingIdx(idx);
    setEditText(notes.filter(n => n.candidateId === selectedCandidate)[idx].text);
  };
  const handleSaveEdit = (idx: number) => {
    const globalIdx = notes.findIndex((n, i) => n.candidateId === selectedCandidate && i === idx);
    if (globalIdx !== -1) {
      const updated = [...notes];
      updated[globalIdx] = { ...updated[globalIdx], text: editText };
      setNotes(updated);
      setEditingIdx(null);
      setEditText('');
    }
  };
  const handleCancelEdit = () => {
    setEditingIdx(null);
    setEditText('');
  };
  // Delete note
  const handleDeleteNote = (idx: number) => {
    const globalIdx = notes.findIndex((n, i) => n.candidateId === selectedCandidate && i === idx);
    if (globalIdx !== -1) {
      const updated = [...notes];
      updated.splice(globalIdx, 1);
      setNotes(updated);
    }
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
      }}
      className="h-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px] xl:min-h-[90px] w-full"
    >
      <Card className="h-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px] xl:min-h-[90px] w-full">
        <CardHeader className="pb-0 px-3 sm:px-2 md:px-3 lg:px-3 xl:px-4">
          <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold mb-0 -mt-2">Notifications</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 space-y-0 px-2 sm:px-2 md:px-3 lg:px-3 xl:px-4 pt-0 pb-[-20px] -mt-7">
          {allNotifications.map((notification, index) => (
            <div key={index} className="flex items-center gap-1.5 p-1 sm:p-1 md:p-1.5 lg:p-2 xl:p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleConfirm(notification.action, index === 0 ? 'pro' : index === 1 ? 'candidates' : 'dashboard')}>
              <div className="flex-shrink-0">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm font-medium leading-tight">{notification.title}</p>
                <p className="text-[8px] sm:text-[9px] md:text-xs lg:text-xs xl:text-xs text-gray-500 truncate">{notification.message}</p>
              </div>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 text-gray-400 flex-shrink-0" />
            </div>
          ))}
        </CardContent>
        
        <CardFooter className="pt-0 px-2 sm:px-2 md:px-3 lg:px-3 xl:px-4 pb-1.5 sm:pb-1.5 md:pb-2 lg:pb-2.5 xl:pb-3 -mt-4">
          <div className="flex items-center md:mt[-20px] w-full">
            <Button 
              size="sm" 
              className="flex-1 bg-black text-white hover:bg-emerald-700 hover:text-white text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm h-6 sm:h-6 md:h-7 lg:h-7 xl:h-8"
              onClick={() => setAllOpen(true)}
            >
              <span className="truncate">See All Notifications</span>
              <ArrowRight className="ml-1 w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white text-black border border-gray-200 hover:bg-emerald-700 hover:text-white text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm h-6 sm:h-6 md:h-7 lg:h-7 xl:h-8"
              onClick={() => setNotesOpen(true)}
            >
              <FileText className="w-2.5 h-2.5 mr-1 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
              <span className="truncate">Notes</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-xs w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm">{confirmMessage}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-200 text-black">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 hover:text-white"
              onClick={handleProceed}
            >
              Proceed
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
          <div className="max-h-80 overflow-y-auto space-y-2 mt-2 w-full">
            {allNotifications.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No notifications found.</div>
            ) : (
              allNotifications.map((n, i) => (
                <div key={i} className="flex items-start gap-2 bg-gray-100 rounded-lg p-2 relative w-full min-w-0">
                  <div>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs sm:text-sm leading-tight">{n.title}</div>
                    <div className="text-gray-500 text-xs mb-0.5 break-words">{n.message}</div>
                    <div className="text-xs text-gray-400">{n.time}</div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-emerald-700 hover:text-white text-xs"
                    onClick={n.action}
                  >
                    {n.actionLabel}
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white w-full"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notes Modal */}
      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="max-w-md w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <div>
              <label className="block text-xs font-medium mb-1">Candidate</label>
              <select
                className="w-full border rounded p-2 text-xs sm:text-sm"
                value={selectedCandidate}
                onChange={e => setSelectedCandidate(e.target.value)}
              >
                {candidateList.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <textarea
              className="w-full min-h-[60px] border rounded p-2 text-xs sm:text-sm"
              placeholder="Add a new note..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <Button
              className="bg-black text-white hover:bg-emerald-700 hover:text-white text-xs sm:text-sm w-full"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Save Note
            </Button>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {notes.filter(n => n.candidateId === selectedCandidate).length === 0 ? (
                <div className="text-center text-gray-400 py-4">No notes yet for this candidate.</div>
              ) : (
                notes.filter(n => n.candidateId === selectedCandidate).map((note, idx) => (
                  <div key={idx} className="bg-gray-100 rounded p-2 text-xs sm:text-sm break-words relative">
                    {editingIdx === idx ? (
                      <>
                        <textarea
                          className="w-full min-h-[40px] border rounded p-1 text-xs sm:text-sm mb-1"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                        />
                        <div className="flex gap-1 mt-1">
                          <Button size="sm" className="bg-green-600 text-white text-xs" onClick={() => handleSaveEdit(idx)}>Save</Button>
                          <Button size="sm" variant="outline" className="bg-gray-300 text-black text-xs" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{note.text}</div>
                        <div className="text-gray-400 text-[10px] mt-1">{new Date(note.createdAt).toLocaleString()}</div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:underline p-0 h-auto" onClick={() => handleEditNote(idx)}>Edit</Button>
                          <Button size="sm" variant="ghost" className="text-xs text-red-600 hover:underline p-0 h-auto" onClick={() => handleDeleteNote(idx)}>Delete</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                className="bg-black text-white hover:bg-emerald-700 hover:text-white w-full"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
} 