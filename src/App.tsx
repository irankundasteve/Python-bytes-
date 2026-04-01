import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Post, Tutorial } from './types';
import { AuthProvider } from './context/AuthContext';
import { Navbar, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { BlogGrid } from './components/Blog';
import { TutorialGrid } from './components/Tutorials';
import { Contact } from './components/Contact';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Python 3.13: What You Need to Know',
    slug: 'python-3-13-getting-started',
    content: '',
    excerpt: 'Python 3.13 is here with significant performance improvements and new features. Learn how to upgrade and what to expect.',
    authorId: 'admin',
    authorName: 'Steve Irankunda',
    category: 'News',
    isPublished: true,
    createdAt: Timestamp.now(),
    tags: ['python', 'news', 'performance']
  },
  {
    id: '2',
    title: 'Building Scalable APIs with FastAPI and PostgreSQL',
    slug: 'fastapi-postgresql-guide',
    content: '',
    excerpt: 'A deep dive into building production-ready APIs using FastAPI, including database migrations and authentication.',
    authorId: 'admin',
    authorName: 'Steve Irankunda',
    category: 'Web Dev',
    isPublished: true,
    createdAt: Timestamp.now(),
    tags: ['fastapi', 'backend', 'sql']
  },
  {
    id: '3',
    title: 'Mastering List Comprehensions in Python',
    slug: 'python-list-comprehensions',
    content: '',
    excerpt: 'Write cleaner, more efficient code by mastering one of Pythons most powerful features: list comprehensions.',
    authorId: 'admin',
    authorName: 'Steve Irankunda',
    category: 'Tutorial',
    isPublished: true,
    createdAt: Timestamp.now(),
    tags: ['basics', 'tips']
  }
];

const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Python for Beginners',
    slug: 'python-beginners',
    description: 'Start your journey with Python. Learn the syntax, data types, and basic control flow.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    createdAt: Timestamp.now()
  },
  {
    id: '2',
    title: 'Data Analysis with Pandas',
    slug: 'pandas-data-analysis',
    description: 'Learn how to manipulate and analyze complex datasets using the powerful Pandas library.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    createdAt: Timestamp.now()
  },
  {
    id: '3',
    title: 'Advanced Concurrency',
    slug: 'advanced-concurrency',
    description: 'Master asyncio, threading, and multiprocessing for high-performance Python applications.',
    category: 'Advanced',
    difficulty: 'Advanced',
    createdAt: Timestamp.now()
  }
];

const Toast: React.FC<{ message: string, type: 'success' | 'error', onClose: () => void }> = ({ message, type, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, x: 50 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed bottom-8 right-8 z-[100]"
  >
    <div className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border ${
      type === 'success' ? 'bg-white border-green-100 text-green-800' : 'bg-white border-red-100 text-red-800'
    }`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
      <p className="text-sm font-bold pr-8">{message}</p>
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

import { AdminPanel } from './components/Admin';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash || '#');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Real-time posts
    const postsQuery = query(
      collection(db, 'posts'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    );

    const unsubPosts = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(fetchedPosts.length > 0 ? fetchedPosts : MOCK_POSTS);
    }, (error) => {
      console.error('Error fetching posts:', error);
      setPosts(MOCK_POSTS);
    });

    // Real-time tutorials
    const tutorialsQuery = query(
      collection(db, 'tutorials'),
      orderBy('createdAt', 'desc'),
      limit(6)
    );

    const unsubTutorials = onSnapshot(tutorialsQuery, (snapshot) => {
      const fetchedTutorials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tutorial));
      setTutorials(fetchedTutorials.length > 0 ? fetchedTutorials : MOCK_TUTORIALS);
    }, (error) => {
      console.error('Error fetching tutorials:', error);
      setTutorials(MOCK_TUTORIALS);
    });

    return () => {
      unsubPosts();
      unsubTutorials();
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        
        <main>
          {currentPath === '#admin' ? (
            <AdminPanel />
          ) : (
            <>
              <Hero />
              <BlogGrid posts={posts} />
              <TutorialGrid tutorials={tutorials} />
              <Contact />
            </>
          )}
        </main>

        <Footer />

        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </AnimatePresence>

        {/* Scroll to top button */}
        <motion.button 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all z-40"
        >
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ↑
          </motion.div>
        </motion.button>
      </div>
    </AuthProvider>
  );
}
