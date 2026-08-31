import { Project, TimelineItem } from '@/types';

export interface JourneyStep extends TimelineItem {
  stage: 'SMP' | 'SMK' | 'University';
  subTitle: string;
}

export const journeyData: JourneyStep[] = [
  {
    id: 'smp-lensza',
    stage: 'SMP',
    title: 'Digital Marketing Intern',
    company: 'PT. Gucob E-Service (Lensza.co.id)',
    period: 'Feb 2021 - Jan 2023',
    subTitle: 'Junior High School Era',
    description: 'Began exploring the digital industry early while completing junior high school. Managed promotional content creation, designed newsletters via Shopify, scheduled uploads, and handled customer interactions to maintain consistent brand engagement.',
    technologies: ['Shopify', 'Canva', 'Email Marketing', 'E-Commerce Operations'],
    image: '/images/journey/lensza.jpg',
    imageCaption: 'Lensza Digital Marketing Ops, 2022'
  },
  {
    id: 'smk-indicator',
    stage: 'SMK',
    title: 'IT & Data Intern',
    company: 'PT. Indonesia Indicator',
    period: 'Feb 2023 - Aug 2023',
    subTitle: 'Vocational High School Era',
    description: 'Worked on automated data collection and extraction for political, economic, and social research datasets, then prepared and validated data to support model deployment and recurring internal workflows.',
    technologies: ['Python', 'Data Collection', 'Data Processing', 'Automation'],
    image: '/images/journey/indicator.jpg',
    imageCaption: 'PT. Indonesia Indicator Data Sensor Team, 2023'
  },
  {
    id: 'university-medusa',
    stage: 'University',
    title: 'Programming Intern',
    company: 'Medusa Technology',
    period: 'Jun 2026 - Aug 2026',
    subTitle: 'Professional Internship',
    description: 'Built intelligent NPCs for OpenSim using agentic RAG, hybrid retrieval, player-specific memory, and context-aware animations. Also built FastAPI services plus racing and algorithm-learning simulations with validation and leaderboards.',
    technologies: ['FastAPI', 'Llama 3', 'LangChain', 'ChromaDB', 'Python', 'LSL/OSSL', 'OpenSim'],
    image: '/images/journey/medusa.jpg',
    imageCaption: 'Medusa Technology, 2026'
  }
];

