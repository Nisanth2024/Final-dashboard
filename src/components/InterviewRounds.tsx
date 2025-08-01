import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Users } from "lucide-react"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Round 1 Card */}
      <Card className="w-full max-w-full min-h-[180px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden">
        <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pt-0">
          <div className="flex items-center gap-[2px] flex-wrap mb-[-20px]">
            <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3">
              Aug 10 - Aug 20
            </Badge>
            <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1">
              <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>10 Candidates</span>
            </Badge>
            <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-green-700 bg-green-100">
              Completed
            </Badge>
        </div>
        </CardHeader>
        
        <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pb-0">
          <CardTitle className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-tight mb-0">
            Round 1
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Initial Review
          </CardDescription>
        </CardContent>
        
        <CardFooter className="px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pb-0 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex -space-x-1 sm:-space-x-2 md:-space-x-3 lg:-space-x-3 xl:-space-x-4">
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">RK</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">SM</AvatarFallback>
              </Avatar>
              <div className="bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full border-2 border-white">
                +5
              </div>
            </div>
              <Button
              size="sm"
              className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 bg-black text-white hover:bg-emerald-700 hover:text-white"
                onClick={onViewCandidates}
              >
              <span className="truncate">View Candidates</span>
              <ArrowRight className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex-shrink-0" />
              </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Round 2 Card */}
      <Card className="w-full max-w-full min-h-[180px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden">
        <CardHeader className="pb-0 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pt-0">
          <div className="flex items-center gap-[2px] flex-wrap mb-[-20px]">
            <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3">
              Aug 10 - Aug 20
            </Badge>
            <Badge variant="outline" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 flex items-center gap-1">
              <Users className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span>10 Candidates</span>
            </Badge>
            <Badge variant="secondary" className="text-[9px] sm:text-xs leading-tight px-1 py-0.3 text-orange-700 bg-orange-100">
              In Progres
            </Badge>
        </div>
        </CardHeader>
        
        <CardContent className="flex-1 px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pb-0">
          <CardTitle className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-tight mb-0">
            Round 2
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Initial Review
          </CardDescription>
        </CardContent>
        
        <CardFooter className="px-3 sm:px-3 md:px-4 lg:px-4 xl:px-5 pb-0 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex -space-x-1 sm:-space-x-2 md:-space-x-3 lg:-space-x-3 xl:-space-x-4">
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">RK</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                <AvatarFallback className="text-[8px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm">SM</AvatarFallback>
              </Avatar>
              <div className="bg-emerald-700 text-white text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm font-medium w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full border-2 border-white">
                +3
              </div>
            </div>
              <Button
              size="sm"
              className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-2.5 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 bg-black text-white hover:bg-emerald-700 hover:text-white"
                onClick={onViewCandidatesRound2}
              >
              <span className="truncate">View Candidates</span>
              <ArrowRight className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex-shrink-0" />
              </Button>
          </div>
        </CardFooter>
      </Card>
    </div>

  )
} 