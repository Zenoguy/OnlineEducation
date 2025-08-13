"use client";

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Calendar, 
  Clock,
  FileText, 
  Plus, 
  TrendingUp,
  Users,
  Video
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {isTeacher ? 'Manage your classes and track student progress.' : 'Continue your learning journey.'}
            </p>
          </div>
          
          {isTeacher && (
            <Link href="/classes/create">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Class</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass glass-dark hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {isTeacher ? 'Total Classes' : 'Enrolled Classes'}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass glass-dark hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {isTeacher ? 'Total Students' : 'Notes Shared'}
              </CardTitle>
              <Users className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isTeacher ? '156' : '24'}</div>
              <p className="text-xs text-muted-foreground">
                +12 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="glass glass-dark hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {isTeacher ? 'Assignments' : 'Pending Tasks'}
              </CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isTeacher ? '12' : '3'}</div>
              <p className="text-xs text-muted-foreground">
                Due this week
              </p>
            </CardContent>
          </Card>

          <Card className="glass glass-dark hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="glass glass-dark">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  {isTeacher ? 'Latest student activities across your classes' : 'Your recent learning activities'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: 'assignment',
                    title: isTeacher ? 'John Doe submitted React Hooks assignment' : 'You submitted React Hooks assignment',
                    time: '2 minutes ago',
                    icon: FileText,
                    color: 'text-blue-600'
                  },
                  {
                    type: 'note',
                    title: isTeacher ? 'Sarah shared notes in JavaScript Fundamentals' : 'You shared notes with the class',
                    time: '15 minutes ago',
                    icon: FileText,
                    color: 'text-teal-600'
                  },
                  {
                    type: 'video',
                    title: isTeacher ? 'New video added to Node.js course' : 'New video available in Node.js course',
                    time: '1 hour ago',
                    icon: Video,
                    color: 'text-purple-600'
                  },
                  {
                    type: 'class',
                    title: isTeacher ? 'Web Development class created' : 'You joined Advanced CSS class',
                    time: '3 hours ago',
                    icon: BookOpen,
                    color: 'text-orange-600'
                  }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/5 transition-colors">
                      <div className={`p-2 rounded-full bg-muted/10 ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Upcoming */}
          <div className="space-y-6">
            <Card className="glass glass-dark">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={isTeacher ? "/classes/create" : "/classes/join"}>
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    {isTeacher ? 'Create New Class' : 'Join Class'}
                  </Button>
                </Link>
                <Link href="/notes/new">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </Link>
                {isTeacher && (
                  <Link href="/homework/create">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Assign Homework
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card className="glass glass-dark">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: 'React Project Submission',
                    date: 'Dec 15, 2024',
                    status: 'urgent'
                  },
                  {
                    title: 'JavaScript Quiz',
                    date: 'Dec 18, 2024',
                    status: 'upcoming'
                  },
                  {
                    title: 'Final Presentation',
                    date: 'Dec 22, 2024',
                    status: 'future'
                  }
                ].map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/5 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <Badge 
                      variant={deadline.status === 'urgent' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {deadline.status === 'urgent' ? 'Due Soon' : 'Upcoming'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}