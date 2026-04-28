import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

const SAMPLE_BLOG_POSTS = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `# The Future of Web Development: Trends to Watch in 2024

Web development is evolving at an unprecedented pace. As we move through 2024, several key trends are shaping the future of how we build and interact with web applications.

## 1. AI-Powered Development Tools

Artificial Intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are becoming indispensable for modern developers.

\`\`\`javascript
// AI-assisted code completion example
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
\`\`\`

## 2. WebAssembly (WASM) Adoption

WebAssembly is gaining traction for performance-critical applications, allowing developers to run code written in languages like Rust, C++, and Go directly in the browser.

## 3. Progressive Web Apps (PWAs)

PWAs continue to bridge the gap between web and native applications, offering offline functionality and native-like experiences.

The future of web development is bright, with these technologies paving the way for more efficient, powerful, and user-friendly applications.`,
    excerpt: 'Explore the cutting-edge trends that are shaping the future of web development in 2024, from AI-powered tools to WebAssembly.',
    author: 'Admin User',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    tags: ['Web Development', 'AI', 'WebAssembly', 'PWA', 'Trends'],
    readTime: 8,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    likes: 42,
    views: 1250
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js and Express',
    content: `# Building Scalable APIs with Node.js and Express

Creating robust and scalable APIs is crucial for modern web applications. In this comprehensive guide, we'll explore best practices for building APIs with Node.js and Express.

## Setting Up the Foundation

First, let's set up a basic Express server with proper middleware configuration:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Database Integration

For scalable applications, proper database integration is essential:

\`\`\`javascript
const mongoose = require('mongoose');

// User schema example
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
\`\`\`

## Error Handling

Implement comprehensive error handling:

\`\`\`javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error'
  });
});
\`\`\`

## Conclusion

Building scalable APIs requires careful planning, proper architecture, and adherence to best practices. By following these guidelines, you can create robust APIs that can handle growth and maintain performance.`,
    excerpt: 'Learn how to build robust and scalable APIs using Node.js and Express with best practices and real-world examples.',
    author: 'Admin User',
    publishedAt: new Date('2024-01-12T14:30:00Z'),
    updatedAt: new Date('2024-01-12T14:30:00Z'),
    tags: ['Node.js', 'Express', 'API', 'Backend', 'Scalability'],
    readTime: 12,
    isPublished: true,
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    likes: 38,
    views: 890
  }
];

export function BlogProvider({ children }) {
  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('techpulse_blog_posts');
    return saved ? JSON.parse(saved) : SAMPLE_BLOG_POSTS;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('techpulse_blog_comments');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('techpulse_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('techpulse_blog_comments', JSON.stringify(comments));
  }, [comments]);

  const addBlogPost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      views: 0,
      readTime: Math.ceil(postData.content.split(' ').length / 200)
    };
    setBlogPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updateBlogPost = (id, updates) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates, updatedAt: new Date() } : post
    ));
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    // Also remove comments for this post
    setComments(prev => {
      const newComments = { ...prev };
      delete newComments[id];
      return newComments;
    });
  };

  const getPublishedPosts = () => {
    return blogPosts.filter(post => post.isPublished);
  };

  const getPostsByTag = (tag) => {
    return blogPosts.filter(post => 
      post.isPublished && post.tags.includes(tag)
    );
  };

  const incrementViews = (postId) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, views: post.views + 1 } : post
    ));
  };

  const toggleLike = (postId) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = (postId, commentData) => {
    const newComment = {
      id: Date.now().toString(),
      ...commentData,
      createdAt: new Date()
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
    
    return newComment;
  };

  const getCommentsForPost = (postId) => {
    return comments[postId] || [];
  };

  const searchPosts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return blogPosts.filter(post =>
      post.isPublished && (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    );
  };

  return (
    <BlogContext.Provider value={{
      blogPosts,
      comments,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      getPublishedPosts,
      getPostsByTag,
      incrementViews,
      toggleLike,
      addComment,
      getCommentsForPost,
      searchPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}