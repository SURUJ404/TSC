import React, { useState } from 'react';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Shield, 
  Brain, 
  Smartphone, 
  Calendar, 
  Edit, 
  Save,
  Eye,
  Image,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNews } from '@/contexts/NewsContext';

const PAGE_CATEGORIES = [
  { 
    key: 'latest', 
    name: 'Latest News', 
    icon: TrendingUp, 
    color: 'from-gray-500 to-slate-600',
    description: 'Breaking news and recent developments'
  },
  { 
    key: 'startups', 
    name: 'Startups', 
    icon: Users, 
    color: 'from-green-500 to-emerald-600',
    description: 'Emerging companies and entrepreneurial stories'
  },
  { 
    key: 'venture', 
    name: 'Venture Capital', 
    icon: TrendingUp, 
    color: 'from-blue-500 to-cyan-600',
    description: 'Investment news and funding rounds'
  },
  { 
    key: 'security', 
    name: 'Cybersecurity', 
    icon: Shield, 
    color: 'from-red-500 to-rose-600',
    description: 'Security threats and protection strategies'
  },
  { 
    key: 'ai', 
    name: 'Artificial Intelligence', 
    icon: Brain, 
    color: 'from-purple-500 to-violet-600',
    description: 'AI breakthroughs and machine learning'
  },
  { 
    key: 'apps', 
    name: 'Apps & Software', 
    icon: Smartphone, 
    color: 'from-orange-500 to-amber-600',
    description: 'Mobile apps and software reviews'
  },
  { 
    key: 'events', 
    name: 'Tech Events', 
    icon: Calendar, 
    color: 'from-pink-500 to-rose-600',
    description: 'Conferences and industry gatherings'
  }
];

