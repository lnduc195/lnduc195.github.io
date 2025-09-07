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
  // Normalize level format detection - focus only on the pattern, not depth
  const cleanLevel = level.trim().toUpperCase();
  const isTopLevel = /^[A-Z]\./.test(cleanLevel);
  const isRomanNumeral = /^(I{1,3}V?X?|IV|V|VI|VII|VIII|IX|X)\./.test(cleanLevel);
  const isNumeric = /^\d+\./.test(cleanLevel);
  
  // Determine hierarchy based purely on pattern (same pattern = same styling)
  if (isTopLevel) {
    // Top level (A, B, C, etc.) - section headers with subtle emphasis
    return {
      containerClass: "mb-12 bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
      headerClass: "text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 pb-3 border-b border-gray-100"
    };
  } else if (isRomanNumeral) {
    // Roman numeral level (I, II, III, etc.) - equal weight cards
    return {
      containerClass: "mb-6 bg-gray-50 rounded-lg border border-gray-150 p-5 hover:bg-gray-75 transition-colors duration-200",
      headerClass: "text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3"
    };
  } else if (isNumeric) {
    // Numeric level (1, 2, 3, etc.) - minimal cards
    return {
      containerClass: "mb-4 bg-white rounded-md border border-gray-100 p-4 hover:border-gray-200 transition-colors duration-200",
      headerClass: "text-base font-medium text-gray-700 mb-3 flex items-center gap-2"
    };
  } else {
    // Unknown/other patterns - minimal styling
    return {
      containerClass: "mb-4 p-3 rounded border-l-2 border-gray-200",
      headerClass: "text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"
    };
  }
}

function renderTable(content: ProjectContent): JSX.Element {
  if (content.type !== 'table' || !content.headers || !content.rows) {
    return <div />;
  }

  return (
    <div className="my-8">
      {content.caption && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800 text-center">
            {content.caption}
          </h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {content.headers.map((header, index) => (
                <th key={index} className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                  <div dangerouslySetInnerHTML={{ __html: formatText(header) }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0 align-top">
                    <div dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  const { containerClass, headerClass } = hasLevel ? getLevelStyles(item.level!) : { containerClass: 'mb-4', headerClass: '' };

  // Get level badge color based on level pattern (consistent for same patterns)
  const getBadgeColor = (level: string) => {
    const cleanLevel = level.trim().toUpperCase();
    const isTopLevel = /^[A-Z]\./.test(cleanLevel);
    const isRomanNumeral = /^(I{1,3}V?X?|IV|V|VI|VII|VIII|IX|X)\./.test(cleanLevel);
    const isNumeric = /^\d+\./.test(cleanLevel);
    
    if (isTopLevel) return "text-blue-700 bg-blue-50 border border-blue-200";
    if (isRomanNumeral) return "text-gray-700 bg-gray-100 border border-gray-200";
    if (isNumeric) return "text-gray-600 bg-gray-50 border border-gray-150";
    return "text-gray-500 bg-gray-25 border border-gray-100";
  };

  return (
    <div className={containerClass}>
      {hasLevel && (
        <h3 className={headerClass}>
          <span className={`font-mono text-xs px-2 py-1 rounded-md font-medium ${getBadgeColor(item.level!)}`}>
            {item.level}
          </span>
          <span className="text-current">{item.text}</span>
        </h3>
      )}
      
      <div className={hasLevel ? "space-y-4 mt-6" : "space-y-4"}>
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