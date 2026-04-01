import React from 'react';
import { ArrowRight, Play, Star, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-100">
              <TrendingUp className="w-4 h-4" />
              <span>New: Python 3.13 Performance Guide</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-sans tracking-tight text-slate-900 leading-[1.1]">
              Master Python, <br />
              <span className="text-blue-600">One Byte</span> at a Time.
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Dive into comprehensive tutorials, explore powerful libraries, 
              and build amazing projects with our expert guides. 
              From beginner basics to advanced architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#blog" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
              >
                Read the Latest Posts
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#tutorials" 
                className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Browse All Tutorials
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">10k+</span> Pythonistas joined this month
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden aspect-video lg:aspect-square">
              <img 
                src="https://picsum.photos/seed/python-code/1200/1200" 
                alt="Python Illustration" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <div className="flex items-center gap-4 text-white">
                  <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                  <div>
                    <p className="font-bold text-lg">Watch: Python for Data Science</p>
                    <p className="text-sm text-slate-200">12-part comprehensive series</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-bounce">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="text-yellow-600 w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Editor's Pick</p>
                <p className="text-sm font-bold text-slate-900">FastAPI Masterclass</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="text-green-600 w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Trending</p>
                <p className="text-sm font-bold text-slate-900">AI with Python</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
