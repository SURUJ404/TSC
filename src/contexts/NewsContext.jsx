import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

const SAMPLE_ARTICLES = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning',
    excerpt: 'Scientists at leading tech companies have developed a new AI architecture that promises to revolutionize how machines learn and adapt.',
    content: 'In a groundbreaking development that could reshape the future of artificial intelligence, researchers have unveiled a revolutionary new approach to machine learning that dramatically improves efficiency and accuracy...',
    category: 'ai',
    author: 'Sarah Chen',
    authorBio: 'Senior AI correspondent with 10+ years covering emerging technologies',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    readTime: 8,
    tags: ['AI', 'Machine Learning', 'Technology', 'Innovation'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Startup Raises $50M Series B to Revolutionize Cloud Infrastructure',
    excerpt: 'CloudTech Inc. secures major funding round led by top-tier VCs to expand their innovative cloud platform.',
    content: 'CloudTech Inc., a promising startup in the cloud infrastructure space, has successfully closed a $50 million Series B funding round...',
    category: 'startups',
    author: 'Michael Rodriguez',
    authorBio: 'Venture capital and startup ecosystem expert',
    publishedAt: new Date('2024-01-14T14:30:00Z'),
    readTime: 6,
    tags: ['Startups', 'Funding', 'Cloud', 'Series B'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Major Security Vulnerability Discovered in Popular Web Framework',
    excerpt: 'Critical security flaw affects millions of websites worldwide, immediate patches recommended.',
    content: 'Security researchers have identified a critical vulnerability in one of the most widely-used web frameworks...',
    category: 'security',
    author: 'Alex Thompson',
    authorBio: 'Cybersecurity specialist and ethical hacker',
    publishedAt: new Date('2024-01-13T09:15:00Z'),
    readTime: 5,
    tags: ['Security', 'Vulnerability', 'Web Development', 'Cybersecurity'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'New Mobile App Reaches 1 Million Downloads in First Week',
    excerpt: 'Innovative productivity app takes the mobile world by storm with its unique approach to task management.',
    content: 'A new mobile application has achieved remarkable success, reaching one million downloads within its first week of launch...',
    category: 'apps',
    author: 'Emma Wilson',
    authorBio: 'Mobile technology and app ecosystem analyst',
    publishedAt: new Date('2024-01-12T16:45:00Z'),
    readTime: 4,
    tags: ['Mobile Apps', 'Productivity', 'Downloads', 'Success Story'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Tech Conference 2024 Announces Groundbreaking Speaker Lineup',
    excerpt: 'Industry leaders and innovators set to share insights at the most anticipated tech event of the year.',
    content: 'The annual Tech Conference 2024 has unveiled its speaker lineup, featuring some of the most influential figures in technology...',
    category: 'events',
    author: 'David Park',
    authorBio: 'Technology events and conference coverage specialist',
    publishedAt: new Date('2024-01-11T11:20:00Z'),
    readTime: 3,
    tags: ['Events', 'Conference', 'Speakers', 'Technology'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Venture Capital Firm Launches $200M Fund for Climate Tech',
    excerpt: 'Major VC firm commits significant resources to supporting climate technology startups and sustainable innovation.',
    content: 'In a significant move towards sustainable technology investment, a prominent venture capital firm has announced the launch of a $200 million fund...',
    category: 'venture',
    author: 'Lisa Chang',
    authorBio: 'Climate tech and sustainable innovation reporter',
    publishedAt: new Date('2024-01-10T13:00:00Z'),
    readTime: 7,
    tags: ['Venture Capital', 'Climate Tech', 'Sustainability', 'Investment'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop'
  }
];

export function NewsProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('techpulse_articles');
    return saved ? JSON.parse(saved) : SAMPLE_ARTICLES;
  });

  const [newsletters, setNewsletters] = useState(() => {
    const saved = localStorage.getItem('techpulse_newsletters');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('techpulse_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('techpulse_newsletters', JSON.stringify(newsletters));
  }, [newsletters]);

  const addArticle = (article) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      publishedAt: new Date(),
      readTime: Math.ceil(article.content.split(' ').length / 200)
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id, updates) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...updates } : article
    ));
  };

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const subscribeToNewsletter = (email) => {
    const subscription = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date(),
      active: true
    };
    setNewsletters(prev => [...prev, subscription]);
  };

  const getArticlesByCategory = (category) => {
    return articles.filter(article => article.category === category);
  };

  const getFeaturedArticles = () => {
    return articles.filter(article => article.featured);
  };

  const getLatestArticles = (limit = 10) => {
    return articles
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  };

  const searchArticles = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <NewsContext.Provider value={{
      articles,
      newsletters,
      addArticle,
      updateArticle,
      deleteArticle,
      subscribeToNewsletter,
      getArticlesByCategory,
      getFeaturedArticles,
      getLatestArticles,
      searchArticles
    }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}