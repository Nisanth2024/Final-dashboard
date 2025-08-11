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
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { Typography } from "@/components/ui/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { allCandidates, type Candidate } from "../pages/CandidatesPage";

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
  const [query, setQuery] = useState("");

  // Filter logic for candidates only
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
            Search for candidates.
          </DialogDescription>
        </DialogHeader>
        <Stack spacing={2} className="mb-2">
          <div className="relative">
            <Input
              placeholder="Search Candidates"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </Stack>
        <ScrollArea className="max-h-80">
          <Stack spacing={2}>
            {filteredCandidates.length === 0 && (
              <Typography variant="p" size="sm" color="muted" align="center" className="text-center text-gray-400 py-8">No candidates found.</Typography>
            )}
            {filteredCandidates.map((c: Candidate) => (
              <Card key={c.id} className="flex flex-col sm:flex-row items-center gap-3 p-2 w-full">
                <Avatar>
                  <AvatarImage src={c.avatar} alt={c.name} />
                  <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <CardContent className="flex-1 p-0 w-full">
                  <Flex direction="col" className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
                    <Stack spacing={1}>
                      <Typography variant="p" size="base" weight="semibold" className="font-semibold text-base">{c.name}</Typography>
                      <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-500">{c.email}</Typography>
                      <Typography variant="p" size="xs" color="muted" className="text-xs text-gray-400">{c.department}</Typography>
                    </Stack>
                    <Flex align="center" gap={2} className="flex-wrap">
                      <Badge variant="secondary">{c.status}</Badge>
                      <Typography variant="span" size="xs" className="text-xs text-yellow-600 font-semibold flex items-center">
                        ★ {c.rating}
                      </Typography>
                      <Typography variant="span" size="xs" color="muted" className="text-xs text-gray-400">{c.location}</Typography>
                    </Flex>
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 