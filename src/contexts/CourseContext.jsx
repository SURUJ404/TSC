import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Complete React Development Bootcamp',
    description: 'Master React from basics to advanced concepts with hands-on projects',
    price: 2999,
    duration: '12 hours',
    level: 'Beginner to Advanced',
    instructor: 'John Doe',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isPaid: true,
    isActive: true,
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Frontend'],
    resources: [
      { name: 'Course Materials.pdf', url: '#', isPaid: true },
      { name: 'Source Code', url: '#', isPaid: false }
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML and AI with practical examples',
    price: 0,
    duration: '8 hours',
    level: 'Beginner',
    instructor: 'Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isPaid: false,
    isActive: true,
    category: 'AI & ML',
    tags: ['Machine Learning', 'Python', 'AI'],
    resources: [
      { name: 'ML Cheat Sheet.pdf', url: '#', isPaid: false },
      { name: 'Dataset Files', url: '#', isPaid: false }
    ],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Advanced Node.js & Express',
    description: 'Build scalable backend applications with Node.js and Express',
    price: 1999,
    duration: '10 hours',
    level: 'Intermediate',
    instructor: 'Mike Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isPaid: true,
    isActive: true,
    category: 'Backend Development',
    tags: ['Node.js', 'Express', 'Backend'],
    resources: [
      { name: 'API Documentation.pdf', url: '#', isPaid: true },
      { name: 'Project Templates', url: '#', isPaid: true }
    ],
    createdAt: new Date('2024-01-05')
  }
];

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('techpulse_courses');
    return saved ? JSON.parse(saved) : SAMPLE_COURSES;
  });

  const [userCourses, setUserCourses] = useState(() => {
    const saved = localStorage.getItem('techpulse_user_courses');
    return saved ? JSON.parse(saved) : {};
  });

  const [paymentRequests, setPaymentRequests] = useState(() => {
    const saved = localStorage.getItem('techpulse_payment_requests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('techpulse_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('techpulse_user_courses', JSON.stringify(userCourses));
  }, [userCourses]);

  useEffect(() => {
    localStorage.setItem('techpulse_payment_requests', JSON.stringify(paymentRequests));
  }, [paymentRequests]);

  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isActive: true
    };
    setCourses(prev => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (id, updates) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const getActiveCourses = () => {
    return courses.filter(course => course.isActive);
  };

  const getCoursesByCategory = (category) => {
    return courses.filter(course => course.category === category && course.isActive);
  };

  const hasAccessToCourse = (courseId, userId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    if (!course.isPaid) return true;
    return userCourses[userId]?.includes(courseId) || false;
  };

  const requestCourseAccess = (courseId, userId, transactionId, userEmail) => {
    const request = {
      id: Date.now().toString(),
      courseId,
      userId,
      userEmail,
      transactionId,
      status: 'pending',
      createdAt: new Date()
    };
    setPaymentRequests(prev => [request, ...prev]);
    return request;
  };

  const approvePaymentRequest = (requestId) => {
    const request = paymentRequests.find(r => r.id === requestId);
    if (request) {
      // Update request status
      setPaymentRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      ));
      
      // Grant course access
      setUserCourses(prev => ({
        ...prev,
        [request.userId]: [...(prev[request.userId] || []), request.courseId]
      }));
    }
  };

  const rejectPaymentRequest = (requestId) => {
    setPaymentRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' } : r
    ));
  };

  const getPendingPaymentRequests = () => {
    return paymentRequests.filter(r => r.status === 'pending');
  };

  return (
    <CourseContext.Provider value={{
      courses,
      userCourses,
      paymentRequests,
      addCourse,
      updateCourse,
      deleteCourse,
      getActiveCourses,
      getCoursesByCategory,
      hasAccessToCourse,
      requestCourseAccess,
      approvePaymentRequest,
      rejectPaymentRequest,
      getPendingPaymentRequests
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}