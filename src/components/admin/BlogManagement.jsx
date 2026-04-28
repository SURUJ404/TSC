import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function BlogManagement({ 
  blogPosts, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  user, 
  toast 
}) {
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    isPublished: false
  });

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: user.name
    };
    
    if (editingBlog) {
      updateBlogPost(editingBlog.id, blogData);
      toast({ title: "Blog post updated successfully!" });
      setEditingBlog(null);
    } else {
      addBlogPost(blogData);
      toast({ title: "Blog post created successfully!" });
    }
    
    resetBlogForm();
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      featuredImage: '',
      isPublished: false
    });
    setIsCreatingBlog(false);
  };

  const handleEditBlog = (post) => {
    setBlogForm({
      ...post,
      tags: post.tags.join(', ')
    });
    setEditingBlog(post);
    setIsCreatingBlog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={() => setIsCreatingBlog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Blog Form */}
      {isCreatingBlog && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  value={blogForm.title}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <Textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={15}
                  placeholder="Write your blog post content here... You can use Markdown formatting."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="React, JavaScript, Tutorial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                  <Input
                    value={blogForm.featuredImage}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={blogForm.isPublished}
                  onCheckedChange={(checked) => setBlogForm(prev => ({ ...prev, isPublished: checked }))}
                />
                <label className="text-sm font-medium">Publish immediately</label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingBlog ? 'Update Post' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" onClick={resetBlogForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts ({blogPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{post.readTime} min read</span>
                    <span>{post.likes} likes</span>
                    <span>{post.views} views</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBlog(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this post?')) {
                        deleteBlogPost(post.id);
                        toast({ title: "Blog post deleted successfully!" });
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