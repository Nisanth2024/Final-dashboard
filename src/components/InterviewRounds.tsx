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
  const [] = useState<string | null>(null);
  const [] = useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Round 1 Card */}
      <Card className=" max-w-full lg:w-90 flex flex-col justify-between overflow-hidden rounded-2xl p-0 sm:p-3 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] min-h-[180px] lg:h-40 space-y-2 lg:space-y-4">
        {/* Date Range - Top Section */}
        <div className="flex items-center gap-1 mb-0 flex-wrap p-3 sm:p-0">
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-1 py-0.3 rounded-sm">Aug 10 - Aug 20</span>
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-1 py-0.3 rounded-sm flex items-center gap-1">
            <span className="w-2 h-2 sm:w-4 sm:h-4 md:w-4 md:h-4 inline-block"><svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="ml-1">10 Candidates</span>
          </span>
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-0.5 py-0.3 rounded-sm text-green-700 font-medium">Completed</span>
        </div>
        
        {/* Round Title - Main Heading */}
        <div className="font-semibold text-sm sm:text-base md:text-lg leading-tight mt-[-19px] mb-[-10px] px-3 sm:px-0">Round 1</div>
        
        {/* Subheading */}
        <div className="text-xs sm:text-sm text-muted-foreground mt-[-10px] mb-0 px-3 sm:px-0">Initial Review</div>
        
        {/* Bottom Section - Avatars and Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex-wrap gap-y-2 px-3 sm:px-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex -space-x-1 sm:-space-x-2 md:-space-x-3 min-w-0 max-w-full overflow-hidden">
                <img src='https://randomuser.me/api/portraits/men/32.jpg' alt='User 1' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <img src='https://randomuser.me/api/portraits/men/45.jpg' alt='User 2' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <img src='https://randomuser.me/api/portraits/women/44.jpg' alt='User 3' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <div className='bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full ml-0 sm:ml-2'>+5</div>
              </div>
            </div>
            <div className="flex-1 text-sm sm:text-xs md:text-sm min-w-0 flex items-center">
              <Button
                className="w-full sm:w-auto min-w-0 max-w-full sm:max-w-xs truncate whitespace-nowrap text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 bg-black text-white hover:bg-emerald-700 transition-all duration-200"
                onClick={onViewCandidates}
              >
                <span className="truncate">View Candidates</span>
                <ArrowRight className="ml-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Round 2 Card */}
      <Card className="max-w-full lg:w-82 flex flex-col justify-between overflow-hidden rounded-2xl p-0 sm:p-3 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] min-h-[180px] lg:h-40 space-y-2">
        {/* Date Range - Top Section */}
        <div className="flex items-center gap-1 mb-0 flex-wrap p-3 sm:p-0">
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-1 py-0.3 rounded">Aug 10 - Aug 20 </span>
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-1 py-0.3 rounded flex items-center gap-1">
            <span className="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 inline-block"><svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="ml-1">10 Candidates</span>
          </span>
          <span className="text-[9px] sm:text-xs leading-tight border border-gray-300 bg-white px-0.5 py-0.3 rounded text-orange-700 font-medium">In Progress</span>
        </div>
        
        {/* Round Title - Main Heading */}
        <div className="font-semibold text-sm sm:text-base md:text-lg leading-tight mt-[-19px] mb-[-10px] px-3 sm:px-0">Round 2</div>
        
        {/* Subheading */}
        <div className="text-xs sm:text-sm text-muted-foreground mt-[-10px] mb-0 px-3 sm:px-0">Initial Review</div>
        
        {/* Bottom Section - Avatars and Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex-wrap gap-y-2 px-3 sm:px-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex -space-x-1 sm:-space-x-2 md:-space-x-3 min-w-0 max-w-full overflow-hidden">
                <img src='https://randomuser.me/api/portraits/men/32.jpg' alt='User 1' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <img src='https://randomuser.me/api/portraits/men/45.jpg' alt='User 2' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <img src='https://randomuser.me/api/portraits/women/44.jpg' alt='User 3' className='w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-2 border-white object-cover' />
                <div className='bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full ml-0 sm:ml-2'>+3</div>
              </div>
            </div>
            <div className="flex-1 text-sm sm:text-xs md:text-sm min-w-0 flex items-center">
              <Button
                className="w-full sm:w-auto min-w-0 max-w-full sm:max-w-xs truncate whitespace-nowrap text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 bg-black text-white hover:bg-emerald-700 transition-all duration-200"
                onClick={onViewCandidatesRound2}
              >
                <span className="truncate">View Candidates</span>
                <ArrowRight className="ml-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>

  )
} 