import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

interface InterviewRoundsProps {
  onViewCandidates: () => void
  onViewCandidatesRound2: () => void
  language: 'en' | 'es' | 'fr'
  setLanguage: (lang: 'en' | 'es' | 'fr') => void
}

export function InterviewRounds({ onViewCandidates, onViewCandidatesRound2 }: InterviewRoundsProps) {
  // Use window.location.assign for navigation
  const [, setHighlightedCandidate] = useState<string | null>(null);
  const [proDismissed] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-3 animate-in fade-in slide-in-from-bottom-4">
      {/* Round 1 Card */}
      <Card className="rounded-lg p-2 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] w-full h-36 min-h-[180px] md:min-h-0">
        <div className="flex items-center gap-1 mb-1 flex-wrap">
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">Interview Dates</span>
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded flex items-center gap-1">
            <span className="w-3 h-3 inline-block"><svg viewBox="0 0 24 24" fill="none" className="w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="ml-1">10 Candidates</span>
          </span>
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded text-green-700 font-medium">Completed</span>
        </div>
        <div className="font-bold text-xl md:text-xl leading-tight mt-[-20px] mb-[-20px]">Round 1</div>
        <div className="text-gray-500 text-sm mt-[-2px] mb-0">Initial Review</div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
          <div className="flex flex-wrap items-center -mt-1 gap-1">
                  <div className="flex -space-x-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User 2" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 3" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <div className="bg-emerald-700 text-white text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full ml-0 md:ml-2">+5</div>
                  </div>
                  
                </div>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 text-xs h-7 rounded-xl flex items-center justify-center gap-1 px-2 py-0.5 min-w-0 ml-5 -mt-2"
              onClick={onViewCandidates}
            >
              View Candidates <ArrowRight className="ml-0 w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Round 2 Card */}
      <Card className="rounded-lg p-2 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] w-full h-36 min-h-[180px] md:min-h-0 mb-3">
        <div className="flex items-center gap-1 mb-1 flex-wrap">
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">Interview Dates</span>
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded flex items-center gap-1">
            <span className="w-3 h-3 inline-block"><svg viewBox="0 0 24 24" fill="none" className="w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="ml-1">10 Candidates</span>
          </span>
          <span className="text-xs bg-gray-100 px-1 py-0.5 rounded text-orange-700 font-medium">In Progress</span>
        </div>
        <div className="font-bold text-xl md:text-xl leading-tight mt-[-20px] mb-[-20px]">Round 2</div>
        <div className="text-gray-500 text-sm mt-[-2px] mb-0">Initial Review</div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-wrap items-center -mt-1 gap-1">
          <div className="flex flex-wrap items-center -mt-1 gap-1">
                  <div className="flex -space-x-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User 2" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 3" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    <div className="bg-emerald-700 text-white text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full ml-0 md:ml-2">+3</div>
                  </div>
                 </div>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 text-xs h-7 rounded-xl flex items-center justify-center gap-1 px-2 py-0.5 min-w-0 ml-5 -mt-2"
              onClick={onViewCandidatesRound2}
            >
              View Candidates <ArrowRight className="ml-0 w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="rounded-lg p-1 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] min-h-[60px] flex flex-col justify-between col-span-1 md:col-span-2 xl:col-span-1 w-full">
        {/* Notification Buttons */}
        <div className="flex flex-col gap-1 w-full">
          {!proDismissed && (
            <Button
              className="flex items-center w-full bg-white rounded-xl shadow-sm px-4 py-2 h-12 mb-0 hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded bg-gray-100 text-gray-700 flex-shrink-0 mr-2">
                {/* Toggle switch icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="3" y="7" width="18" height="10" rx="5" stroke="black" strokeWidth="2" fill="none"/><circle cx="16" cy="12" r="4" fill="black"/></svg>
              </div>
              <div className="flex-1 min-w-0 text-left ml-[-12px]">
                <div className="font-bold text-xs text-gray-900 leading-tight">PRO mode activated</div>
                <div className="text-gray-500 text-[10px] truncate">All premium features are now available…</div>
              </div>
              <div className="flex items-center justify-center ml-1">
                {/* Arrow icon */}
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400"><path d="M5 12h8M9 8l4 4-4 4"/></svg>
              </div>
            </Button>
          )}
          {/* New candidate added (active) */}
          <button
            className="flex items-center w-full bg-white rounded-xl shadow-sm px-1 py-0.5 mb-0.5 hover:bg-gray-100 transition"
            onClick={() => {
              setHighlightedCandidate("Alex Johnson");
              window.location.assign("/candidates/alex-johnson");
            }}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-700 flex-shrink-0 mr-1">
              {/* User-plus icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
          </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-bold text-xs text-gray-900 leading-tight">New candidate added</div>
              <div className="text-gray-500 text-[10px] truncate">Alex Johnson has entered the Tech Review phase…</div>
            </div>
            <div className="flex items-center justify-center ml-1">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400"><path d="M5 12h8M9 8l4 4-4 4"/></svg>
            </div>
          </button>
          {/* Phase deadline soon */}
          <button className="flex items-center w-full bg-white rounded-xl shadow-sm px-1 py-0.5 hover:bg-gray-100 transition">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-700 flex-shrink-0 mr-1">
              {/* Bell icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-bold text-xs text-gray-900 leading-tight">Phase deadline soon</div>
              <div className="text-gray-500 text-[10px] truncate">Initial Review Phase 3 ends in 2 days…</div>
            </div>
            <div className="flex items-center justify-center ml-1">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400"><path d="M5 12h8M9 8l4 4-4 4"/></svg>
            </div>
          </button>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-200 m-0 p-0 w-full" style={{ height: '1px', marginTop: '-12px' }}></div>
        {/* Bottom Row */}
        <div className="flex items-center gap-0 m-0 p-0 w-full -mt-6" style={{ marginTop: '-12px' }}>
          <Button className="flex-1 bg-black text-white hover:bg-emerald-700 text-xs h-8 rounded-xl flex items-center justify-center gap-1 px-1 py-0.5 min-w-0">
            See all notifications
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-1"><path d="M5 12h8M9 8l4 4-4 4"/></svg>
          </Button>
          <Button variant="ghost" className="flex items-center gap-1 text-xs h-8 rounded-xl px-1 py-0.5 min-w-0 hover:bg-emerald-700">
            <span className="font-bold text-base">@</span> Notes
          </Button>
        </div>
      </Card>
    </div>
  )
} 