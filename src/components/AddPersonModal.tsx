import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { X, Plus } from "lucide-react"

interface AddPersonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddPerson: (person: {
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

export function AddPersonModal({ open, onOpenChange, onAddPerson }: AddPersonModalProps) {
  const [personType, setPersonType] = useState<'candidate' | 'interviewer'>('candidate')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [department, setDepartment] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [showSkillRecommendations, setShowSkillRecommendations] = useState(false)

  // Recommended skills based on department and project
  const getRecommendedSkills = () => {
    const commonSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL',
      'Git', 'Docker', 'AWS', 'HTML', 'CSS', 'MongoDB', 'PostgreSQL'
    ]
    
    const designSkills = [
      'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign',
      'UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'
    ]
    
    const engineeringSkills = [
      'React', 'Vue.js', 'Angular', 'Next.js', 'Express.js', 'Django', 'Spring Boot',
      'GraphQL', 'REST API', 'Microservices', 'Kubernetes', 'Jenkins', 'Jest', 'Cypress'
    ]
    
    const frontendSkills = [
      'React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
      'Sass', 'Tailwind CSS', 'Bootstrap', 'Redux', 'Zustand', 'Webpack', 'Vite'
    ]
    
    const backendSkills = [
      'Node.js', 'Python', 'Java', 'C#', 'Go', 'PHP', 'Ruby', 'Express.js',
      'Django', 'Spring Boot', 'Laravel', 'FastAPI', 'GraphQL', 'REST API'
    ]
    
    if (department === 'Design Department') {
      return [...designSkills, ...commonSkills]
    } else if (department === 'Engineering Department') {
      return [...engineeringSkills, ...frontendSkills, ...backendSkills, ...commonSkills]
    }
    
    return [...commonSkills, ...designSkills, ...engineeringSkills]
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleAddRecommendedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill])
    }
    setShowSkillRecommendations(false)
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    console.log('Removing skill:', skillToRemove)
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleSubmit = () => {
    if (name && email && phone && location && department && experience) {
      const personData = {
        type: personType,
        name,
        email,
        phone,
        location,
        department,
        experience,
        skills,
        avatar: `https://randomuser.me/api/portraits/${personType === 'candidate' ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
      }
      
      console.log('Submitting person data:', personData)
      onAddPerson(personData)
      
      // Reset form
      setName('')
      setEmail('')
      setPhone('')
      setLocation('')
      setDepartment('')
      setExperience('')
      setSkills([])
      setNewSkill('')
      onOpenChange(false)
      
      // Show success message (you could implement a toast notification here)
      alert(
        personType === 'candidate'
          ? 'Person added successfully!'
          : 'Person added successfully!'
      )
    } else {
      console.log('Form validation failed:', { name, email, phone, location, department, experience })
      alert('Please fill in all required fields.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{personType === 'candidate' ? 'Add New Candidate' : 'Add New Interviewer'}</DialogTitle>
          <DialogDescription>{personType === 'candidate' ? 'Fill in the details to add a new candidate.' : 'Fill in the details to add a new interviewer.'}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Person Type Selection */}
          <div className="flex space-x-2">
            <Button
              variant={personType === 'candidate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPersonType('candidate')}
              className={`flex-1 ${personType === 'candidate' ? 'bg-black text-white hover:bg-emerald-700 hover:text-white' : ''}`}
            >
              Candidate
            </Button>
            <Button
              variant={personType === 'interviewer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPersonType('interviewer')}
              className={`flex-1 ${personType === 'interviewer' ? 'bg-black text-white hover:bg-emerald-700 hover:text-white' : ''}`}
            >
              Interviewer
            </Button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering Department">Engineering Department</SelectItem>
                  <SelectItem value="Design Department">Design Department</SelectItem>
                  <SelectItem value="Marketing Department">Marketing Department</SelectItem>
                  <SelectItem value="Sales Department">Sales Department</SelectItem>
                  <SelectItem value="HR Department">HR Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Input
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Enter experience"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill"
                className="flex-1"
              />
              <DropdownMenu open={showSkillRecommendations} onOpenChange={setShowSkillRecommendations}>
                <DropdownMenuTrigger asChild>
                  <Button type="button" size="sm" className="bg-black text-white hover:bg-emerald-700 hover:text-white" onClick={() => setShowSkillRecommendations(true)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">Recommended Skills</div>
                    <div className="grid grid-cols-1 gap-1">
                      {getRecommendedSkills()
                        .filter(skill => !skills.includes(skill))
                        .slice(0, 20)
                        .map((skill) => (
                          <DropdownMenuItem
                            key={skill}
                            onClick={() => handleAddRecommendedSkill(skill)}
                            className="text-sm cursor-pointer hover:bg-gray-100"
                          >
                            {skill}
                          </DropdownMenuItem>
                        ))}
                    </div>
                    {getRecommendedSkills().filter(skill => !skills.includes(skill)).length === 0 && (
                      <div className="text-xs text-gray-400 p-2">All recommended skills added</div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('X button clicked for skill:', skill)
                        handleRemoveSkill(skill)
                      }}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="hover:bg-emerald-700">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              className="bg-black text-white hover:bg-emerald-700 hover:text-white" 
              onClick={handleSubmit} 
              disabled={!name || !email || !phone || !location || !department || !experience}
            >
              Add Person
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
} 