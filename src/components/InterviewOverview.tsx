import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Fragment } from "react"
import { useTranslation } from "@/lib/useTranslation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Predefined question bank
const questionBank = [
  {
    prompt: "What is a closure in JavaScript?",
    competency: "Technical Skills",
    time: "10 Min",
    level: "Beginner",
  },
  {
    prompt: "Describe a time you resolved a team conflict.",
    competency: "Team Building",
    time: "10 Min",
    level: "Intermediate",
  },
  {
    prompt: "How do you optimize React performance?",
    competency: "Technical Skills",
    time: "15 Min",
    level: "Advanced",
  },
  {
    prompt: "Explain the difference between == and === in JavaScript.",
    competency: "Technical Skills",
    time: "10 Min",
    level: "Beginner",
  },
  {
    prompt: "How do you handle feedback from a manager or peer?",
    competency: "Communication",
    time: "10 Min",
    level: "Intermediate",
  },
];

export function InterviewOverview({ language }: { language: 'en' | 'es' | 'fr', setLanguage: (lang: 'en' | 'es' | 'fr') => void }) {
  const t = useTranslation(language);
  // Add answer state to each question
  // When adding a new question, include answer: ''
  const defaultQuestions = [
    {
      prompt: "How Do JavaScript And jQuery Vary?",
      competency: t["competencies"] || "Team Building",
      time: "10 Min",
      level: "Pending",
      editing: false,
      deleted: false,
      answer: '',
      answering: false,
    },
  ];
  const [questions, setQuestions] = useState(defaultQuestions);
  const [] = useState<number | null>(null);
  const [] = useState<any>(null);
  const [] = useState({
    prompt: '',
    competency: 'Team Building',
    time: '10 Min',
    level: 'Pending',
  });
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [selectedLibraryIndexes, setSelectedLibraryIndexes] = useState<number[]>([]);
  // State for the four fields in the Previous Background card
  const [editingPrompt, setEditingPrompt] = useState({
    prompt: '',
    competency: 'Team Building',
    time: '10 Min',
    level: 'Pending',
  });

  // Helper to add answer/answering to new prompts
  return (
    <div>
      {/* Header outside the card */}
      <div className="flex flex-row items-center justify-between gap-x-2 mb-1 mt-6 md:mt-0 lg:mt-[-50px]">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{t.interviewOverview || "Interview Overview"}</h2>
        <div className="flex flex-row gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white transition-colors"
            onClick={() => {
              setQuestions(prev => [
                ...prev,
                {
                  prompt: '',
                  competency: 'Team Building',
                  time: '10 Min',
                  level: 'Pending',
                  editing: true,
                  deleted: false,
                  answer: '',
                  answering: false,
                },
              ]);
            }}
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 md:p-3 bg-white text-black hover:bg-emerald-700 hover:text-white transition-colors">
            <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600" onClick={() => setQuestions([])}>
                {t.deleteAllQuestions || "Delete All Questions"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card className="rounded-2xl p-1 md:p-1.5 shadow hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col md:-mt-[-18px]">
        <CardContent className="space-y-2 p-2">
          <div className="space-y-2">
            {/* Previous Background Section */}
            <div>
              <h3 className="text-base md:text-lg lg:text-xl font-medium mb-1">{t.previousBackground || "Previous Background"}</h3>
              {/* Question Item 1 */}
              <div className="border rounded-lg p-1.5 md:p-2 mb-1 hover:bg-gray-50 transition-colors">
                {questions.map((q, index) => (
                  <Fragment key={index}>
                    {q.deleted ? (
                      <div className="text-gray-400 text-xs text-center py-4">{"No question"}</div>
                    ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-grey-300 text-black rounded-full flex items-center justify-center text-sm md:text-base font-bold">
                            {index + 1}
                    </div>
                    <div className="flex-1">
                            {q.editing ? (
                              <input
                                className="font-medium text-sm md:text-base lg:text-lg leading-tight border rounded px-1 py-0.5 w-full"
                                value={q.prompt}
                                onChange={e => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].prompt = e.target.value;
                                  setQuestions(newQuestions);
                                }}
                                autoFocus
                              />
                            ) : (
                              <h4
                                className="font-medium text-sm md:text-base lg:text-lg leading-tight cursor-pointer"
                                onDoubleClick={() => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].editing = true;
                                  setQuestions(newQuestions);
                                }}
                              >
                                {q.prompt}
                              </h4>
                            )}
                            <p className="text-xs md:text-sm text-gray-600 mt-1">3min 4Questions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                          {q.editing ? (
                            <>
                              <Button variant="ghost" size="sm" className="p-1" onClick={() => {
                                const newQuestions = [...questions];
                                newQuestions[index].prompt = q.prompt;
                                newQuestions[index].editing = false;
                                setQuestions(newQuestions);
                              }}>
                                {t.save || "Save"}
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1" onClick={() => {
                                const newQuestions = [...questions];
                                newQuestions[index].editing = false;
                                setQuestions(newQuestions);
                              }}>
                                {t.cancel || "Cancel"}
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="sm" className="p-1 hover:bg-emerald-700 hover:text-white" onClick={() => {
                              const newQuestions = [...questions];
                              newQuestions[index].editing = true;
                              setQuestions(newQuestions);
                            }}>
                      <Edit className="w-4 h-4 md:w-5 md:h-5 hover:bg-emerald-700 hover:text-white" />
                    </Button>
                          )}
                          <Button variant="ghost" size="sm" className="p-1 hover:bg-emerald-700 hover:text-white" onClick={() => {
                            const newQuestions = [...questions];
                            newQuestions[index].deleted = true;
                            setQuestions(newQuestions);
                          }}>
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 hover:bg-emerald-700 hover:text-white" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 hover:bg-emerald-700 hover:text-white" onClick={() => alert('More actions coming soon!')}>
                      <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                </div>
                    )}
                  </Fragment>
                ))}
              </div>
              {/* Question Item 2 - Editable */}
              <div className="bg-gray-100 rounded-xl p-3 mt-2">
                {/* Top row: number and Editing */}
                <div className="flex items-center mb-2">
                  <div className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-base font-semibold mr-2">2</div>
                  <div className="font-bold text-lg">Editing</div>
                </div>
                {/* Second row: fields */}
                <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-4 mb-3">
                  <div className="flex-[2] min-w-0">
                    <label className="block text-xs font-medium mb-0.5">Prompt</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-2 py-1 text-sm bg-white"
                      placeholder="How are JavaScript and jQuery different?"
                      value={editingPrompt.prompt}
                      onChange={e => setEditingPrompt(f => ({ ...f, prompt: e.target.value }))}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium mb-0.5">Competencies</label>
                    <select
                      className="w-full rounded-md border px-2 py-1 text-sm bg-white text-black"
                      value={editingPrompt.competency}
                      onChange={e => setEditingPrompt(f => ({ ...f, competency: e.target.value }))}
                    >
                      <option>Teambuilding</option>
                      <option>Technical Skills</option>
                      <option>Communication</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium mb-0.5">Time</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-14 rounded-md border px-2 py-1 text-sm bg-white"
                        placeholder="10"
                        value={editingPrompt.time}
                        onChange={e => setEditingPrompt(f => ({ ...f, time: e.target.value }))}
                      />
                      <span className="ml-1 text-gray-500 text-xs">min</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium mb-0.5">Level</label>
                    <select
                      className="w-full rounded-md border px-2 py-1 text-sm bg-white"
                      value={editingPrompt.level}
                      onChange={e => setEditingPrompt(f => ({ ...f, level: e.target.value }))}
                    >
                      <option>Pending</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                {/* Guidelines Heading */}
                <div className="font-bold text-sm mb-1">Guidelines</div>
                {/* Guidelines Card */}
                <div className="bg-white rounded-lg p-3 mb-4">
                  <div className="font-bold text-sm mb-1">Some of the key features of design are:</div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-0.5 text-xs">
                    <li>A line is a visual trace created by any writing tool or the meeting point of two shapes</li>
                    <li>Size refers to how much visual space one element occupies compared to another</li>
                  </ul>
                </div>
                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-2">
                  <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 text-sm py-2 hover:bg-emerald-700 hover:text-white" onClick={() => setLibraryOpen(true)}>
                        Insert From Library
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Select Questions from Library</DialogTitle>
                        <DialogDescription>Choose questions to add from the library.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {questionBank.map((q: any, idx: number) => (
                          <label key={idx} className="flex items-start space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLibraryIndexes.includes(idx)}
                              onChange={e => {
                                setSelectedLibraryIndexes(sel =>
                                  e.target.checked
                                    ? [...sel, idx]
                                    : sel.filter(i => i !== idx)
                                );
                              }}
                            />
                            <div>
                              <div className="font-medium text-sm">{q.prompt}</div>
                              <div className="text-xs text-gray-500">{q.competency} • {q.time} • {q.level}</div>
                            </div>
                          </label>
                        ))}
                        {questionBank.length === 0 && (
                          <div className="text-center text-gray-400 py-8">No questions in library.</div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            // Add selected questions to the list
                            const toAdd = selectedLibraryIndexes.map(idx => ({
                              ...questionBank[idx],
                              answer: '',
                              answering: false,
                              editing: false,
                              deleted: false,
                            }));
                            setQuestions(prev => [...prev, ...toAdd]);
                            setSelectedLibraryIndexes([]);
                            setLibraryOpen(false);
                          }}
                          disabled={selectedLibraryIndexes.length === 0}
                          className="bg-black text-white hover:bg-emerald-700 hover:text-white"
                        >
                          Add Selected
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="flex-1 text-sm py-2 bg-black hover:bg-emerald-700 text-white"
                    onClick={() => {
                      if (!editingPrompt.prompt.trim()) return;
                      setQuestions(prev => [
                        ...prev,
                        {
                          prompt: editingPrompt.prompt,
                          competency: editingPrompt.competency,
                          time: editingPrompt.time,
                          level: editingPrompt.level,
                          editing: false,
                          deleted: false,
                          answer: '',
                          answering: false,
                        },
                      ]);
                      setEditingPrompt({ prompt: '', competency: 'Team Building', time: '10 Min', level: 'Pending' });
                    }}
                  >
                    Create New Prompt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 

export default InterviewOverview;