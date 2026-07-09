import React, { useState } from 'react';
import { Calendar, User, Clock, ChevronLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Simulated Interactive Comment Section
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Record<string, { name: string; content: string; date: string }[]>>({
    'blog_1': [
      { name: 'Nuhu Sani', content: 'Very accurate guide. I purchased a custom laptop with 16GB RAM from VISTA last month for Photoshop, and it compiles raw photos instantaneously!', date: '2026-06-16' }
    ]
  });

  const categories = ['all', 'Technology', 'Coding', 'Graphics', 'Entrepreneurship', 'Digital Transformation', 'Career'];

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  const handlePostComment = (e: React.FormEvent, blogId: string) => {
    e.preventDefault();
    if (!commentName || !commentContent) return;

    const newComment = {
      name: commentName,
      content: commentContent,
      date: new Date().toISOString().split('T')[0]
    };

    setComments(prev => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), newComment]
    }));

    setCommentName('');
    setCommentContent('');
  };

  if (selectedBlog) {
    const blogComments = comments[selectedBlog.id] || [];
    return (
      <div id="blog-reader-view" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8 animate-in fade-in duration-200">
        
        {/* Back navigation button */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        {/* Header Title */}
        <div className="space-y-4">
          <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded bg-blue-50 border border-blue-150 text-blue-700">
            {selectedBlog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display leading-tight">{selectedBlog.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-450 border-y border-slate-100 py-3">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1.5" />By {selectedBlog.author}</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" />Published: {selectedBlog.publishedAt}</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" />{selectedBlog.readTime}</span>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 shadow-sm bg-slate-50">
          <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
        </div>

        {/* Rich content body */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-5">
          {selectedBlog.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('###')) {
              return <h3 key={idx} className="text-xl font-bold text-slate-900 pt-3">{paragraph.replace('###', '').trim()}</h3>;
            }
            if (paragraph.startsWith('-')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1">
                  {paragraph.split('\n').map((li, i) => (
                    <li key={i}>{li.replace('-', '').trim()}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Comments Section */}
        <div className="border-t border-slate-150 pt-10 space-y-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-slate-700" />
            <h3 className="font-extrabold text-sm text-slate-950 tracking-tight">Article Discussion ({blogComments.length})</h3>
          </div>

          {/* List existing comments */}
          {blogComments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No comments yet. Be the first to start the conversation!</p>
          ) : (
            <div className="space-y-4">
              {blogComments.map((comment, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-1.5 text-xs text-left">
                  <div className="flex justify-between items-center text-slate-400">
                    <strong className="text-slate-900">{comment.name}</strong>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Post a comment form */}
          <form onSubmit={(e) => handlePostComment(e, selectedBlog.id)} className="bg-white p-5 rounded-xl border border-slate-150 space-y-3">
            <p className="text-xs font-bold text-slate-700">Add your comment:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your Name"
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <textarea
              rows={3}
              required
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment thoughts..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg cursor-pointer"
            >
              Post Comment
            </button>
          </form>
        </div>

      </div>
    );
  }

  return (
    <div id="blog-section" className="space-y-16 pb-20 text-left">
      
      {/* Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA educational insights</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">VISTA Knowledge Hub</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3 font-sans">Empowering careers through technical insights. Read recent articles written by our instructors on coding, graphic design, branding, and digital transformation.</p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blogs list grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <p className="text-sm font-bold">No articles published in this category yet</p>
            <p className="text-xs text-slate-500 mt-1">Please explore our other categories or check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                id={`blog-card-${blog.id}`}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-video overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-300" />
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider block">
                      {blog.category}
                    </span>
                    <h3
                      onClick={() => setSelectedBlog(blog)}
                      className="text-base font-bold text-slate-950 tracking-tight leading-snug cursor-pointer hover:text-blue-600 group-hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" />{blog.author}</span>
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-bold tracking-wider uppercase text-[9px] cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
