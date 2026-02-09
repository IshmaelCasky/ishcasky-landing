'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  longDescription?: string;
}

interface ProjectSidebarProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectSidebar({ project, onClose, onNext, onPrev }: ProjectSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      // Small delay to allow render before animating in
      requestAnimationFrame(() => setIsAnimating(true));
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 500); // Match transition duration
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!isVisible && !project) return null;

  // Use the project passed in, or the last one if we're animating out (to avoid content disappearing instantly)
  const displayProject = project || null; 

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${
        project ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`relative w-full md:w-[60%] lg:w-1/2 h-full bg-white dark:bg-zinc-950 shadow-2xl overflow-y-auto transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {displayProject && (
          <div className="min-h-full flex flex-col">
            {/* Header / Image Area */}
            <div className="relative h-[50vh] w-full bg-zinc-900 flex-shrink-0 group">
               {/* Image */}
               <Image
                 src={displayProject.image}
                 alt={displayProject.title}
                 fill
                 className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                 priority
               />
               
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

               {/* Top Navigation Bar */}
               <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
                 {/* Nav Arrows */}
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onPrev(); }}
                     className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
                   >
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); onNext(); }}
                     className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
                   >
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                   </button>
                 </div>

                 {/* Center/Top Label - Optional based on design, maybe category */}
                 <span className="text-white/80 font-medium tracking-wide text-sm hidden md:block">
                   {displayProject.category}
                 </span>

                 {/* Close Button pill */}
                 <button 
                   onClick={onClose}
                   className="h-10 px-4 rounded-full bg-white dark:bg-zinc-800 text-black dark:text-white text-sm font-medium flex items-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-lg"
                 >
                   <span>Close</span>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>
               </div>

               {/* Title Overlay - Bottom Left */}
               <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
                 <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 leading-none">
                   {displayProject.title}
                 </h2>
                 {/* Optional: URL Button here if needed later */}
               </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 flex-grow bg-white dark:bg-zinc-950">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-2 mb-8">
                    {displayProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider rounded-md border border-transparent dark:border-zinc-800">
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="prose prose-lg prose-zinc dark:prose-invert">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4">About the Project</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xl font-light">
                    {displayProject.longDescription || displayProject.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
