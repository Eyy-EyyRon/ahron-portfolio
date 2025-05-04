import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { BlogPostType } from '../types';

interface BlogModalProps {
  blog: BlogPostType;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark bg-opacity-90">
      <div 
        ref={modalRef}
        className="bg-navy-light rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scaleIn"
      >
        <div className="relative">
          <div className="flex items-center justify-between p-6 border-b border-slate-dark">
            <h3 className="text-2xl font-heading font-semibold text-white pr-8">{blog.title}</h3>
            <button
              onClick={onClose}
              className="text-slate hover:text-gold transition-colors absolute right-4 top-4"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            <div className="flex items-center mb-6 text-sm text-slate">
              <span>{blog.date}</span>
              <span className="mx-2">•</span>
              <span>By {blog.author}</span>
            </div>
            
            <div className="mb-8 flex gap-2 overflow-x-auto py-2">
              {blog.images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${blog.title} - image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="prose prose-invert prose-gold max-w-none">
              <p className="text-slate-light mb-4 leading-relaxed whitespace-pre-line">{blog.content}</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs bg-navy text-gold px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;