export const projectsData: Project[] = [
  {
    id: 'medusa-npc',
    title: 'NPC AI RAG',
    description: 'Built an agentic-RAG NPC system for OpenSim with hybrid retrieval, per-avatar memory, and context-aware animations, enabling natural conversations that persist across sessions.',
    tags: ['AI', 'Backend'],
    category: 'AI/ML',
    categories: ['AI/ML', 'Backend'],
    technologies: ['FastAPI', 'Llama 3', 'LangChain', 'ChromaDB', 'Python', 'LSL/OSSL'],
    repoUrl: 'https://github.com/Tisee747/NPC-AI-RAG',
    projectLayout: 'web',
    images: ['/images/projects/medusa-npc.jpg']
  },
  {
    id: 'medusa-algorithm-simulator',
    title: 'Algorithm Learning Simulator',
    description: 'Built an interactive learning simulator that evaluates submitted code, delivers real-time feedback, visualizes solutions in OpenSim, and supports scoring and leaderboards for hands-on practice.',
    tags: ['Backend'],
    category: 'Backend',
    categories: ['Backend'],
    technologies: ['FastAPI', 'Python', 'AST Code Runner', 'LSL/OSSL', 'OpenSim'],
    projectLayout: 'web',
    images: ['/images/projects/medusa-algorithm-simulator.jpg']
  },
  {
    id: 'posyandu-pintar',
    title: 'Posyandu Information System',
    description: 'Developed a mobile-first platform for toddler records, growth monitoring, attendance, dashboards, and period-based reporting. Added AI-assisted insights to help cadres identify follow-up needs.',
    tags: ['Fullstack', 'AI'],
    category: 'Fullstack',
    categories: ['Web', 'Mobile', 'Fullstack', 'AI/ML', 'Backend'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'PostgreSQL', 'Groq AI'],
    demoUrl: 'https://posyandu-web-app.vercel.app',
    repoUrl: 'https://github.com/Tisee747/Posyandu_Pintar',
    projectLayout: 'web',
    images: ['/images/projects/posyandu_dashboard.png']
  },
  {
    id: 'medusa-supermarket',
    title: 'SuperMarket',
    description: 'Built an OpenSim product interaction scene where users can touch in-world items and inspect product names and prices as part of an interactive learning experience.',
    tags: ['Backend'],
    category: 'Backend',
    categories: ['Backend'],
    technologies: ['OpenSim', 'LSL/OSSL'],
    projectLayout: 'web',
    images: ['/images/projects/medusa-supermarket.jpg']
  },
  {
    id: 'medusa-racegame-lsl',
    title: 'Racing Simulation',
    description: 'Built an OpenSim racing simulation with race flow, validation and anti-cheat checks, scoring, and dynamic leaderboard mechanics.',
    tags: ['Backend'],
    category: 'Backend',
    categories: ['Backend'],
    repoUrl: 'https://github.com/Tisee747/Medusa-Racing-Simulation',
    technologies: ['OpenSim', 'LSL/OSSL'],
    projectLayout: 'web',
    images: ['/images/projects/medusa-racing.jpg']
  },
  {
    id: 'nexevent',
    title: 'NexEvent',
    description: 'A campus event registration and management platform with a Laravel REST API and a cross-platform Flutter mobile application.',
    tags: ['Fullstack'],
    category: 'Fullstack',
    categories: ['Web', 'Mobile', 'Fullstack', 'Backend'],
    technologies: ['Laravel', 'Flutter', 'PHP', 'Dart'],
    repoUrl: 'https://github.com/Tisee747/NexEvent',
    projectLayout: 'mobile',
    images: [
      '/images/projects/nextevent_web.png',
      '/images/projects/nexevent_mobile_dashboard.jpg',
      '/images/projects/nexevent_mobile_login.jpg',
      '/images/projects/nexevent_mobile_tiket.jpg'
    ]
  },
  {
    id: 'telyutalks',
    title: 'TelyuTalks',
    description: 'An academic Q&A platform for university students and lecturers, developed as a Java-based Progressive Web App.',
    tags: ['Fullstack'],
    category: 'Web',
    categories: ['Web', 'Fullstack', 'Backend'],
    technologies: ['Java', 'Spring Boot', 'PWA'],
    repoUrl: 'https://github.com/Tisee747/TelyuTalks',
    projectLayout: 'web',
    imagePosition: 'left',
    images: ['/images/projects/telyutalk_web.png']
  },
  {
    id: 'mydormitory',
    title: 'MyDormitory',
    description: 'A dormitory attendance and check-in system with a Laravel administrative backend and a companion Flutter mobile application.',
    tags: ['Fullstack'],
    category: 'Fullstack',
    categories: ['Web', 'Mobile', 'Fullstack', 'Backend'],
    technologies: ['Laravel', 'Flutter', 'PHP', 'Dart'],
    repoUrl: 'https://github.com/Tisee747/mydormitory-backend',
    projectLayout: 'hybrid',
    images: ['/images/projects/mydormitory_loginweb.png']
  },
  {
    id: 'gpt-ner',
    title: 'GPT-NER Implementation',
    description: 'A Named Entity Recognition workflow with a Streamlit interface, using Llama 3 through Groq and text-processing rules to identify entities from input text.',
    tags: ['AI'],
    category: 'AI/ML',
    categories: ['Web', 'AI/ML'],
    technologies: ['Python', 'Streamlit', 'Llama 3', 'Groq'],
    demoUrl: 'https://gpt-ner.streamlit.app/',
    repoUrl: 'https://github.com/Tisee747/GPT-NER-Implementation',
    projectLayout: 'web',
    images: ['/images/projects/gpt-ner.png']
  },
  {
    id: 'microplast',
    title: 'MicroPlast CV Scanner',
    description: 'A computer-vision application built with Python and OpenCV for detecting and analyzing microplastic particles from laboratory imagery.',
    tags: ['AI'],
    category: 'AI/ML',
    categories: ['Web', 'AI/ML'],
    technologies: ['Python', 'OpenCV'],
    demoUrl: 'https://microplast.streamlit.app/',
    repoUrl: 'https://github.com/Tisee747/MicroPlast-CV-Scanner',
    projectLayout: 'web',
    images: ['/images/projects/microplast.png']
  },
  {
    id: 'house-pricing',
    title: 'House Price Prediction',
    description: 'Developed a house price prediction application using CatBoost and Streamlit while contributing to applied AI initiatives at the Artificial Intelligence Laboratory.',
    tags: ['AI'],
    category: 'AI/ML',
    categories: ['Web', 'AI/ML'],
    technologies: ['Python', 'CatBoost', 'Streamlit'],
    repoUrl: 'https://github.com/Tisee747/House-Pricing',
    projectLayout: 'web',
    images: ['/images/projects/house_pricing.png']
  }
];
