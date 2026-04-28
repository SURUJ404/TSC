import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function CourseManagement({ 
  courses, 
  addCourse, 
  updateCourse, 
  deleteCourse, 
  user, 
  toast 
}) {
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    level: 'Beginner',
    instructor: '',
    category: '',
    tags: '',
    videoUrl: '',
    thumbnail: '',
    isPaid: false,
    isActive: true
  });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const courseData = {
      ...courseForm,
      price: parseFloat(courseForm.price),
      tags: courseForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      instructor: courseForm.instructor || user.name
    };
    
    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      toast({ title: "Course updated successfully!" });
      setEditingCourse(null);
    } else {
      addCourse(courseData);
      toast({ title: "Course created successfully!" });
    }
    
    resetCourseForm();
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      price: 0,
      duration: '',
      level: 'Beginner',
      instructor: '',
      category: '',
      tags: '',
      videoUrl: '',
      thumbnail: '',
      isPaid: false,
      isActive: true
    });
    setIsCreatingCourse(false);
  };

  const handleEditCourse = (course) => {
    setCourseForm({
      ...course,
      tags: course.tags.join(', ')
    });
    setEditingCourse(course);
    setIsCreatingCourse(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button onClick={() => setIsCreatingCourse(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Course Form */}
      {isCreatingCourse && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Input
                    value={courseForm.category}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <Input
                    value={courseForm.videoUrl}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                  <Input
                    value={courseForm.thumbnail}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={courseForm.tags}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, JavaScript, Frontend"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={courseForm.isPaid}
                    onCheckedChange={(checked) => setCourseForm(prev => ({ ...prev, isPaid: checked }))}
                  />
                  <label className="text-sm font-medium">Paid Course</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={courseForm.isActive}
                    onCheckedChange={(checked) => setCourseForm(prev => ({ ...prev, isActive: checked }))}
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCourseForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Courses List */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Badge variant={course.isPaid ? 'default' : 'secondary'}>
                      {course.isPaid ? `₹${course.price}` : 'Free'}
                    </Badge>
                    <Badge variant={course.isActive ? 'default' : 'outline'}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{course.category}</span>
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this course?')) {
                        deleteCourse(course.id);
                        toast({ title: "Course deleted successfully!" });
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}