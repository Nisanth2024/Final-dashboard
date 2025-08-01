import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { allCandidates, type Candidate } from "./CandidatesView";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'en' | 'es' | 'fr';
  setLanguage: (lang: 'en' | 'es' | 'fr') => void;
}

const placeholderRounds = [
  { id: 1, name: "Round 1", status: "Completed" },
  { id: 2, name: "Round 2", status: "In Progress" },
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [tab, setTab] = useState("rounds");
  const [query, setQuery] = useState("");

  // Filter logic for each tab
  const filteredCandidates = allCandidates.filter((c) =>
    [c.name, c.email, c.department, c.location]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for interview rounds or candidates.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="rounds" value={tab} onValueChange={setTab}>
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="rounds">Interview Rounds</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
          </TabsList>
          <div className="mb-2">
            <div className="relative">
              <Input
                placeholder={`Search ${tab === 'rounds' ? 'Interview Rounds' : 'Candidates'}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <TabsContent value="rounds">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {placeholderRounds
                .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
                .map((r) => (
                  <Card key={r.id} className="flex items-center gap-3 p-2">
                    <CardContent className="flex-1 p-0 flex items-center justify-between">
                      <div className="font-semibold text-base">{r.name}</div>
                      <Badge variant={r.status === "Completed" ? "secondary" : "outline"}>{r.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              {placeholderRounds.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <div className="text-center text-gray-400 py-8">No interview rounds found.</div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="candidates">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredCandidates.length === 0 && (
                <div className="text-center text-gray-400 py-8">No candidates found.</div>
              )}
              {filteredCandidates.map((c: Candidate) => (
                <Card key={c.id} className="flex items-center gap-3 p-2">
                  <Avatar>
                    <AvatarImage src={c.avatar} alt={c.name} />
                    <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <CardContent className="flex-1 p-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-base">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.email}</div>
                        <div className="text-xs text-gray-400">{c.department}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{c.status}</Badge>
                        <span className="text-xs text-yellow-600 font-semibold flex items-center">
                          ★ {c.rating}
                        </span>
                        <span className="text-xs text-gray-400">{c.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 