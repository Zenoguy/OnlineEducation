"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Video, 
  FileText, 
  Calendar,
  Settings,
  Share,
  Plus,
  Search,
  Play,
  Download,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function ClassDetail() {
  const params = useParams();
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [searchQuery, setSearchQuery] = useState('');

  // Mock class data
  const classData = {
    id: params.id,
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, state, and props',
    teacher: 'Dr. Sarah Johnson',
    students: 32,
    banner: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    code: 'RC2024',
    isOwner: isTeacher
  };

  const mockVideos = [
    {
      id: 1,
      title: 'Introduction to React',
      duration: '15:30',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
      uploadedAt: '2 days ago',
      views: 28
    },
    {
      id: 2,
      title: 'Components and Props',
      duration: '22:15',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1',
      uploadedAt: '1 week ago',
      views: 32
    }
  ];

  const mockStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2 weeks ago', progress: 85 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '1 week ago', progress: 92 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinedAt: '3 days ago', progress: 67 }
  ];

  const mockAssignments = [
    {
      id: 1,
      title: 'React Component Exercise',
      dueDate: '2024-12-20',
      submitted: 24,
      total: 32,
      status: 'active'
    },
    {
      id: 2,
      title: 'Props and State Quiz',
      dueDate: '2024-12-15',
      submitted: 32,
      total: 32,
      status: 'completed'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-br from-primary/20 to-teal-600/20 relative overflow-hidden rounded-lg">
            {classData.banner && (
              <img 
                src={classData.banner} 
                alt={classData.title}
                className="w-full h-full object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{classData.title}</h1>
                  <p className="text-white/90 mb-2">{classData.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{classData.students} students</span>
                    </span>
                    <span>Code: {classData.code}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="secondary">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {isTeacher && (
                    <Button variant="secondary">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            {isTeacher && <TabsTrigger value="students">Students</TabsTrigger>}
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activity */}
                <Card className="glass glass-dark">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { type: 'video', title: 'New video: Introduction to React', time: '2 hours ago' },
                      { type: 'assignment', title: 'Assignment due: React Components', time: '1 day ago' },
                      { type: 'discussion', title: 'New discussion: Best Practices', time: '2 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/5">
                        <div className="p-2 rounded-full bg-primary/10">
                          {activity.type === 'video' && <Video className="h-4 w-4 text-primary" />}
                          {activity.type === 'assignment' && <Calendar className="h-4 w-4 text-orange-600" />}
                          {activity.type === 'discussion' && <MessageSquare className="h-4 w-4 text-teal-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Class Stats */}
                <Card className="glass glass-dark">
                  <CardHeader>
                    <CardTitle>Class Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Students</span>
                      <span className="font-medium">{classData.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Videos</span>
                      <span className="font-medium">{mockVideos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assignments</span>
                      <span className="font-medium">{mockAssignments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Progress</span>
                      <span className="font-medium">81%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glass glass-dark">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {isTeacher ? (
                      <>
                        <Button variant="outline" className="w-full justify-start">
                          <Video className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          Create Assignment
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Start Discussion
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          View Notes
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          View Assignments
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Join Discussion
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isTeacher && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVideos.map((video) => (
                <Card key={video.id} className="glass glass-dark group hover:scale-105 transition-transform">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm">
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/60 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{video.uploadedAt}</span>
                      <span>{video.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assignments</h2>
              {isTeacher && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id} className="glass glass-dark">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {assignment.submitted}/{assignment.total} submitted
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {isTeacher && (
            <TabsContent value="students" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Students ({mockStudents.length})</h2>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
              </div>

              <div className="space-y-4">
                {mockStudents.map((student) => (
                  <Card key={student.id} className="glass glass-dark">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`https://avatar.vercel.sh/${student.name}`} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{student.progress}% Complete</p>
                          <p className="text-sm text-muted-foreground">Joined {student.joinedAt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Class Discussions</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            <Card className="glass glass-dark">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start a discussion to engage with your {isTeacher ? 'students' : 'classmates'}
                </p>
                <Button>Start First Discussion</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}