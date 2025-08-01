import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Mail, Phone, Calendar, MapPin, Star, Eye, MessageSquare, Download, Filter as FilterIcon, MoreHorizontal } from "lucide-react"
import { useState } from "react"
// No need to import Candidate or DialogProps
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
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

// 20 random candidates, mixed departments
export const allCandidates: Candidate[] = [
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
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    status: "rejected",
    rating: 3.8,
    appliedDate: "June 17, 2025",
    experience: "4 years",
    skills: ["Svelte", "Go", "Kubernetes", "Redis"],
    department: "Design Department"
  },
  {
    id: 7,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    status: "pending",
    rating: 4.3,
    appliedDate: "June 18, 2025",
    experience: "5 years",
    skills: ["React", "Express.js", "MongoDB", "Socket.io"],
    department: "Engineering Department"
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    status: "reviewed",
    rating: 4.7,
    appliedDate: "June 19, 2025",
    experience: "9 years",
    skills: ["Vue.js", "Laravel", "MySQL", "Docker"],
    department: "Design Department"
  },
  {
    id: 9,
    name: "Priya Singh",
    email: "priya.singh@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    status: "pending",
    rating: 4.1,
    appliedDate: "June 20, 2025",
    experience: "4 years",
    skills: ["React", "Redux", "TypeScript", "Jest"],
    department: "Engineering Department"
  },
  {
    id: 10,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 111-2222",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "reviewed",
    rating: 4.4,
    appliedDate: "June 21, 2025",
    experience: "6 years",
    skills: ["Angular", "RxJS", "NgRx", "Jasmine"],
    department: "Design Department"
  },
  {
    id: 11,
    name: "Anna Müller",
    email: "anna.mueller@email.com",
    phone: "+49 1234 567890",
    location: "Berlin, Germany",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "shortlisted",
    rating: 4.7,
    appliedDate: "June 22, 2025",
    experience: "5 years",
    skills: ["Vue.js", "Pinia", "TypeScript", "Cypress"],
    department: "Engineering Department"
  },
  {
    id: 12,
    name: "Carlos Lopez",
    email: "carlos.lopez@email.com",
    phone: "+34 600 123 456",
    location: "Madrid, Spain",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    status: "rejected",
    rating: 3.9,
    appliedDate: "June 23, 2025",
    experience: "3 years",
    skills: ["Svelte", "Node.js", "MongoDB", "Express.js"],
    department: "Design Department"
  },
  {
    id: 13,
    name: "Olivia Brown",
    email: "olivia.brown@email.com",
    phone: "+1 (555) 222-3333",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    status: "pending",
    rating: 4.0,
    appliedDate: "June 24, 2025",
    experience: "2 years",
    skills: ["Figma", "Sketch", "Illustrator", "Photoshop"],
    department: "Design Department"
  },
  {
    id: 14,
    name: "Ethan Lee",
    email: "ethan.lee@email.com",
    phone: "+1 (555) 333-4444",
    location: "Los Angeles, CA",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    status: "reviewed",
    rating: 4.2,
    appliedDate: "June 25, 2025",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    department: "Engineering Department"
  },
  {
    id: 15,
    name: "Sophia Martinez",
    email: "sophia.martinez@email.com",
    phone: "+1 (555) 444-5555",
    location: "Mexico City, Mexico",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    status: "shortlisted",
    rating: 4.6,
    appliedDate: "June 26, 2025",
    experience: "6 years",
    skills: ["UX", "UI", "Wireframing", "Prototyping"],
    department: "Design Department"
  },
  {
    id: 16,
    name: "William Evans",
    email: "william.evans@email.com",
    phone: "+1 (555) 555-6666",
    location: "Sydney, Australia",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    status: "pending",
    rating: 4.3,
    appliedDate: "June 27, 2025",
    experience: "7 years",
    skills: ["JavaScript", "HTML", "CSS", "Sass"],
    department: "Engineering Department"
  },
  {
    id: 17,
    name: "Chloe Kim",
    email: "chloe.kim@email.com",
    phone: "+1 (555) 666-7777",
    location: "Seoul, South Korea",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    status: "reviewed",
    rating: 4.5,
    appliedDate: "June 28, 2025",
    experience: "4 years",
    skills: ["Branding", "Typography", "Color Theory", "Logo Design"],
    department: "Design Department"
  },
  {
    id: 18,
    name: "Benjamin Scott",
    email: "benjamin.scott@email.com",
    phone: "+1 (555) 777-8888",
    location: "Dublin, Ireland",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    status: "shortlisted",
    rating: 4.8,
    appliedDate: "June 29, 2025",
    experience: "8 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    department: "Engineering Department"
  },
  {
    id: 19,
    name: "Grace Lee",
    email: "grace.lee@email.com",
    phone: "+1 (555) 888-9999",
    location: "Singapore",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    status: "pending",
    rating: 4.1,
    appliedDate: "June 30, 2025",
    experience: "3 years",
    skills: ["UI Design", "Photoshop", "Illustrator", "Figma"],
    department: "Design Department"
  },
  {
    id: 20,
    name: "Lucas Brown",
    email: "lucas.brown@email.com",
    phone: "+1 (555) 999-0000",
    location: "Paris, France",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    status: "reviewed",
    rating: 4.7,
    appliedDate: "July 1, 2025",
    experience: "9 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    department: "Engineering Department"
  }
]

