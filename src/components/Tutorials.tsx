import React from 'react';
import { BookOpen, Clock, BarChart, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Tutorial } from '../types';

interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, index }) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700'
  }[tutorial.difficulty];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
          <BookOpen className="text-white w-7 h-7" />
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${difficultyColor}`}>
          {tutorial.difficulty}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
        {tutorial.title}
      </h3>

      <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">
        {tutorial.description || 'Master this Python topic with our step-by-step guide and hands-on projects.'}
      </p>

      <div className="flex items-center gap-6 text-xs text-slate-500 mb-8">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>12 Lessons</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart className="w-4 h-4" />
          <span>{tutorial.category}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>4.9</span>
        </div>
      </div>

      <a href={`#tutorial/${tutorial.slug}`} className="w-full bg-slate-50 text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        Start Learning
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export const TutorialGrid: React.FC<{ tutorials: Tutorial[] }> = ({ tutorials }) => {
  return (
    <section id="tutorials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Comprehensive <span className="text-blue-600">Learning Paths</span>
          </h2>
          <p className="text-lg text-slate-600">
            Structured curriculum designed to take you from zero to hero. 
            Each path includes real-world projects and interactive exercises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/4" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Not sure where to start? <br />
                <span className="text-blue-500">Take our Python skill assessment.</span>
              </h3>
              <p className="text-slate-400 text-lg">
                Get a personalized learning path based on your current knowledge 
                and career goals. Takes only 5 minutes.
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                Start Assessment
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Courses', value: '45+' },
                { label: 'Students', value: '120k' },
                { label: 'Projects', value: '200+' },
                { label: 'Reviews', value: '15k' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
