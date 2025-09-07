import { getProjectsData } from '@/lib/data';
import { ProjectContent, ProjectData, HierarchicalContent } from '@/types';
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

function processImageUrl(url: string): string {
  if (url.startsWith('public/')) {
    return '/' + url.substring(7);
  }
  return url;
}

function getLevelStyles(level: string): { containerClass: string; headerClass: string } {
  // Map different level formats to consistent styling
  const levelChar = level.charAt(0).toUpperCase();
  const isRomanNumeral = level.includes('I');
  
  if (levelChar >= 'A' && levelChar <= 'Z' && !isRomanNumeral) {
    // Top level (A, B, C, etc.)
    return {
      containerClass: "mb-16 border-l-4 border-blue-500 pl-6",
      headerClass: "text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
    };
  } else if (isRomanNumeral) {
    // Second level (I, II, III, etc.)
    return {
      containerClass: "mb-12 border-l-2 border-gray-300 pl-6 ml-4",
      headerClass: "text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3"
    };
  } else {
    // Third level or deeper
    return {
      containerClass: "mb-8 pl-4 ml-8",
      headerClass: "text-xl font-medium text-gray-700 mb-4 flex items-center gap-3"
    };
  }
}

function renderTable(content: ProjectContent): JSX.Element {
  if (content.type !== 'table' || !content.headers || !content.rows) {
    return <div />;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {content.headers.map((header, index) => (
              <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {content.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0">
                  <div dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderContent(content: ProjectContent): JSX.Element {
  switch (content.type) {
    case 'text':
      return (
        <div className="prose max-w-none mb-4">
          <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(content.text || '') }} />
        </div>
      );
    case 'image':
      return (
        <div className="my-8">
          <img
            src={processImageUrl(content.url || '')}
            alt={content.caption || ''}
            className="w-full rounded-lg shadow-md"
          />
          {content.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center italic">
              {content.caption}
            </p>
          )}
        </div>
      );
    case 'table':
      return renderTable(content);
    default:
      return <div />;
  }
}

function HierarchicalContentRenderer({ item }: { item: HierarchicalContent }): JSX.Element {
  const hasLevel = item.level && item.text;
  const { containerClass, headerClass } = hasLevel ? getLevelStyles(item.level!) : { containerClass: '', headerClass: '' };

  return (
    <div className={hasLevel ? containerClass : ''}>
      {hasLevel && (
        <h3 className={headerClass}>
          <span className="text-blue-600 font-mono text-sm bg-blue-50 px-2 py-1 rounded">
            {item.level}
          </span>
          {item.text}
        </h3>
      )}
      
      <div className="space-y-6">
        {item.content?.map((contentItem, index) => {
          // Check if it's a hierarchical content item or a basic content item
          if ('level' in contentItem || ('content' in contentItem && Array.isArray(contentItem.content))) {
            return <HierarchicalContentRenderer key={index} item={contentItem as HierarchicalContent} />;
          } else {
            return <div key={index}>{renderContent(contentItem as ProjectContent)}</div>;
          }
        })}
      </div>
    </div>
  );
}

function ContentSection({ title, content }: { title: string; content: ProjectContent[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {content.map((item, index) => (
          <div key={index}>{renderContent(item)}</div>
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
            src={processImageUrl(project.main_image.url)}
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
      <div className="prose-xl max-w-none">
        {/* New hierarchical structure */}
        {project.content && project.content.length > 0 ? (
          <div className="space-y-8">
            {project.content.map((item, index) => (
              <HierarchicalContentRenderer key={index} item={item} />
            ))}
          </div>
        ) : (
          /* Fallback to legacy structure */
          <div>
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
          </div>
        )}
      </div>

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