// Types for our portfolio website

export interface SkillType {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
}

export interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  date: string;
  author: string;
  images: string[];
  tags: string[];
}

export interface SocialLinkType {
  name: string;
  url: string;
  icon: React.ComponentType;
}