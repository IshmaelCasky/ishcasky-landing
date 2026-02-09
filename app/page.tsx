'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import VoiceChat to avoid SSR issues with LiveKit
const VoiceChat = dynamic(() => import('./components/VoiceChat'), { ssr: false });
const FuzzyText = dynamic(() => import('./components/FuzzyText'), { ssr: false });
const ThemeToggle = dynamic(() => import('./components/ThemeToggle').then(mod => mod.ThemeToggle), { ssr: false });
const ProjectSidebar = dynamic(() => import('./components/ProjectSidebar'), { ssr: false });


// Project Data
const projects = [
  {
    id: 't1pmt',
    title: 'T1PMT',
    category: 'System',
    image: '/images/t1pmt.png',
    description: 'A project management system designed to streamline task tracking, team collaboration, and workflow organization.',
    tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
    longDescription: 'T1PMT is a comprehensive project management tool built to enhance team productivity. It features intuitive task boards, real-time collaboration tools, and automated workflow tracking to help teams stay organized and efficient.'
  },
  {
    id: 'neo',
    title: 'Neo Corporation Philippines',
    category: 'Website',
    image: '/images/neo.png',
    description: 'Corporate landing page for a diversified company with interests in Customs Brokerage, Food Manufacturing, and General Merchandise.',
    tags: ['Next.js'],
    longDescription: 'A professional corporate website developed for Neo Corporation Philippines. The site showcases their diverse business portfolio, including Customs Brokerage, Food Manufacturing, and General Merchandise, with a clean and modern design.'
  },
  {
    id: 'lhqm',
    title: 'LHQM',
    category: 'System',
    image: '/images/lhqm.png',
    description: 'Barangay healthcare management system for patient records and health monitoring.',
    tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
    longDescription: 'LHQM is a specialized healthcare management system tailored for barangay-level health centers. It digitizes patient records, streamlines health monitoring, and optimizes administrative workflows to improve community health services.'
  },
  {
    id: 'sti',
    title: 'STI Navigation',
    category: 'System',
    image: '/images/stinavigation.png',
    description: 'Smart campus navigation system for STI College Tagum.',
    tags: ['Next.js'],
    longDescription: 'An interactive campus navigation system designed for STI College Tagum. It helps students, faculty, and visitors easily locate rooms, offices, and facilities through a user-friendly digital interface.'
  },
  {
    id: 'metr',
    title: 'METR',
    category: 'E-commerce',
    image: '/images/metr.png',
    description: 'Full-featured e-commerce platform supporting product management and transactions.',
    tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
    longDescription: 'METR is a robust e-commerce solution that handles the complete online retail lifecycle. From product inventory management to secure customer transactions and order fulfillment, it provides a seamless shopping experience.'
  },
  {
    id: 'gyretec',
    title: 'Gyretec ERP',
    category: 'System',
    image: '/images/gyretec.png',
    description: 'ERP system with integrated e-commerce for a plastic molding company.',
    tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
    longDescription: 'A custom Enterprise Resource Planning (ERP) system developed for Gyretec. It unifies business operations, inventory management, and online sales into a single platform, specifically tailored for the plastic molding industry.'
  },
  {
    id: 'payroll',
    title: 'TechnoSpark Hotel Payroll',
    category: 'System',
    image: '/images/technosparkpayroll.png',
    description: 'Smart payroll automation system for TechnoSpark Hotel.',
    tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
    longDescription: 'An automated payroll system designed for the hospitality industry. It simplifies salary computations, maintains employee records, and generates accurate payroll reports, reducing manual errors and administrative time.'
  },
  {
    id: 'trade',
    title: 'The Calculated Trade',
    category: 'Finance',
    image: '/images/thecalculatedtrade.png',
    description: 'Algorithmic trading platform landing page and dashboard.',
    tags: ['Finance', 'Real-time Data']
  },
];

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
  'PostgreSQL', 'Tailwind CSS', 'Git', 'Docker', 'Laravel', 'Inertia.js', 'MySQL'
];





