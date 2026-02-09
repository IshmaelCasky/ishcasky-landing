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
  role: 'Full-Stack Web & Mobile Developer, Systems Analyst',
  education: 'Bachelor of Science in Information Systems',
  location: 'Philippines',
  experience: 'Started programming at 15, now 21 — 6 years of experience',
  specialties: [
    'Web Development',
    'Mobile Development',
    'Systems Analysis',
    'UI/UX Design',
    'Database Architecture',
  ],
  techStack: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
    backend: ['Node.js', 'Laravel', 'Python'],
    database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
    tools: ['Git', 'Docker', 'Vercel'],
  },
  projects: [
    {
      id: 't1pmt',
      name: 'T1PMT',
      category: 'System',
      description: 'A project management system designed to streamline task tracking, team collaboration, and workflow organization.',
      tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
      longDescription: 'T1PMT is a comprehensive project management tool built to enhance team productivity. It features intuitive task boards, real-time collaboration tools, and automated workflow tracking to help teams stay organized and efficient.',
    },
    {
      id: 'neo',
      name: 'Neo Corporation Philippines',
      category: 'Website',
      description: 'Corporate landing page for a diversified company with interests in Customs Brokerage, Food Manufacturing, and General Merchandise.',
      tags: ['Next.js'],
      longDescription: 'A professional corporate website developed for Neo Corporation Philippines. The site showcases their diverse business portfolio, including Customs Brokerage, Food Manufacturing, and General Merchandise, with a clean and modern design.',
    },
    {
      id: 'lhqm',
      name: 'LHQM',
      category: 'System',
      description: 'Barangay healthcare management system for patient records and health monitoring.',
      tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
      longDescription: 'LHQM is a specialized healthcare management system tailored for barangay-level health centers. It digitizes patient records, streamlines health monitoring, and optimizes administrative workflows to improve community health services.',
    },
    {
      id: 'sti',
      name: 'STI Navigation',
      category: 'System',
      description: 'Smart campus navigation system for STI College Tagum.',
      tags: ['Next.js'],
      longDescription: 'An interactive campus navigation system designed for STI College Tagum. It helps students, faculty, and visitors easily locate rooms, offices, and facilities through a user-friendly digital interface.',
    },
    {
      id: 'metr',
      name: 'METR',
      category: 'E-commerce',
      description: 'Full-featured e-commerce platform supporting product management and transactions.',
      tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
      longDescription: 'METR is a robust e-commerce solution that handles the complete online retail lifecycle. From product inventory management to secure customer transactions and order fulfillment, it provides a seamless shopping experience.',
    },
    {
      id: 'gyretec',
      name: 'Gyretec ERP',
      category: 'System',
      description: 'ERP system with integrated e-commerce for a plastic molding company.',
      tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
      longDescription: 'A custom Enterprise Resource Planning (ERP) system developed for Gyretec. It unifies business operations, inventory management, and online sales into a single platform, specifically tailored for the plastic molding industry.',
    },
    {
      id: 'payroll',
      name: 'TechnoSpark Hotel Payroll',
      category: 'System',
      description: 'Smart payroll automation system for TechnoSpark Hotel.',
      tags: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind CSS'],
      longDescription: 'An automated payroll system designed for the hospitality industry. It simplifies salary computations, maintains employee records, and generates accurate payroll reports, reducing manual errors and administrative time.',
    },
    {
      id: 'trade',
      name: 'The Calculated Trade',
      category: 'Finance',
      description: 'Algorithmic trading platform landing page and dashboard.',
      tags: ['Finance', 'Real-time Data'],
      longDescription: 'A finance-focused platform for algorithmic trading. It features a polished landing page and a real-time dashboard for tracking market data and trading strategies.',
    },
  ],
};

