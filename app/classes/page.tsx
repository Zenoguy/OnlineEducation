"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  BookOpen, 
  Plus, 
  Search,
  Users, 
  Calendar,
  MoreVertical,
  Share,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function Classes() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [searchQuery, setSearchQuery] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const mockClasses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, state, and props',
      teacher: 'Dr. Sarah Johnson',
      students: 32,
      banner: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      code: 'RC2024',
      color: 'bg-blue-500',
      isOwner: isTeacher
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript ES6+, async programming, and modern patterns',
      teacher: 'Prof. Michael Chen',
      students: 28,
      banner: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      code: 'JS2024',
      color: 'bg-yellow-500',
      isOwner: false
    },
    {
      id: 3,
      title: 'Node.js & Express',
      description: 'Backend development with Node.js, Express framework, and databases',
      teacher: 'Dr. Sarah Johnson',
      students: 24,
      banner: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      code: 'NODE24',
      color: 'bg-green-500',
      isOwner: isTeacher
    }
  ];

  const filteredClasses = mockClasses.filter(cls => 
    cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinClass = async () => {
    // Placeholder for join class logic
    console.log('Joining class with code:', joinCode);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">My Classes</h1>
            <p className="text-muted-foreground">
              {isTeacher ? 'Manage your classes and track student progress' : 'Your enrolled classes'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isTeacher && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Join Class
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass glass-dark">
                  <DialogHeader>
                    <DialogTitle>Join a Class</DialogTitle>
                    <DialogDescription>
                      Enter the class code provided by your teacher
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="join-code">Class Code</Label>
                      <Input 
                        id="join-code"
                        placeholder="Enter class code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleJoinClass} className="w-full">
                      Join Class
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {isTeacher && (
              <Link href="/classes/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Class
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="glass glass-dark group hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-teal-600/20 relative overflow-hidden">
                  {cls.banner && (
                    <img 
                      src={cls.banner} 
                      alt={cls.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Badge variant="secondary" className="glass glass-dark">
                      {cls.code}
                    </Badge>
                    {cls.isOwner && (
                      <Button variant="ghost" size="sm" className="glass glass-dark h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{cls.title}</h3>
                    <p className="text-sm text-white/90 mb-2 line-clamp-2">{cls.description}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${cls.teacher}`} />
                      <AvatarFallback>{cls.teacher.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{cls.teacher}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{cls.students}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link href={`/classes/${cls.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Class
                    </Button>
                  </Link>
                  
                  {cls.isOwner ? (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No classes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : isTeacher 
                  ? 'Create your first class to get started' 
                  : 'Join your first class to get started'
              }
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href={isTeacher ? "/classes/create" : "#"}>
                  {isTeacher ? 'Create Class' : 'Join Class'}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}