"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Plus, 
  Search,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function Homework() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [searchQuery, setSearchQuery] = useState('');

  const mockHomework = [
    {
      id: 1,
      title: 'React Component Architecture',
      description: 'Build a complete React application using modern component patterns and hooks.',
      className: 'React Fundamentals',
      classId: 1,
      teacher: 'Dr. Sarah Johnson',
      dueDate: '2024-12-15',
      dueTime: '23:59',
      status: 'pending',
      submitted: false,
      grade: null,
      maxPoints: 100,
      attachments: ['requirements.pdf', 'starter-code.zip'],
      isOwner: isTeacher
    },
    {
      id: 2,
      title: 'JavaScript Quiz - Async Programming',
      description: 'Test your knowledge of promises, async/await, and event loop.',
      className: 'Advanced JavaScript',
      classId: 2,
      teacher: 'Prof. Michael Chen',
      dueDate: '2024-12-18',
      dueTime: '14:00',
      status: 'submitted',
      submitted: true,
      grade: 85,
      maxPoints: 100,
      attachments: [],
      isOwner: false
    },
    {
      id: 3,
      title: 'REST API Development',
      description: 'Create a RESTful API using Node.js and Express with proper authentication.',
      className: 'Node.js & Express',
      classId: 3,
      teacher: 'Dr. Sarah Johnson',
      dueDate: '2024-12-22',
      dueTime: '23:59',
      status: 'overdue',
      submitted: false,
      grade: null,
      maxPoints: 150,
      attachments: ['api-spec.json'],
      isOwner: isTeacher
    }
  ];

  const filteredHomework = mockHomework.filter(hw => 
    hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hw.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hw.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingHomework = filteredHomework.filter(hw => hw.status === 'pending');
  const submittedHomework = filteredHomework.filter(hw => hw.status === 'submitted');
  const overdueHomework = filteredHomework.filter(hw => hw.status === 'overdue');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-green-600">Submitted</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const HomeworkCard = ({ homework }: { homework: typeof mockHomework[0] }) => (
    <Card className="glass glass-dark group hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(homework.status)}
              <CardTitle className="text-lg">{homework.title}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {homework.className} • {homework.teacher}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(homework.status)}
            {homework.grade !== null && (
              <Badge variant="outline">
                {homework.grade}/{homework.maxPoints}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {homework.description}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
            </div>
            <span className={`font-medium ${
              homework.status === 'overdue' ? 'text-red-600' : 
              homework.status === 'submitted' ? 'text-green-600' : 
              'text-yellow-600'
            }`}>
              {getDaysUntilDue(homework.dueDate)}
            </span>
          </div>
          
          {homework.grade !== null && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Grade</span>
                <span className="font-medium">{homework.grade}/{homework.maxPoints}</span>
              </div>
              <Progress value={(homework.grade / homework.maxPoints) * 100} className="h-2" />
            </div>
          )}
          
          {homework.attachments.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>{homework.attachments.length} attachment(s)</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link href={`/homework/${homework.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          
          {isTeacher && homework.isOwner ? (
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          ) : !homework.submitted && homework.status !== 'overdue' && (
            <Button variant="outline" size="sm" className="bg-primary/10">
              <Upload className="h-4 w-4" />
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
            <h1 className="text-3xl font-bold">Homework</h1>
            <p className="text-muted-foreground">
              {isTeacher ? 'Create and manage assignments for your classes' : 'Track your assignments and submissions'}
            </p>
          </div>
          
          {isTeacher && (
            <Link href="/homework/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </Link>
          )}
        </div>

        {/* Stats Overview */}
        {!isTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass glass-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingHomework.length}</div>
                <p className="text-xs text-muted-foreground">Assignments due</p>
              </CardContent>
            </Card>
            
            <Card className="glass glass-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{submittedHomework.length}</div>
                <p className="text-xs text-muted-foreground">Completed assignments</p>
              </CardContent>
            </Card>
            
            <Card className="glass glass-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{overdueHomework.length}</div>
                <p className="text-xs text-muted-foreground">Past due date</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Homework Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Assignments ({filteredHomework.length})</TabsTrigger>
            {!isTeacher && (
              <>
                <TabsTrigger value="pending">Pending ({pendingHomework.length})</TabsTrigger>
                <TabsTrigger value="submitted">Submitted ({submittedHomework.length})</TabsTrigger>
                <TabsTrigger value="overdue">Overdue ({overdueHomework.length})</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHomework.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((homework) => (
                <HomeworkCard key={homework.id} homework={homework} />
              ))}
            </div>
          </TabsContent>

          {!isTeacher && (
            <>
              <TabsContent value="pending" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingHomework.map((homework) => (
                    <HomeworkCard key={homework.id} homework={homework} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="submitted" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {submittedHomework.map((homework) => (
                    <HomeworkCard key={homework.id} homework={homework} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overdue" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {overdueHomework.map((homework) => (
                    <HomeworkCard key={homework.id} homework={homework} />
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>

        {filteredHomework.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No assignments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : isTeacher 
                  ? 'Create your first assignment to get started' 
                  : 'No assignments available at the moment'
              }
            </p>
            {!searchQuery && isTeacher && (
              <Button asChild>
                <Link href="/homework/create">Create Assignment</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}