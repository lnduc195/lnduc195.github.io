import { getBlogData } from '@/lib/data';
import { BlogData, ProjectContent } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getBlog(slug: string): Promise<BlogData | null> {
  const blogs = await getBlogData();
  return blogs.find(b => b.id === slug) || null;
}

export async function generateStaticParams() {
  const blogs = await getBlogData();
  return blogs.map((blog) => ({
    slug: blog.id,
  }));
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

function processImageUrl(url: string): string {
  // Convert relative paths starting with "public/" to web-accessible paths
  if (url.startsWith('public/')) {
    return '/' + url.substring(7); // Remove "public/" and add leading "/"
  }
  // Return absolute URLs and already processed relative paths as-is
  return url;
}

function ContentSection({ content }: { content: ProjectContent[] }) {
  return (
    <div className="space-y-6">
      {content.map((item, index) => (
        <div key={index}>
          {item.type === 'text' && (
            <div className="prose max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatText(item.text || '') }} 
              />
            </div>
          )}
          {item.type === 'image' && (
            <div className="my-8">
              <img
                src={processImageUrl(item.url || '')}
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
  );
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/blogs" 
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
      >
        ← Back to Blogs
      </Link>

      {/* Header */}
      <article>
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">{blog.date}</span>
              <span className="text-green-600">{blog.readingTime}</span>
            </div>
            <div className="flex space-x-4">
              {blog.videoUrl && (
                <Link
                  href={blog.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                >
                  📺 Watch Video
                </Link>
              )}
              {blog.githubUrl && (
                <Link
                  href={blog.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition text-sm"
                >
                  🔗 View Code
                </Link>
              )}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          
          {blog.description && (
            <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
          )}
          
          {blog.main_image && (
            <div className="mb-8">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                <img
                  src={processImageUrl(blog.main_image.url)}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {blog.main_image.caption && (
                <p className="text-sm text-gray-500 text-center italic">
                  {blog.main_image.caption}
                </p>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between py-4 border-t border-b">
            <div>
              <p className="text-gray-600">By <span className="font-medium">{blog.author}</span></p>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.topics && blog.topics.map((topic) => (
                <span key={topic} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mb-12">
          <ContentSection content={blog.content} />
        </div>

        {/* Technologies */}
        {blog.technologies && blog.technologies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {blog.technologies.map((tech) => (
                <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Images */}
        {blog.images && blog.images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blog.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={processImageUrl(image.url)}
                    alt={image.caption}
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center italic">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {blog.references && Object.keys(blog.references).length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">References</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {Object.entries(blog.references).map(([key, value]) => (
                <p key={key}>
                  <span className="font-mono text-green-600">[{key}]</span> {value}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {blog.related && blog.related.length > 0 && (
          <div className="border-t pt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {blog.related.map((article, index) => (
                <Link
                  key={index}
                  href={article.url}
                  className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <h4 className="font-medium text-gray-900">{article.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}