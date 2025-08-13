"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Search,
  Users, 
  Clock,
  Share,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function Notes() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const mockNotes = [
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      content: 'useState and useEffect are fundamental hooks that every React developer should master...',
      author: 'John Doe',
      authorId: '1',
      className: 'React Fundamentals',
      classId: 1,
      sharedWith: 'class',
      tags: ['React', 'Hooks', 'JavaScript'],
      createdAt: '2 hours ago',
      updatedAt: '1 hour ago',
      isOwner: user?.id === '1'
    },
    {
      id: 2,
      title: 'JavaScript Closures Explained',
      content: 'Closures are a powerful feature in JavaScript that allows functions to access variables...',
      author: 'Sarah Johnson',
      authorId: '2',
      className: 'Advanced JavaScript',
      classId: 2,
      sharedWith: 'peers',
      tags: ['JavaScript', 'Closures', 'Functions'],
      createdAt: '1 day ago',
      updatedAt: '1 day ago',
      isOwner: false
    },
    {
      id: 3,
      title: 'Node.js Express Middleware',
      content: 'Middleware functions are functions that have access to the request object...',
      author: 'Mike Chen',
      authorId: '3',
      className: 'Node.js & Express',
      classId: 3,
      sharedWith: 'private',
      tags: ['Node.js', 'Express', 'Middleware'],
      createdAt: '3 days ago',
      updatedAt: '2 days ago',
      isOwner: false
    }
  ];

  const filteredNotes = mockNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const myNotes = filteredNotes.filter(note => note.isOwner);
  const sharedNotes = filteredNotes.filter(note => !note.isOwner);

  const getShareIcon = (sharedWith: string) => {
    switch (sharedWith) {
      case 'class':
        return <Users className="h-4 w-4" />;
      case 'peers':
        return <Share className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getShareText = (sharedWith: string) => {
    switch (sharedWith) {
      case 'class':
        return 'Shared with class';
      case 'peers':
        return 'Shared with peers';
      default:
        return 'Private';
    }
  };

  const NoteCard = ({ note }: { note: typeof mockNotes[0] }) => (
    <Card className="glass glass-dark group hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{note.title}</CardTitle>
            <CardDescription className="text-sm">
              by {note.author} in {note.className}
            </CardDescription>
          </div>
          {note.isOwner && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {note.content}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            {getShareIcon(note.sharedWith)}
            <span>{getShareText(note.sharedWith)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Updated {note.updatedAt}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link href={`/notes/${note.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Note
            </Button>
          </Link>
          
          {!note.isOwner && (
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground">
              Create, share, and manage your study notes
            </p>
          </div>
          
          <Link href="/notes/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes, tags, or content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Notes Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Notes ({filteredNotes.length})</TabsTrigger>
            <TabsTrigger value="my-notes">My Notes ({myNotes.length})</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me ({sharedNotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-notes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sharedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Create your first note to get started'
              }
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/notes/create">Create Note</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}