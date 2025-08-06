import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Grid } from "@/components/ui/grid"
import { Flex } from "@/components/ui/flex"
import { Stack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Star, Eye, MessageSquare, Download, Filter as FilterIcon, MoreHorizontal, Send } from "lucide-react"
import { useState } from "react"
// No need to import Candidate or DialogProps
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export type Candidate = {
  id: number
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  rating: number
  appliedDate: string
  experience: string
  skills: string[]
  department: 'Design Department' | 'Engineering Department'
}

// Round 1 candidates (10 candidates)
export const round1Candidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "reviewed",
    rating: 4.5,
    appliedDate: "June 12, 2025",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    department: "Engineering Department"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "shortlisted",
    rating: 4.8,
    appliedDate: "June 13, 2025",
    experience: "7 years",
    skills: ["Vue.js", "Python", "Docker", "MongoDB"],
    department: "Design Department"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    status: "pending",
    rating: 4.2,
    appliedDate: "June 14, 2025",
    experience: "3 years",
    skills: ["Angular", "Java", "Spring Boot", "MySQL"],
    department: "Engineering Department"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    status: "reviewed",
    rating: 4.6,
    appliedDate: "June 15, 2025",
    experience: "6 years",
    skills: ["React Native", "Firebase", "GraphQL", "Redux"],
    department: "Design Department"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Boston, MA",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    status: "shortlisted",
    rating: 4.9,
    appliedDate: "June 16, 2025",
    experience: "8 years",
    skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    department: "Engineering Department"
  },
  {
    id: 6,
    name: "Alex Martinez",
    email: "alex.martinez@email.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    status: "reviewed",
    rating: 4.3,
    appliedDate: "June 17, 2025",
    experience: "4 years",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    department: "Engineering Department"
  },
  {
    id: 7,
    name: "Jessica Wang",
    email: "jessica.wang@email.com",
    phone: "+1 (555) 789-0123",
    location: "Los Angeles, CA",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    status: "shortlisted",
    rating: 4.7,
    appliedDate: "June 18, 2025",
    experience: "6 years",
    skills: ["Vue.js", "TypeScript", "Tailwind CSS", "Vite"],
    department: "Design Department"
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    status: "pending",
    rating: 4.1,
    appliedDate: "June 19, 2025",
    experience: "2 years",
    skills: ["JavaScript", "React", "Node.js", "Express"],
    department: "Engineering Department"
  },
  {
    id: 9,
    name: "Amanda Lee",
    email: "amanda.lee@email.com",
    phone: "+1 (555) 901-2345",
    location: "Denver, CO",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    status: "reviewed",
    rating: 4.4,
    appliedDate: "June 20, 2025",
    experience: "5 years",
    skills: ["Angular", "TypeScript", "RxJS", "Material UI"],
    department: "Engineering Department"
  },
  {
    id: 10,
    name: "Kevin Brown",
    email: "kevin.brown@email.com",
    phone: "+1 (555) 012-3456",
    location: "Portland, OR",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    status: "shortlisted",
    rating: 4.6,
    appliedDate: "June 21, 2025",
    experience: "7 years",
    skills: ["React", "Redux", "TypeScript", "Jest"],
    department: "Engineering Department"
  }
];

