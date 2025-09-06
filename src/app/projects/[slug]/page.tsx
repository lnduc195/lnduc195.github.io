import { getProjectsData } from '@/lib/data';
import { ProjectContent, ProjectData } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getProject(slug: string): Promise<ProjectData | null> {
  const projects = await getProjectsData();
  return projects.find(p => p.id === slug) || null;
}

export async function generateStaticParams() {
  const projects = await getProjectsData();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

function ContentSection({ title, content }: { title: string; content: ProjectContent[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {content.map((item, index) => (
          <div key={index}>
            {item.type === 'text' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(item.text || '') }} />
              </div>
            )}
            {item.type === 'image' && (
              <div className="my-8">
                <img
                  src={item.url}
                  alt={item.caption || ''}
                  className="w-full rounded-lg shadow-md"
                />
                {item.caption && (
                  <p className="text-sm text-gray-500 mt-2 text-center italic">
                    {item.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/projects" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        ← Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-500">{project.date}</span>
          {project.highlight && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h1>
        
        <p className="text-xl text-gray-600 mb-8">{project.description}</p>
        
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <img
            src={project.main_image.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {project.main_image.caption && (
          <p className="text-sm text-gray-500 mb-8 text-center italic">
            {project.main_image.caption}
          </p>
        )}
      </div>

      {/* Author & Technologies */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 p-6 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Author(s)</h3>
          <p className="text-gray-600">{project.author.join(', ')}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies && project.technologies.map((tech) => (
              <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {project.problem_statement && (
        <ContentSection title="Problem Statement" content={project.problem_statement} />
      )}
      
      {project.my_role && (
        <ContentSection title="My Role" content={project.my_role} />
      )}
      
      {project.technical_solution && (
        <ContentSection title="Technical Solution" content={project.technical_solution} />
      )}
      
      {project.measurement_improvement && (
        <ContentSection title="Measurement & Improvement" content={project.measurement_improvement} />
      )}
      
      {project.implementation_integration && (
        <ContentSection title="Implementation & Integration" content={project.implementation_integration} />
      )}
      
      {project.real_world_impact && (
        <ContentSection title="Real World Impact" content={project.real_world_impact} />
      )}
      
      {project.company_alignment && (
        <ContentSection title="Company Alignment" content={project.company_alignment} />
      )}

      {/* Topics */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {project.topics && project.topics.map((topic) => (
            <span key={topic} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}