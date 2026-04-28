import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';

const CATEGORIES = ['latest', 'startups', 'venture', 'security', 'ai', 'apps', 'events', 'courses'];

export default function AdminPage() {
  const { articles, addArticle, updateArticle, deleteArticle } = useNews();
  const { toast } = useToast();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'latest',
    author: '',
    authorBio: '',
    tags: '',
    featured: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'latest',
      author: '',
      authorBio: '',
      tags: '',
      featured: false
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingId) {
      updateArticle(editingId, articleData);
      toast({
        title: "Article updated successfully!"
      });
    } else {
      addArticle(articleData);
      toast({
        title: "Article created successfully!"
      });
    }

    resetForm();
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      authorBio: article.authorBio,
      tags: article.tags.join(', '),
      featured: article.featured
    });
    setEditingId(article.id);
    setIsCreating(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
      toast({
        title: "Article deleted successfully!"
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TechPulse</title>
        <meta name="description" content="Manage articles and content for TechPulse" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your articles and content</p>
              </div>
              <Button
                onClick={() => setIsCreating(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
              </Button>
            </div>

            {/* Create/Edit Form */}
            {isCreating && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>
                    {editingId ? 'Edit Article' : 'Create New Article'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Title *
                        </label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter article title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                          required
                        >
                          {CATEGORIES.map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Excerpt *
                      </label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief description of the article"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Content *
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Full article content"
                        rows={10}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Author *
                        </label>
                        <Input
                          value={formData.author}
                          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                          placeholder="Author name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tags
                        </label>
                        <Input
                          value={formData.tags}
                          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                          placeholder="Comma-separated tags"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Author Bio
                      </label>
                      <Textarea
                        value={formData.authorBio}
                        onChange={(e) => setFormData(prev => ({ ...prev, authorBio: e.target.value }))}
                        placeholder="Brief author biography"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                      />
                      <label className="text-sm font-medium">
                        Featured Article
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>{editingId ? 'Update' : 'Create'} Article</span>
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Articles List */}
            <Card>
              <CardHeader>
                <CardTitle>All Articles ({articles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{article.title}</h3>
                          <Badge variant="secondary">
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge className="bg-yellow-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>By {article.author}</span>
                          <span>{formatDate(article.publishedAt)}</span>
                          <span>{article.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/article/${article.id}`, '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {articles.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No articles yet. Create your first article!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}