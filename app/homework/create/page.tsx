"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Calendar as CalendarIcon, Upload, X, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function CreateHomework() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    classId: '',
    points: '100',
    allowLateSubmissions: true,
    requireFiles: false,
    multipleAttempts: false
  });

  const mockClasses = [
    { id: '1', title: 'React Fundamentals' },
    { id: '2', title: 'Advanced JavaScript' },
    { id: '3', title: 'Node.js & Express' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/homework');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAttachment = () => {
    // Simulate file upload
    const fileName = `attachment_${attachments.length + 1}.pdf`;
    setAttachments([...attachments, fileName]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/homework">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homework
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create Assignment</h1>
            <p className="text-muted-foreground">Create a new homework assignment for your students</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="glass glass-dark">
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                  <CardDescription>
                    Provide the basic information about the assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., React Component Exercise"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the assignment..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Detailed Instructions *</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Provide detailed instructions for students..."
                      value={formData.instructions}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      rows={8}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card className="glass glass-dark">
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>
                    Upload files that students will need for this assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button variant="outline" onClick={addAttachment} type="button">
                      <Plus className="h-4 w-4 mr-2" />
                      Add File
                    </Button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Attached Files</Label>
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded">
                          <span className="text-sm">{file}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assignment Settings */}
              <Card className="glass glass-dark">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class *</Label>
                    <Select value={formData.classId} onValueChange={(value) => handleInputChange('classId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClasses.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input
                      id="points"
                      type="number"
                      min="0"
                      max="1000"
                      value={formData.points}
                      onChange={(e) => handleInputChange('points', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submission Options */}
              <Card className="glass glass-dark">
                <CardHeader>
                  <CardTitle>Submission Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Late Submissions</Label>
                      <p className="text-xs text-muted-foreground">
                        Students can submit after due date
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowLateSubmissions}
                      onCheckedChange={(checked) => handleInputChange('allowLateSubmissions', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require File Upload</Label>
                      <p className="text-xs text-muted-foreground">
                        Students must upload files
                      </p>
                    </div>
                    <Switch
                      checked={formData.requireFiles}
                      onCheckedChange={(checked) => handleInputChange('requireFiles', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multiple Attempts</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow resubmissions
                      </p>
                    </div>
                    <Switch
                      checked={formData.multipleAttempts}
                      onCheckedChange={(checked) => handleInputChange('multipleAttempts', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="glass glass-dark">
                <CardHeader>
                  <CardTitle>Assignment Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points:</span>
                    <span>{formData.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span>{dueDate ? format(dueDate, "MMM dd") : "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attachments:</span>
                    <span>{attachments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Late Submissions:</span>
                    <span>{formData.allowLateSubmissions ? "Allowed" : "Not allowed"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/homework">Cancel</Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" type="button">
                Save Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Assignment'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}