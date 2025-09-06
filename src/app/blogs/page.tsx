import { getBlogData } from '@/lib/data';
import Link from 'next/link';
import { BlogData } from '@/types';

function BlogCard({ blog }: { blog: BlogData }) {
  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{blog.date}</span>
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
          <span key={topic} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
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
          href={`/blogs/${blog.id}`}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
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

export default async function BlogsPage() {
  const blogs = await getBlogData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Blogs</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Deep dives into AI, machine learning, software engineering, and emerging technologies. 
          Sharing insights, tutorials, and practical experiences.
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      )}
    </div>
  );
}