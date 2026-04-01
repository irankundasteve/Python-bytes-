import React from 'react';
import { Calendar, User, Tag, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Post } from '../types';
import { formatDate } from '../lib/utils';

interface PostCardProps {
  post: Post;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={post.featuredImage || `https://picsum.photos/seed/${post.slug}/800/450`} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {post.videoUrl && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
            <PlayCircle className="w-5 h-5 text-blue-600" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {post.authorName || 'Admin'}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt || 'No summary available for this post.'}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100">
                #{tag}
              </span>
            ))}
          </div>
          <a href={`#post/${post.slug}`} className="text-blue-600 font-bold text-sm flex items-center gap-1 group/link">
            Read More
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export const BlogGrid: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <section id="blog" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Latest from the <span className="text-blue-600">Blog</span>
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Stay up to date with the latest Python trends, library updates, and developer insights.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm">All</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Web</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Data</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">AI</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white text-slate-900 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  );
};
