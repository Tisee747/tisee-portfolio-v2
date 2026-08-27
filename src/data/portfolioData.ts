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
    description: 'Transitioned into technical research at a Big Data & AI institute. Performed web scraping and data crawling using advanced regular expressions (RegEx) and automation scripts. Supported deployment, data analysis, and internal productivity tool developments.',
    technologies: ['Python', 'RegEx', 'Web Scraping', 'Automation Tools', 'Data Processing'],
    image: '/images/journey/indicator.jpg',
    imageCaption: 'PT. Indonesia Indicator Data Sensor Team, 2022'
  },
  {
    id: 'university-medusa',
    stage: 'University',
    title: 'Medusa Tech Intern',
    company: 'Medusa Technology',
    period: 'Jun 2026 - Aug 2026',
    subTitle: 'Professional Internships',
    description: 'Completed a Programming Internship at Medusa Tech (Jun - Aug 2026), building intelligent Llama-3/RAG NPC chatbots, deploying REST APIs on AWS EC2, and programming virtual world systems via LSL.',
    technologies: ['Node.js', 'Go', 'FastAPI', 'AWS EC2', 'Llama 3', 'LangChain', 'ChromaDB', 'Linden Scripting Language (LSL)'],
    image: '/images/journey/medusa.jpg',
    imageCaption: 'Pluit Landmark Medusa Technology, 2026'
  }
];

