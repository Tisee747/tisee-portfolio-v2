export type ProjectTag = 'Backend' | 'AI' | 'Fullstack';

export type ProjectLayout = 'web' | 'mobile' | 'hybrid' | 'none';
export type ProjectCategory = 'Web' | 'Mobile' | 'Fullstack' | 'AI/ML' | 'Backend';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  categories: ProjectCategory[];
  category?: ProjectCategory;
  technologies?: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  images?: string[];
  imagePosition?: string;
  projectLayout?: ProjectLayout;
  version?: string;
  status?: 'Live' | 'Beta' | 'Development' | 'Archived';
  stars?: number;
  forks?: number;
  mockLogs?: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  image?: string;
  imageCaption?: string;
}

export interface ContactInfo {
  type: string;
  value: string;
  url: string;
  icon: string;
}