// Round 2 candidates (10 different candidates)
export const round2Candidates: Candidate[] = [
  {
    id: 11,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 111-2222",
    location: "Phoenix, AZ",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    status: "reviewed",
    rating: 4.8,
    appliedDate: "June 22, 2025",
    experience: "6 years",
    skills: ["Vue.js", "JavaScript", "CSS3", "Webpack"],
    department: "Design Department"
  },
  {
    id: 12,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 222-3333",
    location: "Nashville, TN",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    status: "shortlisted",
    rating: 4.9,
    appliedDate: "June 23, 2025",
    experience: "8 years",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    department: "Engineering Department"
  },
  {
    id: 13,
    name: "Sophia Davis",
    email: "sophia.davis@email.com",
    phone: "+1 (555) 333-4444",
    location: "Las Vegas, NV",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    status: "pending",
    rating: 4.3,
    appliedDate: "June 24, 2025",
    experience: "3 years",
    skills: ["Angular", "JavaScript", "Bootstrap", "Firebase"],
    department: "Engineering Department"
  },
  {
    id: 14,
    name: "Daniel Anderson",
    email: "daniel.anderson@email.com",
    phone: "+1 (555) 444-5555",
    location: "Orlando, FL",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    status: "reviewed",
    rating: 4.5,
    appliedDate: "June 25, 2025",
    experience: "5 years",
    skills: ["React Native", "JavaScript", "Expo", "Firebase"],
    department: "Design Department"
  },
  {
    id: 15,
    name: "Olivia Thomas",
    email: "olivia.thomas@email.com",
    phone: "+1 (555) 555-6666",
    location: "San Diego, CA",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    status: "shortlisted",
    rating: 4.7,
    appliedDate: "June 26, 2025",
    experience: "7 years",
    skills: ["Vue.js", "TypeScript", "Nuxt.js", "Tailwind CSS"],
    department: "Engineering Department"
  },
  {
    id: 16,
    name: "Christopher Moore",
    email: "christopher.moore@email.com",
    phone: "+1 (555) 666-7777",
    location: "Dallas, TX",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    status: "reviewed",
    rating: 4.2,
    appliedDate: "June 27, 2025",
    experience: "4 years",
    skills: ["React", "JavaScript", "Redux", "Material UI"],
    department: "Engineering Department"
  },
  {
    id: 17,
    name: "Emma Jackson",
    email: "emma.jackson@email.com",
    phone: "+1 (555) 777-8888",
    location: "Houston, TX",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    status: "pending",
    rating: 4.4,
    appliedDate: "June 28, 2025",
    experience: "6 years",
    skills: ["Angular", "TypeScript", "RxJS", "Bootstrap"],
    department: "Design Department"
  },
  {
    id: 18,
    name: "Andrew White",
    email: "andrew.white@email.com",
    phone: "+1 (555) 888-9999",
    location: "Atlanta, GA",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    status: "shortlisted",
    rating: 4.6,
    appliedDate: "June 29, 2025",
    experience: "5 years",
    skills: ["React", "TypeScript", "Next.js", "Prisma"],
    department: "Engineering Department"
  },
  {
    id: 19,
    name: "Isabella Clark",
    email: "isabella.clark@email.com",
    phone: "+1 (555) 999-0000",
    location: "Philadelphia, PA",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    status: "reviewed",
    rating: 4.8,
    appliedDate: "June 30, 2025",
    experience: "7 years",
    skills: ["Vue.js", "JavaScript", "Vite", "Pinia"],
    department: "Engineering Department"
  },
  {
    id: 20,
    name: "Ryan Lewis",
    email: "ryan.lewis@email.com",
    phone: "+1 (555) 000-1111",
    location: "Detroit, MI",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    status: "shortlisted",
    rating: 4.9,
    appliedDate: "July 1, 2025",
    experience: "8 years",
    skills: ["React", "TypeScript", "Redux Toolkit", "Jest"],
    department: "Design Department"
  }
];

// All candidates (combined for general view)
export const allCandidates: Candidate[] = [...round1Candidates, ...round2Candidates];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'reviewed':
      return 'bg-blue-100 text-blue-800';
    case 'shortlisted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'reviewed':
      return 'Reviewed';
    case 'shortlisted':
      return 'Shortlisted';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};

interface CandidatesViewProps {
  onBack: () => void
  round?: 1 | 2
  all?: boolean
  department?: string
  onDepartmentChange?: (dept: string) => void
  candidates?: Candidate[]
  onDeleteCandidate?: (id: number) => void
  language: 'en' | 'es' | 'fr'
  setLanguage: (lang: 'en' | 'es' | 'fr') => void
  departments: { name: string, color: string }[]
}

