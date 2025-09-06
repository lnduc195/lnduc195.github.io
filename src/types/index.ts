export interface Education {
  degree: string;
  school: string;
  year: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  researchgate: string;
  googleScholar: string;
  orcid: string;
}

export interface CVFile {
  url: string;
  filename: string;
}

export interface AboutData {
  name: string;
  "main role": string;
  roles: string[];
  bio: string;
  image: string;
  location: string;
  email: string;
  social: Social;
  cv: CVFile;
  resume: CVFile;
  education: Education[];
  experience: Experience[];
  slogan: string;
  slogan_footer: string;
}

export interface ProjectContent {
  type: "text" | "image";
  text?: string;
  url?: string;
  caption?: string;
}

export interface ProjectData {
  id: string;
  author: string[];
  highlight: boolean;
  date: string;
  title: string;
  description: string;
  main_image: {
    url: string;
    caption: string;
  };
  problem_statement: ProjectContent[];
  my_role: ProjectContent[];
  technical_solution: ProjectContent[];
  measurement_improvement: ProjectContent[];
  implementation_integration: ProjectContent[];
  real_world_impact: ProjectContent[];
  company_alignment: ProjectContent[];
  technologies: string[];
  topics: string[];
}

export interface BlogData {
  id: string;
  title: string;
  description?: string;
  author: string;
  date: string;
  content: ProjectContent[];
  topics: string[];
  technologies: string[];
  readingTime: string;
  videoUrl?: string;
  githubUrl?: string;
  main_image: {
    url: string;
    caption: string;
  };
  notableObservations?: any;
  unexpectedInsights?: any;
  images?: Array<{
    url: string;
    caption: string;
  }>;
  related?: Array<{
    title: string;
    url: string;
  }>;
  references?: Record<string, string>;
}

export interface SkillCategory {
  [key: string]: string[] | SkillCategory;
}

export interface SkillsData {
  [category: string]: SkillCategory;
}