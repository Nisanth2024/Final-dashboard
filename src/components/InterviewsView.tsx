import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { ArrowLeft } from "lucide-react";
import { allCandidates } from "./CandidatesView";


export function InterviewsView({ onBack }: { onBack?: () => void }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [interviewTitle, setInterviewTitle] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [roundType, setRoundType] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  // Example team/candidate lists
  type Interview = {
    title: string;
    date: string;
    time: string;
    interviewers: string[];
    candidates: string[];
    roundType: string;
    duration: string;
    instructions: string;
  };
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [] = useState<number | null>(null);

  const interviewers = [
    { name: "John Doe", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Ryan King", img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Sarah Miller", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Priya Patel", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Alex Lee", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Maria Garcia", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "David Kim", img: "https://randomuser.me/api/portraits/men/23.jpg" },
    { name: "Emily Chen", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];

  const defaultInterviews: Interview[] = [
    {
      title: "Frontend Developer - Technical Round",
      date: "2025-08-01",
      time: "10:00",
      interviewers: ["John Doe", "Sarah Miller"],
      candidates: ["Sarah Johnson", "Michael Chen"],
      roundType: "Technical",
      duration: "45 min",
      instructions: "Bring your laptop and portfolio."
    },
    {
      title: "Backend Developer - Screening",
      date: "2025-08-02",
      time: "14:00",
      interviewers: ["Ryan King", "Alex Lee"],
      candidates: ["Emily Rodriguez", "David Kim"],
      roundType: "Screening",
      duration: "30 min",
      instructions: "Prepare for algorithm questions."
    },
    {
      title: "UI/UX Designer - HR Round",
      date: "2025-08-03",
      time: "11:30",
      interviewers: ["Priya Patel"],
      candidates: ["Lisa Thompson"],
      roundType: "HR",
      duration: "20 min",
      instructions: "Discuss your design process."
    }
  ];

  useEffect(() => {
    setInterviews(defaultInterviews);
  }, []);

  const handleEditInterview = (index: number) => {
    const interviewToEdit = interviews[index];
    setInterviewTitle(interviewToEdit.title);
    setInterviewDate(interviewToEdit.date);
    setInterviewTime(interviewToEdit.time);
    setSelectedInterviewer(interviewToEdit.interviewers[0] || "");
    setSelectedCandidate(interviewToEdit.candidates[0] || "");
    setRoundType(interviewToEdit.roundType);
    setDuration(interviewToEdit.duration);
    setInstructions(interviewToEdit.instructions);
    setCreateOpen(true);
  };

  const handleDeleteInterview = (index: number) => {
    setInterviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
      {onBack && (
            <Button variant="ghost" size="icon" className="hover:bg-emerald-700" onClick={onBack} aria-label="Back">
              <ArrowLeft className="w-5 h-5" />
        </Button>
      )}
          <h1 className="text-xl font-bold">Interviews</h1>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="bg-black text-white hover:bg-emerald-700">Create Interview</Button>
      </div>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Interview</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Interview Title (e.g., Junior Frontend Developer - Round 1)"
              value={interviewTitle}
              onChange={e => setInterviewTitle(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Input
                type="date"
                placeholder="Date"
                value={interviewDate}
                onChange={e => setInterviewDate(e.target.value)}
                required
              />
              <Input
                type="time"
                placeholder="Time"
                value={interviewTime}
                onChange={e => setInterviewTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Interviewers</label>
              <Select value={selectedInterviewer} onValueChange={setSelectedInterviewer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {interviewers.map((user) => (
                    <SelectItem key={user.name} value={user.name}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Candidates</label>
              <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  {allCandidates.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Round Type</label>
              <Select value={roundType} onValueChange={setRoundType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select round type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Screening">Screening</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Duration (e.g., 30 min)"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
            />
            <Textarea
              placeholder="Instructions (optional guidelines or documents)"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setInterviews(prev => [
                ...prev,
                {
                  title: interviewTitle,
                  date: interviewDate,
                  time: interviewTime,
                  interviewers: selectedInterviewer ? [selectedInterviewer] : [],
                  candidates: selectedCandidate ? [selectedCandidate] : [],
                  roundType,
                  duration,
                  instructions,
                }
              ]);
              setCreateOpen(false);
              setInterviewTitle("");
              setInterviewDate("");
              setInterviewTime("");
              setSelectedInterviewer("");
              setSelectedCandidate("");
              setRoundType("");
              setDuration("");
              setInstructions("");
            }} className="hover:bg-emerald-700">Create</Button>
            <DialogClose asChild>
              <Button variant="ghost" className="hover:bg-emerald-700">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* List of created interviews */}
      <div className="mt-6 space-y-4">
        {interviews.length === 0 ? (
          <div className="text-gray-500 text-center">No interviews created yet.</div>
        ) : (
          interviews.map((iv, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col gap-1 w-full max-w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="font-semibold text-base sm:text-lg truncate text-gray-700">{iv.title}</div>
                <div className="flex flex-row gap-1">
                  <Button size="sm" variant="outline" className="text-xs px-2 py-1 bg-black text-white hover:bg-emerald-700 border-none" onClick={() => handleEditInterview(idx)}>Edit</Button>
                  <Button size="sm" variant="destructive" className="text-xs px-2 py-1 text-red-600 bg-red-100 border-none" onClick={() => handleDeleteInterview(idx)}>Delete</Button>
                </div>
              </div>
              {/* Details (always expanded, since arrow is removed) */}
              <div className="text-xs text-gray-700 mt-2">
                <div>Date: <span className="text-emerald-700">{iv.date} {iv.time}</span></div>
                <div>Round: <span className="text-emerald-700">{iv.roundType}</span> &bull; <span className="text-emerald-700">{iv.duration}</span></div>
                <div>Interviewers: <span className="text-gray-600">{iv.interviewers.join(", ")}</span></div>
                <div>Candidates: <span className="text-gray-600">{iv.candidates.join(", ")}</span></div>
                {iv.instructions && <div className="text-gray-500">Instructions: {iv.instructions}</div>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 