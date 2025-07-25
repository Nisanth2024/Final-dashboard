import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/useTranslation";

export function NotificationPanel({ language, setLanguage }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }) {
  const t = useTranslation(language);
  // Placeholder navigation function
  const goToProFeatures = useCallback(() => {
    window.open('/pro', '_blank');
  }, []);
  const goToCandidates = useCallback(() => {
    window.location.href = '/candidates';
  }, []);
  const goToDashboard = useCallback(() => {
    window.location.href = '/dashboard';
  }, []);

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
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="10" rx="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
      action: () => window.open('/pro', '_blank'),
      actionLabel: t.proMode,
    },
    {
      title: t.newCandidate,
      message: t.newCandidateDesc,
      time: '5 min ago',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
      ),
      action: () => window.location.href = '/candidates',
      actionLabel: t.newCandidate,
    },
    {
      title: t.phaseDeadline,
      message: t.phaseDeadlineDesc,
      time: '1 hour ago',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V7a8 8 0 1 0-16 0v5c0 6 8 10 8 10z"/></svg>
      ),
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
    <div className="rounded-lg p-2 sm:p-3 md:p-4 shadow hover:shadow-md transition-all duration-200 bg-white flex flex-col justify-between min-h-[100px] w-full h-auto max-w-full">
      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-xs w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm">{confirmMessage}</div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-gray-200 text-black rounded px-3 py-1 mr-2" type="button">Cancel</button>
            </DialogClose>
            <button className="bg-black text-white rounded px-3 py-1" type="button" onClick={handleProceed}>Proceed</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     
      {/* Divider */}
      <div className="border-t border-gray-200 my-0.5"></div>
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
                  <button
                    className="absolute bottom-2 right-2 bg-black text-white text-xs rounded px-2 py-1 hover:bg-emerald-700 transition-colors"
                    onClick={n.action}
                  >
                    {n.actionLabel}
                  </button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-black text-white rounded px-3 py-1 mt-2 w-full" type="button">Close</button>
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
            <button
              className="bg-black text-white rounded px-3 py-1 text-xs sm:text-sm hover:bg-emerald-700 transition-colors w-full"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Save Note
            </button>
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
                          <button className="bg-green-600 text-white rounded px-2 py-0.5 text-xs" onClick={() => handleSaveEdit(idx)}>Save</button>
                          <button className="bg-gray-300 text-black rounded px-2 py-0.5 text-xs" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{note.text}</div>
                        <div className="text-gray-400 text-[10px] mt-1">{new Date(note.createdAt).toLocaleString()}</div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button className="text-xs text-blue-600 hover:underline" onClick={() => handleEditNote(idx)}>Edit</button>
                          <button className="text-xs text-red-600 hover:underline" onClick={() => handleDeleteNote(idx)}>Delete</button>
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
              <button className="bg-black text-white rounded px-3 py-1 mt-2 w-full" type="button">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Bottom Row */}
      <div className="flex items-center gap-1 mt-2 flex-wrap">
        <button className="flex-1 flex items-center justify-center bg-black text-white rounded-xl py-1 font-medium text-xs sm:text-sm hover:bg-gray-900 transition-colors min-w-[120px]" onClick={() => setAllOpen(true)}>
          {t.seeAllNotifications} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
        <button className="flex items-center justify-center bg-white text-black rounded-xl py-1 px-2 font-medium text-xs sm:text-sm border border-gray-200 hover:bg-gray-100 transition-colors min-w-[80px]" onClick={() => setNotesOpen(true)}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h6"/></svg>
          {t.notes}
        </button>
      </div>
      {/* Notification Card UI */}
      <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 w-full">
        {/* Notification 1: PRO mode activated */}
        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-xl p-1 sm:p-1.5 w-full text-left hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-150 cursor-pointer"
          aria-label={t.proMode}
          onClick={() => handleConfirm(goToProFeatures, 'pro')}
        >
          <div className="bg-white rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="10" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs sm:text-sm leading-tight">{t.proMode}</div>
            <div className="text-gray-500 text-xs truncate">{t.allPremium}</div>
          </div>
          <svg className="w-5 h-5 text-gray-700 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
        {/* Notification 2: New Candidate Added */}
        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 bg-gray-200 rounded-xl p-1 sm:p-1.5 w-full text-left hover:bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-150 cursor-pointer"
          aria-label={t.newCandidate}
          onClick={() => handleConfirm(goToCandidates, 'candidates')}
        >
          <div className="bg-white rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs sm:text-sm leading-tight">{t.newCandidate}</div>
            <div className="text-gray-500 text-xs truncate">{t.newCandidateDesc}</div>
          </div>
          <svg className="w-5 h-5 text-gray-700 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
        {/* Notification 3: Phase Deadline Soon */}
        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-xl p-1 sm:p-1.5 w-full text-left hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-150 cursor-pointer"
          aria-label={t.phaseDeadline}
          onClick={() => handleConfirm(goToDashboard, 'dashboard')}
        >
          <div className="bg-white rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V7a8 8 0 1 0-16 0v5c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs sm:text-sm leading-tight">{t.phaseDeadline}</div>
            <div className="text-gray-500 text-xs truncate">{t.phaseDeadlineDesc}</div>
          </div>
          <svg className="w-5 h-5 text-gray-700 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
} 