export const projectsData: Project[] = [
  // Web projects with active websites (featured on home page)
  {
    id: 'posyandu-pintar',
    title: 'Posyandu Pintar',
    description: 'An AI-assisted health monitoring web application tailored for toddlers and maternal health. Built with Next.js and TypeScript, integrating intelligent analytics to track developmental metrics and automate toddler growth assessments.',
    tags: ['Fullstack', 'AI'],
    technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    demoUrl: 'https://posyandu-web-app.vercel.app',
    repoUrl: 'https://github.com/Tisee747/Posyandu_Pintar',
    projectLayout: 'web',
    images: ['/images/projects/posyandu_dashboard.png'],
    version: 'v1.4.0',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[SYSTEM] Next.js SSR pipeline online',
      '[API] Growth curve analyzer loaded',
      '[AI] RAG model sync: COMPLETED'
    ]
  },
  {
    id: 'nexevent',
    title: 'NexEvent',
    description: 'A robust campus event registration and management platform featuring an automated queue waiting list system. Powered by a Laravel backend REST API and a cross-platform mobile app built with Flutter.',
    tags: ['Fullstack'],
    technologies: ['Laravel', 'Flutter', 'PHP', 'Dart'],
    projectLayout: 'mobile',
    images: [
      '/images/projects/nextevent_web.png',
      '/images/projects/nexevent_mobile_dashboard.jpg',
      '/images/projects/nexevent_mobile_login.jpg',
      '/images/projects/nexevent_mobile_tiket.jpg'
    ],
    version: 'v2.1.2',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[DB] MariaDB queue pool created',
      '[WS] Push notification channel open',
      '[SYSTEM] API Gateway latency: 14ms'
    ]
  },
  {
    id: 'telyutalks',
    title: 'TelyuTalks',
    description: 'An academic Q&A platform tailored for university students and lecturers to exchange course knowledge. Developed as a Java-based Progressive Web App (PWA) to ensure seamless mobile-desktop accessibility.',
    tags: ['Fullstack'],
    technologies: ['Java', 'Spring Boot', 'PWA'],
    repoUrl: 'https://github.com/Tisee747/TelyuTalks',
    projectLayout: 'web',
    imagePosition: 'left',
    images: [
      '/images/projects/telyutalk_web.png'
    ],
    version: 'v1.1.0',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[JVM] Spring Boot thread pool running',
      '[PWA] Service worker caching enabled',
      '[API] Discussion channels online'
    ]
  },
  {
    id: 'medusa-npc',
    title: 'Intelligent AI NPC Chatbot',
    description: 'Developed during Medusa Tech internship. Built an advanced interactive NPC chatbot using Llama 3, LangChain, and ChromaDB vector store. Features player-specific memory and Retrieval-Augmented Generation (RAG).',
    tags: ['AI', 'Backend'],
    technologies: ['Python', 'Llama 3', 'LangChain', 'ChromaDB'],
    projectLayout: 'none',
    version: 'v1.2.0',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[AI] RAG database query verified',
      '[LANG] ChromaDB vector dimensions: 1536',
      '[LLM] Context window: 8192 tokens'
    ]
  },
  // Other projects (available on projects page)
  {
    id: 'mydormitory',
    title: 'MyDormitory',
    description: 'A dormitory attendance tracking and security check-in system featuring instant QR scan verifications. Built with a Laravel administrative panel and a companion mobile app developed in Flutter.',
    tags: ['Fullstack'],
    technologies: ['Laravel', 'Flutter', 'PHP', 'Dart'],
    repoUrl: 'https://github.com/Tisee747/mydormitory-backend',
    projectLayout: 'hybrid',
    images: [
      '/images/projects/mydormitory_loginweb.png'
    ],
    version: 'v1.0.8',
    status: 'Beta',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[SEC] AES-256 QR encryptor: READY',
      '[AUTH] JWT session worker spawned',
      '[SYSTEM] Dormitory DB synchronized'
    ]
  },
  {
    id: 'gpt-ner',
    title: 'GPT-NER Implementation',
    description: 'A specialized Named Entity Recognition (NER) pipeline built with Streamlit. Uses Llama 3 via Groq API and customized RegEx filters to parse, identify, and categorize entities from messy text files.',
    tags: ['AI'],
    technologies: ['Python', 'Streamlit', 'Llama 3'],
    demoUrl: 'https://gpt-ner.streamlit.app/',
    repoUrl: 'https://github.com/Tisee747/GPT-NER-Implementation',
    projectLayout: 'web',
    images: ['/images/projects/gpt-ner.png'],
    version: 'v0.9.4',
    status: 'Beta',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[AI] Groq API client initialized',
      '[LLM] Loading weights: Llama-3-8B',
      '[PARSER] RegEx rules parsed: 84'
    ]
  },
  {
    id: 'microplast',
    title: 'MicroPlast CV Scanner',
    description: 'A computer vision application developed using Python and OpenCV to detect, count, and classify microplastic particles under laboratory imaging, helping automate ocean pollution research.',
    tags: ['AI'],
    technologies: ['Python', 'OpenCV'],
    demoUrl: 'https://microplast.streamlit.app/',
    projectLayout: 'web',
    images: ['/images/projects/microplast.png'],
    version: 'v1.0.2',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[CV] OpenCV backend loaded: v4.8',
      '[MODEL] YOLOv8 plastic weights loaded',
      '[SYSTEM] Inference latency: 42ms'
    ]
  },
  {
    id: 'house-pricing',
    title: 'House Pricing Predictor',
    description: 'A predictive machine learning regression model built using CatBoost in Python, predicting real estate prices based on spatial and structural parameters. Bundled with a clean Streamlit interface.',
    tags: ['AI'],
    technologies: ['Python', 'Streamlit', 'Machine Learning'],
    repoUrl: 'https://github.com/Tisee747/House-Pricing',
    projectLayout: 'web',
    images: ['/images/projects/house_pricing.png'],
    version: 'v0.8.2',
    status: 'Archived',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[ML] CatBoost regression initialized',
      '[DATA] Feature scaling matrix loaded',
      '[UI] Streamlit interface active'
    ]
  },
  {
    id: 'medusa-racegame-lsl',
    title: 'Metaverse Racing & Leaderboards',
    description: 'Programmed interactive multiplayer game mechanics in Linden Scripting Language (LSL) for Medusa Tech virtual spaces, implementing low-latency synchronization, dynamic 3D leaderboards, and client-side anti-cheat features.',
    tags: ['Backend'],
    technologies: ['Linden Scripting Language (LSL)', 'Virtual World'],
    projectLayout: 'none',
    version: 'v1.5.0',
    status: 'Live',
    stars: 0,
    forks: 0,
    mockLogs: [
      '[LSL] In-world listeners active: 3',
      '[SEC] Anti-cheat speed check: PASS',
      '[HUD] Leaderboard 3D display updated'
    ]
  }
];
