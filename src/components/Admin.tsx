import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  BookOpen, 
  Users, 
  Settings, 
  Trash2, 
  Edit, 
  Eye, 
  Check, 
  X,
  LayoutDashboard,
  MessageSquare,
  Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Post, Tutorial, Category, Message, Subscriber } from '../types';
import { useAuth } from '../context/AuthContext';
import { cn, formatDate } from '../lib/utils';

export const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'tutorials' | 'messages' | 'subscribers'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubPosts = onSnapshot(query(collection(db, 'posts'), orderBy('createdAt', 'desc')), (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Post)));
    });

    const unsubTutorials = onSnapshot(query(collection(db, 'tutorials'), orderBy('createdAt', 'desc')), (snap) => {
      setTutorials(snap.docs.map(d => ({ id: d.id, ...d.data() } as Tutorial)));
    });

    const unsubMessages = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Message)));
    });

    const unsubSubscribers = onSnapshot(query(collection(db, 'subscribers'), orderBy('createdAt', 'desc')), (snap) => {
      setSubscribers(snap.docs.map(d => ({ id: d.id, ...d.data() } as Subscriber)));
    });

    return () => {
      unsubPosts();
      unsubTutorials();
      unsubMessages();
      unsubSubscribers();
    };
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="text-red-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-8">You do not have administrative privileges to access this panel.</p>
          <a href="#" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const handleDelete = async (coll: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, coll, id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'posts', id), { isPublished: !currentStatus });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Admin Panel</p>
                  <p className="text-xs text-slate-500">v3.0 Master</p>
                </div>
              </div>
            </div>

            {[
              { id: 'posts', icon: FileText, label: 'Blog Posts', count: posts.length },
              { id: 'tutorials', icon: BookOpen, label: 'Tutorials', count: tutorials.length },
              { id: 'messages', icon: MessageSquare, label: 'Messages', count: messages.length },
              { id: 'subscribers', icon: Mail, label: 'Subscribers', count: subscribers.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  activeTab === tab.id ? "bg-white/20" : "bg-slate-100"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
              {(activeTab === 'posts' || activeTab === 'tutorials') && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title / Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status / Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeTab === 'posts' && posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{post.title}</p>
                        <p className="text-xs text-slate-500">{post.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => togglePublish(post.id, post.isPublished)}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            post.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {post.isPublished ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {post.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete('posts', post.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'tutorials' && tutorials.map((tutorial) => (
                    <tr key={tutorial.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{tutorial.title}</p>
                        <p className="text-xs text-slate-500">{tutorial.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{formatDate(tutorial.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete('tutorials', tutorial.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'messages' && messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{msg.name}</p>
                        <p className="text-xs text-slate-500">{msg.subject}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{formatDate(msg.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete('messages', msg.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'subscribers' && subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{sub.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{formatDate(sub.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete('subscribers', sub.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
