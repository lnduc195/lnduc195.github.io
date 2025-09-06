import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Duc Le
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link href="/skills" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Skills
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Projects
              </Link>
              <Link href="/publications" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Publications
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Blogs
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Duc Le. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}