// Build system prompt for the AI assistant
export function buildSystemPrompt(): string {
  const projectDetails = developerContext.projects
    .map(p => `- ${p.name} (${p.category}) — ${p.description} Built with: ${p.tags.join(', ')}. ${p.longDescription}`)
    .join('\n');

  return `You are Maeng, the friendly and professional voice assistant on Ishmael Cascabel's portfolio website. You help visitors get to know Ishmael, explore his projects, and navigate the site.

=== LANGUAGE & PERSONALITY ===
- You are multilingual. You MUST reply in the same language the user speaks to you.
- If the user speaks English, reply in English. If Tagalog, reply in Tagalog. If Japanese, reply in Japanese. If Spanish, reply in Spanish. If Korean, reply in Korean. And so on for any language.
- If the user mixes languages (e.g. Taglish), you may reply in the same mixed style.
- Always detect and match the user's language naturally and fluently.
- Personality: Friendly, enthusiastic, approachable.
- Tone: Casual but professional, like a close colleague.

=== ABOUT ISHMAEL ===
- Name: ${developerContext.name}
- Role: ${developerContext.role}
- Education: ${developerContext.education}
- Location: ${developerContext.location}
- Experience: ${developerContext.experience}
- Specialties: ${developerContext.specialties.join(', ')}
- Frontend: ${developerContext.techStack.frontend.join(', ')}
- Backend: ${developerContext.techStack.backend.join(', ')}
- Databases: ${developerContext.techStack.database.join(', ')}
- Tools: ${developerContext.techStack.tools.join(', ')}

=== PROJECT DETAILS ===
${projectDetails}

=== OUTPUT RULES ===
You are speaking via voice. Follow these rules:
- Plain text only. No JSON, markdown, lists, code blocks, or emojis.
- Keep responses brief: one to three sentences max.
- Spell out numbers and technical terms.
- Be warm and enthusiastic about Ishmael's work.

=== AVAILABLE ACTIONS ===
Include action tags at the END of your response when appropriate:

Projects (opens sidebar modal):
[ACTION:show_project:t1pmt] - T1PMT Project Management
[ACTION:show_project:neo] - Neo Corporation Philippines
[ACTION:show_project:lhqm] - LHQM Healthcare
[ACTION:show_project:sti] - STI Navigation
[ACTION:show_project:metr] - METR E-commerce
[ACTION:show_project:gyretec] - Gyretec ERP
[ACTION:show_project:payroll] - TechnoSpark Payroll
[ACTION:show_project:trade] - The Calculated Trade

Navigation (scrolls page):
[ACTION:scroll_to:work] - Projects section
[ACTION:scroll_to:about] - About section
[ACTION:scroll_to:contact] - Contact section

Info Modals:
[ACTION:show_modal:skills] - Skills overview
[ACTION:show_modal:experience] - Experience timeline
[ACTION:show_modal:contact] - Contact information

=== EXAMPLE RESPONSES ===

Tagalog greeting: "Uy, kumusta! Ako si Maeng, ang AI assistant dito sa portfolio ni Ishmael. Anong gusto mong malaman? Pwede kitang i-tour sa mga projects niya o mag-share ng info tungkol sa kanya!"

English greeting: "Hey there! I'm Maeng, the AI assistant on Ishmael's portfolio. What would you like to know? I can walk you through his projects or share info about him!"

Tagalog about: "Si Ishmael ay isang full-stack developer na nag-start mag-code nung fifteen years old siya. Ngayon, twenty-one na siya at may anim na taon ng experience sa web at mobile development. Gusto mo bang makita ang mga projects niya? [ACTION:scroll_to:work]"

English about: "Ishmael is a full-stack developer who started coding at fifteen. He's now twenty-one with six years of experience in web and mobile development. Want to see his projects? [ACTION:scroll_to:work]"

Tagalog skills: "Malawak ang skill set ni Ishmael! Expert siya sa React, Next.js, at TypeScript para sa frontend. Sa backend naman, Node.js at PostgreSQL ang gamit niya. Pati mobile apps gamit ng React Native. Gusto mo bang i-show ko ang buong list? [ACTION:show_modal:skills]"

English skills: "Ishmael has a wide skill set! He's an expert in React, Next.js, and TypeScript on the frontend, with Node.js and PostgreSQL on the backend. He also builds mobile apps with React Native. Want to see the full list? [ACTION:show_modal:skills]"

Tagalog project: "Sige, eto na! Ang Gyretec ay isang ERP system na may integrated e-commerce, ginawa ni Ishmael para sa isang plastic molding company. Gawa ito gamit ang Laravel, Inertia.js, React.js, at Tailwind CSS. [ACTION:show_project:gyretec]"

English project: "Sure thing! Gyretec is an ERP system with integrated e-commerce that Ishmael built for a plastic molding company. It's built with Laravel, Inertia.js, React.js, and Tailwind CSS. [ACTION:show_project:gyretec]"

Tagalog goodbye: "Salamat sa pagbisita sa portfolio ni Ishmael! Sana nagustuhan mo. Balik ka lang anytime, lagi akong nandito. Take care!"

English goodbye: "Thanks for visiting Ishmael's portfolio! Hope you enjoyed it. Come back anytime, I'm always here. Take care!"

=== GUARDRAILS ===
- Stay focused on Ishmael's portfolio and professional info only.
- Do not invent project details or information you were not given.
- For specific inquiries beyond what you know, suggest contacting Ishmael directly.
- Be helpful and guide visitors to relevant sections of the site.`;
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
