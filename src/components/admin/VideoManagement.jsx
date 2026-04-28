import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play, Upload, Clock, DollarSign, FileVideo, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function VideoManagement({ 
  courses, 
  addCourse, 
  updateCourse, 
  deleteCourse, 
  user, 
  toast 
}) {
  const [isCreatingVideo, setIsCreatingVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    videoFile: null,
    thumbnail: '',
    thumbnailFile: null,
    duration: '',
    price: 0,
    level: 'Beginner',
    category: '',
    tags: '',
    isPaid: false,
    isActive: true,
    resources: []
  });

  const handleCreateVideo = (e) => {
    e.preventDefault();
    
    if (!videoForm.title || !videoForm.description) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === 'url' && !videoForm.videoUrl) {
      toast({
        title: "Please provide a video URL",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === 'file' && !videoForm.videoFile && !editingVideo) {
      toast({
        title: "Please select a video file",
        variant: "destructive"
      });
      return;
    }

    // Simulate file upload - in real app, you'd upload to cloud storage
    let finalVideoUrl = videoForm.videoUrl;
    let finalThumbnail = videoForm.thumbnail;

    if (uploadMethod === 'file' && videoForm.videoFile) {
      // Create object URL for preview (in production, upload to cloud storage)
      finalVideoUrl = URL.createObjectURL(videoForm.videoFile);
      toast({
        title: "Video file processed successfully!",
        description: "In production, this would be uploaded to cloud storage."
      });
    }

    if (videoForm.thumbnailFile) {
      finalThumbnail = URL.createObjectURL(videoForm.thumbnailFile);
    }

    const videoData = {
      ...videoForm,
      videoUrl: finalVideoUrl,
      thumbnail: finalThumbnail || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      price: parseFloat(videoForm.price),
      tags: videoForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      instructor: user.name,
      uploadMethod,
      resources: [
        { name: 'Video Notes.pdf', url: '#', isPaid: videoForm.isPaid },
        { name: 'Source Files', url: '#', isPaid: false }
      ]
    };
    
    if (editingVideo) {
      updateCourse(editingVideo.id, videoData);
      toast({ title: "Video updated successfully!" });
      setEditingVideo(null);
    } else {
      addCourse(videoData);
      toast({ title: "Video uploaded successfully!" });
    }
    
    resetVideoForm();
  };

  const resetVideoForm = () => {
    setVideoForm({
      title: '',
      description: '',
      videoUrl: '',
      videoFile: null,
      thumbnail: '',
      thumbnailFile: null,
      duration: '',
      price: 0,
      level: 'Beginner',
      category: '',
      tags: '',
      isPaid: false,
      isActive: true,
      resources: []
    });
    setIsCreatingVideo(false);
    setUploadMethod('url');
  };

  const handleEditVideo = (video) => {
    setVideoForm({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      videoFile: null,
      thumbnail: video.thumbnail,
      thumbnailFile: null,
      duration: video.duration,
      price: video.price,
      level: video.level,
      category: video.category,
      tags: video.tags.join(', '),
      isPaid: video.isPaid,
      isActive: video.isActive,
      resources: video.resources || []
    });
    setUploadMethod(video.uploadMethod || 'url');
    setEditingVideo(video);
    setIsCreatingVideo(true);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'video') {
        // Validate video file
        if (!file.type.startsWith('video/')) {
          toast({
            title: "Please select a valid video file",
            variant: "destructive"
          });
          return;
        }
        setVideoForm(prev => ({ ...prev, videoFile: file }));
      } else if (type === 'thumbnail') {
        // Validate image file
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Please select a valid image file",
            variant: "destructive"
          });
          return;
        }
        setVideoForm(prev => ({ ...prev, thumbnailFile: file }));
      }
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return 'Not set';
    return duration;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Video Management</h2>
        <Button onClick={() => setIsCreatingVideo(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Video Upload Form */}
      {isCreatingVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>{editingVideo ? 'Edit Video' : 'Upload New Video'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateVideo} className="space-y-6">
              {/* Upload Method Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Upload Method</label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={uploadMethod === 'url' ? 'default' : 'outline'}
                    onClick={() => setUploadMethod('url')}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>URL</span>
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === 'file' ? 'default' : 'outline'}
                    onClick={() => setUploadMethod('file')}
                    className="flex items-center space-x-2"
                  >
                    <FileVideo className="w-4 h-4" />
                    <span>Upload File</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video Title *</label>
                  <Input
                    value={videoForm.title}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter video title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Input
                    value={videoForm.category}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Web Development, AI, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  value={videoForm.description}
                  onChange={(e) => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what viewers will learn"
                  rows={3}
                  required
                />
              </div>

              {/* Video Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Video Content</h3>
                
                {uploadMethod === 'url' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL *</label>
                    <Input
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                      placeholder="https://your-video-hosting.com/video.mp4"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported: YouTube, Vimeo, direct MP4/WebM URLs
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Video File *</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <FileVideo className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Choose a video file</p>
                          <p className="text-xs text-muted-foreground">
                            Supports MP4, WebM, MOV (Max: 500MB)
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, 'video')}
                          className="mt-4"
                        />
                        {videoForm.videoFile && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium">{videoForm.videoFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(videoForm.videoFile.size)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thumbnail</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                    <Input
                      value={videoForm.thumbnail}
                      onChange={(e) => setVideoForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://your-image-hosting.com/thumbnail.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Or Upload Thumbnail</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                      <div className="text-center">
                        <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'thumbnail')}
                          className="text-xs"
                        />
                        {videoForm.thumbnailFile && (
                          <div className="mt-2 p-2 bg-muted rounded">
                            <p className="text-xs font-medium">{videoForm.thumbnailFile.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      value={videoForm.duration}
                      onChange={(e) => setVideoForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 45 minutes"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="number"
                      value={videoForm.price}
                      onChange={(e) => setVideoForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0 for free"
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={videoForm.level}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={videoForm.tags}
                  onChange={(e) => setVideoForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, JavaScript, Tutorial, Frontend"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={videoForm.isPaid}
                    onCheckedChange={(checked) => setVideoForm(prev => ({ ...prev, isPaid: checked }))}
                  />
                  <label className="text-sm font-medium">Paid Content</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={videoForm.isActive}
                    onCheckedChange={(checked) => setVideoForm(prev => ({ ...prev, isActive: checked }))}
                  />
                  <label className="text-sm font-medium">Publish Immediately</label>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Video Upload Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>File Upload:</strong> Upload directly from your device (MP4, WebM, MOV)</li>
                  <li>• <strong>URL Method:</strong> Use YouTube, Vimeo, or direct video URLs</li>
                  <li>• <strong>Recommended formats:</strong> MP4 (H.264), WebM</li>
                  <li>• <strong>Quality:</strong> 1080p or higher for best viewing experience</li>
                  <li>• <strong>Thumbnail:</strong> 1280x720 pixels, JPG/PNG format</li>
                  <li>• <strong>File size limit:</strong> 500MB for direct uploads</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingVideo ? 'Update Video' : 'Upload Video'}
                </Button>
                <Button type="button" variant="outline" onClick={resetVideoForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Videos List */}
      <Card>
        <CardHeader>
          <CardTitle>All Videos ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((video) => (
              <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="relative">
                    <img
                      src={video.thumbnail || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=80&fit=crop'}
                      alt={video.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    {video.uploadMethod === 'file' && (
                      <div className="absolute -top-1 -right-1">
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          File
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{video.title}</h3>
                      <Badge variant={video.isPaid ? 'default' : 'secondary'}>
                        {video.isPaid ? `₹${video.price}` : 'Free'}
                      </Badge>
                      <Badge variant={video.isActive ? 'default' : 'outline'}>
                        {video.isActive ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{video.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{video.category}</span>
                      <span>{formatDuration(video.duration)}</span>
                      <span>{video.level}</span>
                      <span>By {video.instructor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (video.videoUrl) {
                        window.open(`/course/${video.id}`, '_blank');
                      } else {
                        toast({
                          title: "Video preview not available",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditVideo(video)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this video?')) {
                        deleteCourse(video.id);
                        toast({ title: "Video deleted successfully!" });
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No videos uploaded yet. Upload your first video!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}