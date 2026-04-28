import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useNews } from '@/contexts/NewsContext';

const CATEGORIES = ['latest', 'startups', 'venture', 'security', 'ai', 'apps', 'events', 'courses'];

export default function ArticleManagement({ user, toast }) {
  const { articles, addArticle, updateArticle, deleteArticle } = useNews();
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [articleForm, setArticleForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'latest',
    author: '',
    authorBio: '',
    tags: '',
    featured: false,
    imageUrl: ''
  });

  const handleCreateArticle = (e) => {
    e.preventDefault();
    
    if (!articleForm.title || !articleForm.content || !articleForm.excerpt) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const articleData = {
      ...articleForm,
      author: articleForm.author || user.name,
      tags: articleForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
      toast({ title: "Article updated successfully!" });
      setEditingArticle(null);
    } else {
      addArticle(articleData);
      toast({ title: "Article created successfully!" });
    }
    
    resetArticleForm();
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'latest',
      author: '',
      authorBio: '',
      tags: '',
      featured: false,
      imageUrl: ''
    });
    setIsCreatingArticle(false);
  };

  const handleEditArticle = (article) => {
    setArticleForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      authorBio: article.authorBio || '',
      tags: article.tags.join(', '),
      featured: article.featured || false,
      imageUrl: article.imageUrl || ''
    });
    setEditingArticle(article);
    setIsCreatingArticle(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Article Management</h2>
        <Button onClick={() => setIsCreatingArticle(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Article Form */}
      {isCreatingArticle && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingArticle ? 'Edit Article' : 'Create New Article'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={articleForm.title}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter article title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, category: e.target.value }))}
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
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the article"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <Textarea
                  value={articleForm.content}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content (supports Markdown)"
                  rows={12}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={articleForm.author}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name (defaults to your name)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                  <Input
                    value={articleForm.imageUrl}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, JavaScript, Tutorial"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author Bio</label>
                <Textarea
                  value={articleForm.authorBio}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, authorBio: e.target.value }))}
                  placeholder="Brief author biography"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={articleForm.featured}
                  onCheckedChange={(checked) => setArticleForm(prev => ({ ...prev, featured: checked }))}
                />
                <label className="text-sm font-medium">Featured Article</label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingArticle ? 'Update Article' : 'Create Article'}
                </Button>
                <Button type="button" variant="outline" onClick={resetArticleForm}>
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
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                  <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditArticle(article)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this article?')) {
                        deleteArticle(article.id);
                        toast({ title: "Article deleted successfully!" });
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No articles yet. Create your first article!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}