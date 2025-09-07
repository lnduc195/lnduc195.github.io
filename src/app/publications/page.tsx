import { getPublicationsData } from '@/lib/data';
import Link from 'next/link';
import { BlogData } from '@/types';

function formatDateRange(blog: BlogData): string {
  // If we have both start_date and end_date
  if (blog.end_date) {
    if (blog.start_date === blog.end_date) {
      return blog.start_date;
    }
    return `${blog.start_date} - ${blog.end_date}`;
  }
  
  // If we have only start_date, show it as ongoing
  return `${blog.start_date} - Present`;
}

function PublicationCard({ blog }: { blog: BlogData }) {
  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{formatDateRange(blog)}</span>
        <span className="text-sm text-blue-600">{blog.readingTime}</span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {blog.title}
      </h3>
      
      {blog.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.topics && blog.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            {topic}
          </span>
        ))}
        {blog.topics && blog.topics.length > 3 && (
          <span className="text-gray-500 text-xs px-2 py-1">
            +{blog.topics.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.technologies && blog.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {tech}
          </span>
        ))}
        {blog.technologies && blog.technologies.length > 3 && (
          <span className="text-gray-500 text-xs px-2 py-1">
            +{blog.technologies.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <Link 
          href={`/publications/${blog.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read More →
        </Link>
        
        <div className="flex space-x-3">
          {blog.videoUrl && (
            <Link
              href={blog.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 text-sm"
            >
              📺 Video
            </Link>
          )}
          {blog.githubUrl && (
            <Link
              href={blog.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 text-sm"
            >
              🔗 Code
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function PublicationsPage() {
  const blogs = await getPublicationsData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Publications</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore my research insights, academic publications, and in-depth analysis on AI, 
          machine learning, and emerging technologies.
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <PublicationCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No publications found.</p>
        </div>
      )}
    </div>
  );
}