// Info Modal Data
const infoModals = {
  skills: {
    title: 'Skills & Technologies',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Frontend</h4>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'].map(s => (
              <span key={s} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm rounded-full">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Backend</h4>
          <div className="flex flex-wrap gap-2">
            {['Node.js', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Laravel', "MySQL"].map(s => (
              <span key={s} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm rounded-full">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Other</h4>
          <div className="flex flex-wrap gap-2">
            {['Git', 'Systems Analysis', 'UI/UX Design', 'API Integration'].map(s => (
              <span key={s} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>
    )
  },
  experience: {
    title: 'Work Experience',
    content: (
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {[
          { company: 'Freelancing', role: 'Web & Mobile Developer', period: '2022 – Present' },
        ].map((exp, i) => (
          <div key={i} className={`border-l-2 ${i === 0 ? 'border-black' : 'border-zinc-200'} pl-4 py-1`}>
            <p className="font-medium text-sm">{exp.company}</p>
            <p className="text-zinc-500 text-xs">{exp.role}</p>
            <p className="text-zinc-400 text-xs">{exp.period}</p>
          </div>
        ))}
      </div>
    )
  },
  contact: {
    title: 'Get In Touch',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-600 dark:text-zinc-400">Interested in working together? Feel free to reach out!</p>
        <div className="space-y-3">
          <a href="mailto:hello@ishmael.dev" className="flex items-center gap-3 p-3 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
            <span className="text-xl">✉️</span>
            <span>hello@ishmael.dev</span>
          </a>
          <a href="https://github.com" target="_blank" className="flex items-center gap-3 p-3 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
            <span className="text-xl">💻</span>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" className="flex items-center gap-3 p-3 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
            <span className="text-xl">💼</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    )
  }
};

// Info Modal Component
function InfoModal({ type, onClose }: { type: keyof typeof infoModals | null; onClose: () => void }) {
  if (!type || !infoModals[type]) return null;
  
  const modal = infoModals[type];
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-zinc-950 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl dark:shadow-zinc-900/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">{modal.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white rounded-full transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 text-black dark:text-white">
          {modal.content}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [infoModalType, setInfoModalType] = useState<keyof typeof infoModals | null>(null);
  
  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  }, [selectedProject]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  }, [selectedProject]);
  
  // Handle voice assistant actions
  const handleVoiceAction = useCallback((actionType: string, actionParam: string) => {
    console.log('Voice action received:', actionType, actionParam);
    
    switch (actionType.toLowerCase()) {
      case 'show_project':
        // Find project by id or partial name match
        const project = projects.find(p => 
          p.id.toLowerCase().includes(actionParam.toLowerCase()) ||
          p.title.toLowerCase().includes(actionParam.toLowerCase())
        );
        if (project) {
          // Scroll to work section first
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          // Open modal after a short delay
          setTimeout(() => setSelectedProject(project), 500);
        }
        break;
        
      case 'scroll_to':
        const element = document.getElementById(actionParam.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        break;
        
      case 'show_modal':
        const modalType = actionParam.toLowerCase() as keyof typeof infoModals;
        if (infoModals[modalType]) {
          setInfoModalType(modalType);
        }
        break;
        
      default:
        console.log('Unknown action type:', actionType);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
             }}>
        </div>
        
        {/* Gradient Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-zinc-300/30 blur-[100px] animate-float" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-zinc-400/20 blur-[100px] animate-float decoration-clone" style={{ animationDelay: '2s' }} />
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating Pill Navigation */}
      <nav className="fixed px-2 bottom-8 left-1/2 -translate-x-1/2 right-auto md:left-auto md:translate-x-0 md:right-8 z-50 flex items-center gap-1 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-lg shadow-zinc-200/20 dark:shadow-zinc-900/20 ring-1 ring-black/5 dark:ring-white/5">
        <Link 
          href="#work" 
          className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          Work
        </Link>
        <Link 
          href="#about" 
          className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          About
        </Link>
        <Link 
          href="#contact" 
          className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          Get in Touch
        </Link>
        
        {/* Separator */}
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />
        
        {/* Voice Assistant Orb */}
        <VoiceChat onAction={handleVoiceAction} />
      </nav>


      <main className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20">
        
        {/* Header / Intro */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black dark:text-white">
              Ishmael Cascabel
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-6">
              Full-stack developer crafting elegant digital experiences. 
              I focus on clean code, thoughtful design, and user experience.
            </p>

            {/* Skills Pills */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* AI Assistant Hint */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-100 dark:border-zinc-800">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Try my AI assistant — Click the mic in the nav</span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
             <div className="relative w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 grayscale hover:grayscale-0 transition-all duration-500">
               <Image 
                 src="/images/profile.jpg" 
                 alt="Ishmael Cascabel" 
                 fill
                 className="object-cover"
                 priority
               />
             </div>
          </div>
        </section>

        {/* About & Skills (Moved up) */}
        <section id="about" className="mb-32 border-t border-zinc-100 dark:border-zinc-900 pt-16">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-black dark:text-white">ABOUT</h2>
          
          <div className="prose prose-zinc dark:prose-invert prose-lg hover:prose-a:text-black dark:hover:prose-a:text-white mb-12 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              Full-stack developer with 3+ years building modern web applications. 
              I focus on clean code, thoughtful design, and user experience. 
              Expertise in JavaScript, React, Next.js, and Node.js.
            </p>
            <p className="mt-4">
              Currently exploring AI integration, edge computing, and web standards. 
              Always learning, always building.
            </p>
          </div>


        </section>

        {/* Projects List (Moved down) */}
        <section id="work" className="mb-32 border-t border-zinc-100 dark:border-zinc-900 pt-16">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-12 text-black dark:text-white">PROJECTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image - Top */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500" />
                </div>

                {/* Content - Bottom */}
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:underline decoration-1 underline-offset-4 decoration-zinc-400">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-[10px] font-medium uppercase tracking-wider rounded-md border border-transparent dark:border-zinc-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Button */}
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:gap-2 transition-all">
                    View Case Study <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* Contact */}
        <section id="contact" className="mb-32 border-t border-zinc-100 dark:border-zinc-900 pt-24 pb-12">
          <div className="max-w-xl mx-auto text-center">
            {/* Contact Pill */}
            
            
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-black dark:text-white">Get in Touch</h2>
            
            <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12">
              Interested in working together or have a question? Feel free to reach out directly at{' '}
              <a href="mailto:hello@ishmael.dev" className="text-black dark:text-white font-medium transition-colors hover:underline decoration-2 underline-offset-4 decoration-zinc-400">
                hello@ishmael.dev
              </a>
              .
            </p>
            
            <div className="flex items-center justify-center gap-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span className="font-medium">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="pb-8 text-center text-zinc-400 text-sm">
          © {new Date().getFullYear()} Ishmael Cascabel
        </footer>
      </main>
      
      <ProjectSidebar 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
      
      {/* Info Modal */}
      <InfoModal 
        type={infoModalType} 
        onClose={() => setInfoModalType(null)} 
      />
    </div>
  );
}

