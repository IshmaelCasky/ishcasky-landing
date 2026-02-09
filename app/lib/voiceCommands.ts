// Voice command utilities for webpage interactions

export type VoiceCommand = {
  patterns: string[];
  action: () => void;
  description: string;
};

// Scroll to a specific section
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Highlight an element temporarily
export function highlightElement(elementId: string, duration = 2000): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.transition = 'box-shadow 0.3s ease';
    element.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.5)';
    setTimeout(() => {
      element.style.boxShadow = '';
    }, duration);
  }
}

// Developer information for AI context
export const developerContext = {
  name: 'Ishmael Cascabel',
  role: 'Full-Stack Developer',
  location: 'Philippines',
  experience: '5+ years',
  specialties: [
    'Web Application Development',
    'API Design & Development',
    'Database Architecture',
    'UI/UX Implementation',
  ],
  techStack: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Laravel', 'Python'],
    database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel'],
  },
  projects: [
    {
      id: 'gyretec',
      name: 'Gyretec',
      description: 'Modern tech platform with sleek UI/UX design',
      tech: ['React', 'Next.js', 'TypeScript'],
    },
    {
      id: 'lhqm',
      name: 'LHQM',
      description: 'Quality management system with tracking and reporting',
      tech: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'metr',
      name: 'Metr',
      description: 'Analytics dashboard with real-time metrics',
      tech: ['Next.js', 'Chart.js', 'Tailwind'],
    },
    {
      id: 'neo',
      name: 'Neo',
      description: 'Next-generation platform with modern architecture',
      tech: ['React', 'GraphQL', 'AWS'],
    },
    {
      id: 'payroll',
      name: 'Payroll System',
      description: 'Automated payroll management solution',
      tech: ['Laravel', 'Vue.js', 'MySQL'],
    },
    {
      id: 'sti',
      name: 'STI',
      description: 'Educational platform with learning management features',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    },
    {
      id: 't1pmt',
      name: 'T1PMT',
      description: 'Project management tool for team collaboration',
      tech: ['React', 'Redux', 'Node.js'],
    },
    {
      id: 'thecalculatedtrade',
      name: 'The Calculated Trade',
      description: 'Trading analytics platform with market insights',
      tech: ['Next.js', 'Python', 'TradingView'],
    },
  ],
};

// Build system prompt for the AI assistant
export function buildSystemPrompt(): string {
  return `You are a helpful voice assistant on Ishmael Cascabel's portfolio website. 
Your role is to answer questions about Ishmael, his work, skills, and projects.
Be friendly, concise, and informative. Keep responses brief (2-3 sentences max) since they will be spoken aloud.

Here's information about Ishmael:
- Name: ${developerContext.name}
- Role: ${developerContext.role}
- Experience: ${developerContext.experience}
- Specialties: ${developerContext.specialties.join(', ')}
- Frontend tech: ${developerContext.techStack.frontend.join(', ')}
- Backend tech: ${developerContext.techStack.backend.join(', ')}
- Databases: ${developerContext.techStack.database.join(', ')}
- Projects: ${developerContext.projects.map(p => `${p.name} (${p.description})`).join('; ')}

When asked about projects, you can suggest the user look at specific ones.
When asked about contact, mention the social links in the navigation.
Be enthusiastic but professional.`;
}

// Parse user intent from transcript
export function parseIntent(transcript: string): {
  intent: 'about' | 'projects' | 'skills' | 'contact' | 'general';
  entities: string[];
} {
  const lower = transcript.toLowerCase();
  
  // Project-related queries
  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) {
    const projectNames = developerContext.projects
      .filter(p => lower.includes(p.name.toLowerCase()) || lower.includes(p.id))
      .map(p => p.name);
    return { intent: 'projects', entities: projectNames };
  }
  
  // Skills/tech-related queries
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || 
      lower.includes('know') || lower.includes('capable') || lower.includes('experience')) {
    return { intent: 'skills', entities: [] };
  }
  
  // Contact-related queries
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('hire') || 
      lower.includes('email') || lower.includes('message')) {
    return { intent: 'contact', entities: [] };
  }
  
  // About/bio-related queries
  if (lower.includes('who') || lower.includes('about') || lower.includes('tell me') || 
      lower.includes('ishmael') || lower.includes('introduce')) {
    return { intent: 'about', entities: [] };
  }
  
  return { intent: 'general', entities: [] };
}
