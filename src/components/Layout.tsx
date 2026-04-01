import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  User, 
  LogOut, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Rss,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const Navbar: React.FC = () => {
  const { user, profile, isAdmin, signIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { 
      name: 'Blog', 
      href: '#blog',
      dropdown: ['Latest Posts', 'Popular', 'Python Tips']
    },
    { 
      name: 'Tutorials', 
      href: '#tutorials',
      dropdown: ['Beginner', 'Intermediate', 'Advanced', 'Data Science']
    },
    { name: 'Libraries', href: '#' },
    { name: 'Frameworks', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <Terminal className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-sans tracking-tight text-slate-900">
              Python <span className="text-blue-600">Bytes</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 overflow-hidden"
                  >
                    {link.dropdown.map((item) => (
                      <a 
                        key={item} 
                        href="#" 
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{profile?.displayName || 'User'}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                {isAdmin && (
                  <a href="#admin" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                    Admin
                  </a>
                )}
              </div>
            ) : (
              <button 
                onClick={signIn}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Subscribe
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a 
                    href={link.href}
                    className="block text-lg font-medium text-slate-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                  {link.dropdown && (
                    <div className="mt-2 ml-4 space-y-2">
                      {link.dropdown.map((item) => (
                        <a key={item} href="#" className="block text-sm text-slate-500">{item}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                {user ? (
                  <button onClick={logout} className="flex items-center gap-2 text-red-500 font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                ) : (
                  <button onClick={signIn} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: Timestamp.now()
      });
      setEmail('');
      alert('Subscribed successfully!');
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Terminal className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">Python Bytes</span>
            </div>
            <p className="text-sm leading-relaxed">
              Master Python, one byte at a time. We provide high-quality tutorials, 
              library reviews, and framework guides for Python developers of all levels.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Rss className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-6">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Python Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PyPI - Package Index</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Forums</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learning Paths</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cheat Sheets</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Updated</h3>
            <p className="text-sm mb-6">Get the latest Python news and tutorials delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Python Bytes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