export default function PageManagement({ toast }) {
  const { getArticlesByCategory, addArticle, updateArticle } = useNews();
  const [selectedPage, setSelectedPage] = useState('latest');
  const [editingContent, setEditingContent] = useState(false);
  const [pageSettings, setPageSettings] = useState(() => {
    const saved = localStorage.getItem('techpulse_page_settings');
    return saved ? JSON.parse(saved) : {
      latest: { 
        heroTitle: 'Latest Tech News', 
        heroSubtitle: 'Stay updated with breaking technology news',
        heroImage: '',
        featured: true,
        customSections: []
      },
      startups: { 
        heroTitle: 'Startup Ecosystem', 
        heroSubtitle: 'Discover emerging companies and entrepreneurial stories',
        heroImage: '',
        featured: true,
        customSections: []
      },
      venture: { 
        heroTitle: 'Venture Capital', 
        heroSubtitle: 'Investment news, funding rounds, and market analysis',
        heroImage: '',
        featured: true,
        customSections: []
      },
      security: { 
        heroTitle: 'Cybersecurity', 
        heroSubtitle: 'Security threats, vulnerabilities, and protection strategies',
        heroImage: '',
        featured: true,
        customSections: []
      },
      ai: { 
        heroTitle: 'Artificial Intelligence', 
        heroSubtitle: 'AI breakthroughs, machine learning, and future technologies',
        heroImage: '',
        featured: true,
        customSections: []
      },
      apps: { 
        heroTitle: 'Apps & Software', 
        heroSubtitle: 'Mobile apps, software reviews, and digital tools',
        heroImage: '',
        featured: true,
        customSections: []
      },
      events: { 
        heroTitle: 'Tech Events', 
        heroSubtitle: 'Conferences, webinars, and industry gatherings',
        heroImage: '',
        featured: true,
        customSections: []
      }
    };
  });

  const [newArticleForm, setNewArticleForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin User',
    authorBio: 'Platform Administrator',
    tags: '',
    featured: false,
    imageUrl: '',
    imageFile: null
  });

  const currentPageInfo = PAGE_CATEGORIES.find(p => p.key === selectedPage);
  const currentPageArticles = getArticlesByCategory(selectedPage);
  const currentPageSettings = pageSettings[selectedPage] || {};

  const savePageSettings = () => {
    localStorage.setItem('techpulse_page_settings', JSON.stringify(pageSettings));
    toast({ title: "Page settings saved successfully!" });
    setEditingContent(false);
  };

  const handlePageSettingChange = (field, value) => {
    setPageSettings(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Please select a valid image file",
          variant: "destructive"
        });
        return;
      }

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      
      if (type === 'hero') {
        handlePageSettingChange('heroImage', imageUrl);
      } else if (type === 'article') {
        setNewArticleForm(prev => ({ 
          ...prev, 
          imageFile: file,
          imageUrl: imageUrl
        }));
      }
      
      toast({
        title: "Image uploaded successfully!",
        description: "In production, this would be uploaded to cloud storage."
      });
    }
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    
    if (!newArticleForm.title || !newArticleForm.content || !newArticleForm.excerpt) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const articleData = {
      ...newArticleForm,
      category: selectedPage,
      tags: newArticleForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: newArticleForm.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop`
    };

    addArticle(articleData);
    toast({ title: "Article created successfully!" });
    
    // Reset form
    setNewArticleForm({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin User',
      authorBio: 'Platform Administrator',
      tags: '',
      featured: false,
      imageUrl: '',
      imageFile: null
    });
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
        <h2 className="text-2xl font-bold">Page Management</h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Direct control over all pages</span>
        </div>
      </div>

      {/* Page Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Page to Manage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {PAGE_CATEGORIES.map((page) => {
              const Icon = page.icon;
              const articleCount = getArticlesByCategory(page.key).length;
              
              return (
                <Button
                  key={page.key}
                  variant={selectedPage === page.key ? 'default' : 'outline'}
                  onClick={() => setSelectedPage(page.key)}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-xs">{page.name}</div>
                    <div className="text-xs text-muted-foreground">{articleCount} articles</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Page Management Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="articles">Manage Articles</TabsTrigger>
          <TabsTrigger value="create">Create Article</TabsTrigger>
        </TabsList>

        {/* Page Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {currentPageInfo && <currentPageInfo.icon className="w-5 h-5" />}
                  <span>{currentPageInfo?.name} Page Settings</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/category/${selectedPage}`, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant={editingContent ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEditingContent(!editingContent)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {editingContent ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {editingContent ? (
                <>
                  {/* Hero Section Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Hero Section</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Hero Title</label>
                        <Input
                          value={currentPageSettings.heroTitle || ''}
                          onChange={(e) => handlePageSettingChange('heroTitle', e.target.value)}
                          placeholder="Enter hero title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                        <Input
                          value={currentPageSettings.heroSubtitle || ''}
                          onChange={(e) => handlePageSettingChange('heroSubtitle', e.target.value)}
                          placeholder="Enter hero subtitle"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Hero Background Image</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            value={currentPageSettings.heroImage || ''}
                            onChange={(e) => handlePageSettingChange('heroImage', e.target.value)}
                            placeholder="https://your-image-url.com/image.jpg"
                          />
                        </div>
                        <div>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                            <div className="text-center">
                              <Image className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'hero')}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {currentPageSettings.heroImage && (
                        <div className="mt-2">
                          <img
                            src={currentPageSettings.heroImage}
                            alt="Hero preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentPageSettings.featured || false}
                        onCheckedChange={(checked) => handlePageSettingChange('featured', checked)}
                      />
                      <label className="text-sm font-medium">Featured Page</label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={savePageSettings}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditingContent(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Current Settings</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Title:</strong> {currentPageSettings.heroTitle || 'Default title'}</div>
                        <div><strong>Subtitle:</strong> {currentPageSettings.heroSubtitle || 'Default subtitle'}</div>
                        <div><strong>Featured:</strong> {currentPageSettings.featured ? 'Yes' : 'No'}</div>
                        <div><strong>Articles:</strong> {currentPageArticles.length}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Page Preview</h4>
                      {currentPageSettings.heroImage ? (
                        <img
                          src={currentPageSettings.heroImage}
                          alt="Page hero"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${currentPageInfo?.color} flex items-center justify-center`}>
                          {currentPageInfo && <currentPageInfo.icon className="w-8 h-8 text-white" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Articles Tab */}
        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>{currentPageInfo?.name} Articles ({currentPageArticles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPageArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{article.title}</h3>
                        {article.featured && (
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>By {article.author}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
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
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {currentPageArticles.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No articles in this category yet. Create your first article!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Article Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Article for {currentPageInfo?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateArticle} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Article Title *</label>
                    <Input
                      value={newArticleForm.title}
                      onChange={(e) => setNewArticleForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter article title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <Input
                      value={newArticleForm.author}
                      onChange={(e) => setNewArticleForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt *</label>
                  <Textarea
                    value={newArticleForm.excerpt}
                    onChange={(e) => setNewArticleForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the article"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content *</label>
                  <Textarea
                    value={newArticleForm.content}
                    onChange={(e) => setNewArticleForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Full article content (supports Markdown)"
                    rows={12}
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Featured Image</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <Input
                        value={newArticleForm.imageUrl}
                        onChange={(e) => setNewArticleForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://your-image-hosting.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Or Upload Image</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                        <div className="text-center">
                          <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'article')}
                            className="text-xs"
                          />
                          {newArticleForm.imageFile && (
                            <div className="mt-2 p-2 bg-muted rounded">
                              <p className="text-xs font-medium">{newArticleForm.imageFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(newArticleForm.imageFile.size)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {newArticleForm.imageUrl && (
                    <div>
                      <img
                        src={newArticleForm.imageUrl}
                        alt="Article preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      value={newArticleForm.tags}
                      onChange={(e) => setNewArticleForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="React, JavaScript, Tutorial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author Bio</label>
                    <Input
                      value={newArticleForm.authorBio}
                      onChange={(e) => setNewArticleForm(prev => ({ ...prev, authorBio: e.target.value }))}
                      placeholder="Brief author biography"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newArticleForm.featured}
                    onCheckedChange={(checked) => setNewArticleForm(prev => ({ ...prev, featured: checked }))}
                  />
                  <label className="text-sm font-medium">Featured Article</label>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Publishing to: {currentPageInfo?.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentPageInfo?.description}</p>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Create Article
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setNewArticleForm({
                      title: '',
                      excerpt: '',
                      content: '',
                      author: 'Admin User',
                      authorBio: 'Platform Administrator',
                      tags: '',
                      featured: false,
                      imageUrl: '',
                      imageFile: null
                    })}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}