interface ExtendedCandidatesViewProps extends CandidatesViewProps {
  filterOpen?: boolean;
  setFilterOpen?: (open: boolean) => void;
  filterStatus?: string[];
  setFilterStatus?: (s: string[]) => void;
  filterDept?: string;
  setFilterDept?: (d: string) => void;
  dropdownOpen?: boolean;
  setDropdownOpen?: (open: boolean) => void;
  handleDropdown?: () => void;
  handleSelect?: (dept: string) => void;
  handleExport?: () => void;
}

export function CandidatesView({
  onBack,
  round = 1,
  all = false,
  department = 'All',
  candidates: propCandidates,
  onDeleteCandidate,
  filterOpen = false,
  setFilterOpen = () => {},
  filterStatus = [],
  setFilterStatus = () => {},
  filterDept = 'All',
  setFilterDept = () => {},
}: ExtendedCandidatesViewProps & { handleDropdown?: () => void }) {
  const getCandidatesForRound = () => {
    if (propCandidates) {
      return propCandidates;
    }
    
  if (all) {
      return [...round1Candidates, ...round2Candidates];
    }
    
    if (round === 1) {
      return round1Candidates;
  } else if (round === 2) {
      return round2Candidates;
    }
    
    return round1Candidates;
  };

  const candidates = getCandidatesForRound();

  // Add state for selected department
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  // Update the filteredCandidates logic to use selectedDepartment
  const filteredCandidates = (candidates || []).filter((c: any) => {
    const statusMatch = (filterStatus && filterStatus.length === 0) || (filterStatus && filterStatus.includes(c.status));
    const deptMatch =
      !selectedDepartment ||
      selectedDepartment === "All Departments" ||
      c.department === selectedDepartment;
    return statusMatch && deptMatch;
  });

  // CSV Export utility
  function exportCandidatesToCSV() {
    if (!filteredCandidates || filteredCandidates.length === 0) return;
    const headers = [
      'Name', 'Email', 'Phone', 'Location', 'Status', 'Rating', 'Applied Date', 'Experience', 'Skills', 'Department'
    ];
    const rows = filteredCandidates.map(c => [
      c.name,
      c.email,
      c.phone,
      c.location,
      c.status,
      c.rating,
      c.appliedDate,
      c.experience,
      c.skills.join('; '),
      c.department
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'candidates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null)
  // Add state for preview modal
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null);
  // Add state for comments modal and comments storage
  const [commentsCandidate, setCommentsCandidate] = useState<Candidate | null>(null);
  const [commentsMap, setCommentsMap] = useState<{ [id: number]: string[] }>({});
  const [newComment, setNewComment] = useState("");

  return (
    <div className="bg-gray-200 p-2 sm:p-4 md:p-6 rounded-lg min-h-screen flex flex-col">
      <Flex direction="col" className="w-full min-w-0 flex-1">
        <Flex align="center" justify="between" className="w-full gap-2 mb-4">
          <Flex align="center" gap={2}>
            <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-emerald-700" onClick={onBack} aria-label="Back">
              <ArrowLeft className="w-5 h-5" />
          </Button>
            <Typography variant="h1" size="lg" weight="bold" className="text-base sm:text-lg md:text-xl">
              All Candidates
            </Typography>
          </Flex>
        </Flex>
      </Flex>

      {/* Stats */}
      <Grid cols={4} gap={2} className="grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-blue-600">
              {filteredCandidates.length}
            </Typography>
            <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
              Total Candidates
            </Typography>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-yellow-600">
              {filteredCandidates.filter(c => c.status === 'pending').length}
            </Typography>
            <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
              Pending Review
            </Typography>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-emerald-700">
              {filteredCandidates.filter(c => c.status === 'shortlisted').length}
            </Typography>
            <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
              Shortlisted
            </Typography>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <Typography variant="h2" size="xl" weight="bold" className="text-xl font-bold text-red-600">
              {filteredCandidates.filter(c => c.status === 'rejected').length}
            </Typography>
            <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-600">
              Rejected
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Candidates List */}
      <Stack spacing={3} className="flex flex-col gap-3 w-full">
        {(filteredCandidates && filteredCandidates.length === 0) ? (
          <Typography variant="p" size="lg" color="muted" align="center" className="text-center text-gray-500 text-lg py-12">
            No candidates found
          </Typography>
        ) : (
            filteredCandidates.map(candidate => (
              <Card key={candidate.id} className="bg-white rounded-md shadow p-3 sm:p-4 md:p-5 text-sm">
              <CardContent className="p-1.5 md:p-2">
                <Flex align="start" justify="between" wrap="wrap">
                  <Flex align="start" gap={3}>
                    <Avatar className="w-10 h-10 md:w-12 md:h-12">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback className="text-xs md:text-sm">
                        {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-0.5">
                      <Flex align="center" gap={2}>
                        <Typography variant="h3" size="lg" weight="semibold" className="text-base md:text-lg font-semibold">
                          {candidate.name}
                        </Typography>
                        <Badge className={getStatusColor(candidate.status)}>
                          {getStatusText(candidate.status)}
                        </Badge>
                        <Flex align="center" gap={1}>
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                          <Typography variant="span" size="xs" weight="medium" className="text-xs md:text-sm font-medium">
                            {candidate.rating}
                          </Typography>
                        </Flex>
                      </Flex>
                      <Grid cols={4} gap={1} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 text-xs md:text-sm text-gray-600">
                        <Flex align="center" gap={1}>
                          <Mail className="w-3 h-3 md:w-4 md:h-4" />
                          <Typography variant="span" size="xs" color="muted" className="truncate">
                            {candidate.email}
                          </Typography>
                        </Flex>
                        <Flex align="center" gap={1}>
                          <Phone className="w-3 h-3 md:w-4 md:h-4" />
                          <Typography variant="span" size="xs" color="muted" className="truncate">
                            {candidate.phone}
                          </Typography>
                        </Flex>
                        <Flex align="center" gap={1}>
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <Typography variant="span" size="xs" color="muted" className="truncate">
                            {candidate.location}
                          </Typography>
                        </Flex>
                        <Flex align="center" gap={1}>
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <Typography variant="span" size="xs" color="muted" className="truncate">
                            Applied Date {candidate.appliedDate}
                          </Typography>
                        </Flex>
                      </Grid>
                      <Stack spacing={0.5}>
                        <Typography variant="p" size="xs" className="text-xs md:text-sm">
                          <Typography variant="span" size="xs" weight="medium">Experience:</Typography> {candidate.experience}
                        </Typography>
                        <Flex align="center" gap={1} wrap="wrap">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0.5">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs px-1 py-0.5">
                              +{candidate.skills.length - 3} More
                            </Badge>
                          )}
                        </Flex>
                        <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500">
                          {candidate.department}
                        </Typography>
                      </Stack>
                    </div>
                  </Flex>
                  <Flex align="center" gap={1} className="flex-shrink-0 max-w-full overflow-x-auto">
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8 hover:bg-emerald-700" onClick={() => setPreviewCandidate(candidate)}>
                      <Eye className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8 hover:bg-emerald-700" onClick={() => setCommentsCandidate(candidate)}>
                      <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8 hover:bg-emerald-700">
                          <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => setDeleteDialogOpen(candidate.id)}
                        >
                          <Typography variant="span" size="sm">Delete</Typography>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Flex>
                </Flex>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>Are you sure you want to delete this candidate?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
              <Typography variant="span" size="sm">Cancel</Typography>
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => { 
                if (deleteDialogOpen && onDeleteCandidate) {
                  onDeleteCandidate(deleteDialogOpen); 
                } 
                setDeleteDialogOpen(null); 
              }}
            >
              <Typography variant="span" size="sm">Delete</Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Modal */}
      <Dialog open={previewCandidate !== null} onOpenChange={() => setPreviewCandidate(null)}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Candidate Details</DialogTitle>
            </DialogHeader>
            {previewCandidate && (
            <div className="space-y-4">
              <Flex align="center" gap={3}>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={previewCandidate.avatar} />
                  <AvatarFallback className="text-lg">
                    {previewCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
              </Avatar>
                <div>
                  <Typography variant="h3" size="lg" weight="bold" className="text-xl font-bold">
                    {previewCandidate.name}
                  </Typography>
                  <Typography variant="p" size="sm" color="muted" className="text-gray-600">
                    {previewCandidate.email}
                  </Typography>
                  <Badge className={getStatusColor(previewCandidate.status)}>
                    {getStatusText(previewCandidate.status)}
                  </Badge>
              </div>
              </Flex>
              
              <Grid cols={2} gap={4}>
                <div>
                  <Typography variant="h4" size="sm" weight="semibold" className="font-semibold mb-2">
                    Contact Information
                  </Typography>
                  <Stack spacing={2}>
                    <Flex align="center" gap={2}>
                      <Mail className="w-4 h-4" />
                      <Typography variant="span" size="sm">{previewCandidate.email}</Typography>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Phone className="w-4 h-4" />
                      <Typography variant="span" size="sm">{previewCandidate.phone}</Typography>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <MapPin className="w-4 h-4" />
                      <Typography variant="span" size="sm">{previewCandidate.location}</Typography>
                    </Flex>
                  </Stack>
              </div>
                
                <div>
                  <Typography variant="h4" size="sm" weight="semibold" className="font-semibold mb-2">
                    Application Details
                  </Typography>
                  <Stack spacing={2}>
                    <Flex align="center" gap={2}>
                      <Calendar className="w-4 h-4" />
                      <Typography variant="span" size="sm">Applied: {previewCandidate.appliedDate}</Typography>
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Typography variant="span" size="sm">Rating: {previewCandidate.rating}</Typography>
                    </Flex>
                    <Typography variant="span" size="sm">
                      Experience: {previewCandidate.experience}
                    </Typography>
                  </Stack>
                </div>
              </Grid>
              
              <div>
                <Typography variant="h4" size="sm" weight="semibold" className="font-semibold mb-2">
                  Skills
                </Typography>
                <Flex align="center" gap={1} wrap="wrap">
                  {previewCandidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </div>
            </div>
            )}
            <DialogFooter>
            <Button onClick={() => setPreviewCandidate(null)}>
              <Typography variant="span" size="sm">Close</Typography>
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      
      {/* Comments Modal */}
      <Dialog open={commentsCandidate !== null} onOpenChange={() => setCommentsCandidate(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>Add notes about this candidate.</DialogDescription>
          </DialogHeader>
          {commentsCandidate && (
            <div className="space-y-4">
            <div>
                <Label htmlFor="new-comment">Add Comment</Label>
                <Input
                  id="new-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment..."
                />
              </div>
              
              <Button 
                onClick={() => {
                  if (newComment.trim() && commentsCandidate) {
                    const candidateId = commentsCandidate.id;
                    setCommentsMap(prev => ({
                      ...prev,
                      [candidateId]: [...(prev[candidateId] || []), newComment]
                    }));
                    setNewComment("");
                  }
                }}
                disabled={!newComment.trim()}
                className="w-full"
              >
                <Typography variant="span" size="sm">Add Comment</Typography>
              </Button>
              
              <div className="max-h-40 overflow-y-auto">
                <Stack spacing={2}>
                  {(commentsMap[commentsCandidate.id] || []).map((comment, index) => (
                    <Card key={index} className="p-2">
                      <Typography variant="p" size="sm">{comment}</Typography>
                    </Card>
                  ))}
                </Stack>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setCommentsCandidate(null)}>
              <Typography variant="span" size="sm">Close</Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CandidatesView;