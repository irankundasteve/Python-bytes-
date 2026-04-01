import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: Timestamp.now()
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Get in <span className="text-blue-600">Touch</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Have a question about a tutorial? Want to collaborate on a project? 
                Or just want to say hi? We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                  <Mail className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Email Us</p>
                  <p className="text-slate-500">hello@pythonbytes.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                  <Phone className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Call Us</p>
                  <p className="text-slate-500">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                  <MapPin className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Visit Us</p>
                  <p className="text-slate-500">123 Python Lane, Tech City, TC 12345</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full" />
              <h4 className="text-xl font-bold mb-4">Join our Discord Community</h4>
              <p className="text-blue-100 mb-6">Connect with 50,000+ Python developers worldwide.</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Join Discord
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message here..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