// Empty candidate arrays for rounds

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'reviewed': return 'bg-blue-100 text-blue-700'
    case 'shortlisted': return 'bg-green-100 text-green-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'Pending Review'
    case 'reviewed': return 'Reviewed'
    case 'shortlisted': return 'Shortlisted'
    case 'rejected': return 'Rejected'
    default: return status
  }
}

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
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  filterStatus: string[];
  setFilterStatus: (s: string[]) => void;
  filterDept: string;
  setFilterDept: (d: string) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  handleDropdown: () => void;
  handleSelect: (dept: string) => void;
  handleExport: () => void;
}

export function CandidatesView({
  onBack,
  round = 1,
  all = false,
  department = 'All',
  candidates: propCandidates,
  onDeleteCandidate,
  filterOpen,
  setFilterOpen,
  filterStatus,
  setFilterStatus,
  filterDept,
  setFilterDept,
}: ExtendedCandidatesViewProps & { handleDropdown?: () => void }) {
  let candidates: Candidate[] = [];
  const candidateList = propCandidates || allCandidates || [];
  if (all) {
    candidates = department === 'All' ? candidateList : (candidateList || []).filter(c => c.department === department);
  } else if (round === 1) {
    candidates = (candidateList || []).slice(0, 10);
  } else if (round === 2) {
    candidates = (candidateList || []).slice(10, 20);
  }
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
      <div className="flex flex-col w-full min-w-0 flex-1">
        <div className="flex flex-row items-center justify-between w-full gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-emerald-700" onClick={onBack} aria-label="Back">
            <ChevronLeft className="w-5 h-5" />
          </Button>
            <h1 className="text-base sm:text-lg md:text-xl font-bold">All Candidates</h1>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <div className="text-xl font-bold text-blue-600">{filteredCandidates.length}</div>
            <div className="text-xs text-gray-600">Total Candidates</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <div className="text-xl font-bold text-yellow-600">
              {filteredCandidates.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <div className="text-xl font-bold text-emerald-700">
              {filteredCandidates.filter(c => c.status === 'shortlisted').length}
            </div>
            <div className="text-xs text-gray-600">Shortlisted</div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-1.5 flex flex-col justify-center items-center text-center">
            <div className="text-xl font-bold text-red-600">
              {filteredCandidates.filter(c => c.status === 'rejected').length}
            </div>
            <div className="text-xs text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>
      {/* Candidates List */}
        <div className="flex flex-col gap-3 w-full">
        {(filteredCandidates && filteredCandidates.length === 0) ? (
          <div className="text-center text-gray-500 text-lg py-12">No candidates found</div>
        ) : (
            filteredCandidates.map(candidate => (
              <Card key={candidate.id} className="bg-white rounded-md shadow p-3 sm:p-4 md:p-5 text-sm">
              <CardContent className="p-1.5 md:p-2">
                <div className="flex items-start justify-between flex-wrap">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 md:w-12 md:h-12">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback className="text-xs md:text-sm">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base md:text-lg font-semibold">{candidate.name}</h3>
                        <Badge className={getStatusColor(candidate.status)}>
                          {getStatusText(candidate.status)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs md:text-sm font-medium">{candidate.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate">{candidate.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate">{candidate.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate">{candidate.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="truncate">Applied Date {candidate.appliedDate}</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs md:text-sm">
                          <span className="font-medium">Experience:</span> {candidate.experience}
                        </div>
                        <div className="flex flex-wrap gap-1">
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
                        </div>
                        <div className="text-xs text-gray-500">{candidate.department}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0 max-w-full overflow-x-auto">
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
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {/* Delete confirmation dialog */}
      {deleteDialogOpen !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
            <div className="font-bold text-lg mb-2">Delete Candidate</div>
            <div className="text-gray-600 mb-4 text-center">Are you sure you want to delete this candidate?</div>
            <div className="flex space-x-2">
              <Button variant="outline" className="hover:bg-emerald-700" onClick={() => setDeleteDialogOpen(null)}>Cancel</Button>
              <Button variant="destructive" className="hover:bg-emerald-700" onClick={() => { if (onDeleteCandidate && typeof deleteDialogOpen === 'number') { onDeleteCandidate(deleteDialogOpen); } setDeleteDialogOpen(null); }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
      {previewCandidate && (
        <Dialog open={!!previewCandidate} onOpenChange={() => setPreviewCandidate(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Candidate Details</DialogTitle>
              <DialogDescription>Preview of the candidate's application and profile.</DialogDescription>
            </DialogHeader>
            {previewCandidate && (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-20 h-20 mb-2">
                  <AvatarImage src={previewCandidate?.avatar} />
                  <AvatarFallback>{previewCandidate?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
                <div className="font-bold text-lg">{previewCandidate?.name}</div>
                <div className="text-gray-600 text-sm">{previewCandidate?.email}</div>
                <div className="text-gray-600 text-sm">{previewCandidate?.phone}</div>
                <div className="text-gray-600 text-sm">{previewCandidate?.location}</div>
                <div className="text-gray-600 text-sm">Department: {previewCandidate?.department}</div>
                <div className="text-gray-600 text-sm">Applied: {previewCandidate?.appliedDate}</div>
                <div className="text-gray-600 text-sm">Experience: {previewCandidate?.experience}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                  {previewCandidate?.skills?.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs px-1 py-0.5">{skill}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{previewCandidate?.rating}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                  <Badge className={getStatusColor(previewCandidate?.status)}>{getStatusText(previewCandidate?.status)}</Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
      {commentsCandidate && (
        <Dialog open={!!commentsCandidate} onOpenChange={() => { setCommentsCandidate(null); setNewComment(""); }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Comments for {commentsCandidate?.name}</DialogTitle>
              <DialogDescription>Add or view comments related to this candidate.</DialogDescription>
            </DialogHeader>
            {commentsCandidate && (
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mb-2">
              {(commentsMap[commentsCandidate.id] || []).length === 0 ? (
                <div className="text-gray-500 text-sm text-center">No comments yet.</div>
              ) : (
                commentsMap[commentsCandidate.id].map((comment, idx) => (
                  <div key={idx} className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-800 mb-1 w-fit max-w-full self-start">
                    {comment}
                  </div>
                ))
              )}
            </div>
            )}
            <form
              className="flex gap-2 mt-2"
              onSubmit={e => {
                e.preventDefault();
                if (!newComment.trim() || !commentsCandidate) return;
                setCommentsMap(prev => ({
                  ...prev,
                  [commentsCandidate.id]: [...(prev[commentsCandidate.id] || []), newComment.trim()]
                }));
                setNewComment("");
              }}
            >
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <Button type="submit" size="sm" className="px-3 hover:bg-emerald-700">Send</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {/* Filter Panel Dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Candidates</DialogTitle>
            <DialogDescription>Narrow down candidates by status and department.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-semibold text-sm mb-2">Status</div>
              <div className="flex flex-wrap gap-2">
                {['pending', 'reviewed', 'shortlisted', 'rejected'].map(status => (
                  <label key={status} className="flex items-center gap-2 text-xs capitalize">
                    <Checkbox
                      checked={filterStatus.includes(status)}
                      onCheckedChange={checked => {
                        if (checked) setFilterStatus([...filterStatus, status]);
                        else setFilterStatus(filterStatus.filter(s => s !== status));
                      }}
                    />
                    {status.replace(/^[a-z]/, c => c.toUpperCase())}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm mb-2">Department</div>
              <Select value={filterDept} onValueChange={setFilterDept}>
                <SelectTrigger className="bg-gray-100 text-black h-8 px-2 text-xs flex items-center gap-1 min-w-[120px]">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  <SelectItem value="Design Department">Design Department</SelectItem>
                  <SelectItem value="Engineering Department">Engineering Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
    </div>
          <DialogFooter>
            <Button className="bg-black hover:bg-emerald-700 text-xs" onClick={() => setFilterOpen(false)}>Apply</Button>
            <Button variant="ghost" className="text-xs" onClick={() => setFilterOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CandidatesView;