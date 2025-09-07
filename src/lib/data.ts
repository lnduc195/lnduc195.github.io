import { AboutData, ProjectData, BlogData, SkillsData } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

export async function getAboutData(): Promise<AboutData> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'page_data', 'home', 'about.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getProjectsData(): Promise<ProjectData[]> {
  const projectsDir = path.join(process.cwd(), 'public', 'assets', 'page_data', 'projects');
  
  try {
    const files = await fs.readdir(projectsDir);
    const projects: ProjectData[] = [];

    for (const file of files) {
      if (file.endsWith('.json') && file !== 'sample') {
        const filePath = path.join(projectsDir, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isFile()) {
          const fileContents = await fs.readFile(filePath, 'utf8');
          const project: ProjectData = JSON.parse(fileContents);
          projects.push(project);
        }
      }
    }

    // Sort by date (newest first)
    return projects.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

export async function getBlogData(): Promise<BlogData[]> {
  const blogsDir = path.join(process.cwd(), 'public', 'assets', 'page_data', 'blogs');
  
  const blogs: BlogData[] = [];
  
  try {
    // Read regular blogs only (not anonymous blogs for publications)
    const files = await fs.readdir(blogsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(blogsDir, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const blog: BlogData = JSON.parse(fileContents);
        blogs.push(blog);
      }
    }

    return blogs.sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());
  } catch (error) {
    console.error('Error reading blogs directory:', error);
    return [];
  }
}

export async function getPublicationsData(): Promise<BlogData[]> {
  const publicationsDir = path.join(process.cwd(), 'public', 'assets', 'page_data', 'publications');
  
  const publications: BlogData[] = [];
  
  try {
    // Read publications
    const files = await fs.readdir(publicationsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(publicationsDir, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const publication: BlogData = JSON.parse(fileContents);
        publications.push(publication);
      }
    }

    return publications.sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());
  } catch (error) {
    console.error('Error reading publications directory:', error);
    return [];
  }
}

export async function getSkillsData(): Promise<SkillsData> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'page_data', 'skills', 'skills.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return {};
  }
}