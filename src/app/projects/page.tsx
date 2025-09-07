import { getProjectsData } from '@/lib/data';
import Link from 'next/link';
import { ProjectData } from '@/types';

function processImageUrl(url: string): string {
  // Convert relative paths starting with "public/" to web-accessible paths
  if (url.startsWith('public/')) {
    return '/' + url.substring(7); // Remove "public/" and add leading "/"
  }
  // Return absolute URLs and already processed relative paths as-is
  return url;
}

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={processImageUrl(project.main_image.url)}
          alt={project.title}
          className="w-full h-full object-contain"
        />
        {project.highlight && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{project.date}</span>
          <div className="flex flex-wrap gap-1">
            {project.topics && project.topics.slice(0, 2).map((topic) => (
              <span key={topic} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        <Link 
          href={`/projects/${project.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjectsData();
  const featuredProjects = projects.filter(p => p.highlight);
  const otherProjects = projects.filter(p => !p.highlight);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore my portfolio of AI and machine learning projects, from computer vision 
          to natural language processing and beyond.
        </p>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">All Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No projects found.</p>
        </div>
      )}
    </div>
  );
}