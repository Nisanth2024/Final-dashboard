
import { ChevronRight, ChevronDown, Download, Filter as FilterIcon, Plus, ArrowRight, X } from "lucide-react"



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { Grid } from "./ui/grid"
import { Flex } from "./ui/flex"
import { Stack } from "./ui/stack"
import { Typography } from "./ui/typography"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"


export function MainContent({ language, setLanguage, departments, Round1Card, Round2Card, NotificationPanel }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void, departments: { name: string, color: string }[], setDepartments: (depts: { name: string, color: string }[]) => void, Round1Card: React.ComponentType<{ onViewCandidates: () => void }>, Round2Card: React.ComponentType<{ onViewCandidatesRound2: () => void }>, NotificationPanel: React.ComponentType<{ language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }> }) {
  const t = useTranslation(language);





  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-200 overflow-x-hidden flex flex-col pt-4 pb-9 scroll-pt-16 min-w-0"
    >


      {/* Main Content Area - Responsive Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex-1 flex flex-col gap-4 sm:gap-4 md:gap-2 mb-10"
      >
        {/* ROUND Panel and Notification Panel - Enhanced Responsive Layout */}
        <Stack spacing={4} className="flex flex-col w-full gap-4 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8">
          {/* Mobile & Tablet: Stacked Layout */}
          <Grid cols={1} gap={4} className="grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:hidden gap-4 sm:gap-4 md:gap-4">
        <Card className="w-full">
          <CardContent className="p-0">
            <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
              <Round1Card onViewCandidates={() => {}} />
              <Round2Card onViewCandidatesRound2={() => {}} />
            </Grid>
          </CardContent>
        </Card>
            <Card className="w-full">
              <CardContent className="p-0">
                <NotificationPanel language={language} setLanguage={setLanguage} />
              </CardContent>
            </Card>
          </Grid>
          
          {/* Nest Hub & iPad Pro: Special Stacked Layout */}
          <Grid cols={2} gap={6} className="hidden lg:grid lg:grid-cols-1 xl:hidden 2xl:grid-cols-[2.2fr_1fr] gap-4 lg:gap-6 xl:gap-8">
            <Card className="w-full h-full flex flex-col justify-between">
              <CardContent className="p-0">
                <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                  <Round1Card onViewCandidates={() => {}} />
                  <Round2Card onViewCandidatesRound2={() => {}} />
                </Grid>
              </CardContent>
            </Card>
            <Card className="w-full h-full flex flex-col justify-start items-start">
              <CardContent className="p-0">
                <NotificationPanel language={language} setLanguage={setLanguage} />
              </CardContent>
            </Card>
          </Grid>

          {/* Nest Hub Max: Special Layout - Swapped Positions */}
          <Grid cols={2} gap={0} className="hidden xl:grid xl:grid-cols-[2.3fr_1.1fr] 2xl:hidden gap-0 lg:gap-0 xl:gap-0">
           
            {/* Right Side: Interview Rounds (moved from left) */}
            <Card className="w-full h-full flex flex-col justify-between items-start">
              <CardContent className="p-0">
                <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                  <Round1Card onViewCandidates={() => {}} />
                  <Round2Card onViewCandidatesRound2={() => {}} />
                </Grid>
              </CardContent>
            </Card>
             {/* Left Side: Notification Panel (moved from right) */}
             <Card className="w-full h-full flex flex-col justify-start items-start">
              <CardContent className="p-0">
                <NotificationPanel language={language} setLanguage={setLanguage} />
              </CardContent>
            </Card>
          </Grid>
          
          {/* Desktop (2XL): Swapped Layout - Notification Panel on Left, Rounds on Right */}
          <Grid cols={2} gap={4} className="hidden 2xl:grid 2xl:grid-cols-[1.8fr_1.4fr] gap-4 lg:gap-0 md:gap-0 xl:gap-2">
           
            
            {/* Right Side: Interview Rounds */}
            <Card className="w-full h-full flex flex-col justify-between">
              <CardContent className="p-0">
                <Grid cols={2} gap={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-2 animate-in fade-in slide-in-from-bottom-4">
                  <Round1Card onViewCandidates={() => {}} />
                  <Round2Card onViewCandidatesRound2={() => {}} />
                </Grid>
              </CardContent>
            </Card>

             {/* Left Side: Notification Panel */}
             <Card className="w-full h-full flex flex-col justify-start">
              <CardContent className="p-0">
                <NotificationPanel language={language} setLanguage={setLanguage} />
              </CardContent>
            </Card>
          </Grid>
        </Stack>
      </motion.div>
    </motion.div>
  )
} 