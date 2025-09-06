import { getAboutData } from '@/lib/data';
import Link from 'next/link';
import SocialIcons from '@/components/SocialIcons';

export default async function Home() {
  const aboutData = await getAboutData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <img
            src="/assets/image/image_avatar.jpg"
            alt={aboutData.name}
            className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{aboutData.name}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{aboutData["main role"]}</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          {aboutData.slogan}
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href={aboutData.cv.url} 
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Download CV
          </Link>
          <Link 
            href={aboutData.resume.url} 
            target="_blank"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Download Resume
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About Me</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {aboutData.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600 flex items-center">
              <span className="mr-2">📍</span>
              {aboutData.location}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Roles & Expertise</h3>
          <div className="grid grid-cols-2 gap-3">
            {aboutData.roles.map((role, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm text-center"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
        <div className="space-y-6">
          {aboutData.education.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
              <p className="text-blue-600 font-medium">{edu.school}</p>
              <p className="text-gray-500 mb-3">{edu.year}</p>
              <p className="text-gray-700">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
        <div className="space-y-6">
          {aboutData.experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
              <p className="text-blue-600 font-medium">{exp.company}</p>
              <p className="text-gray-500 mb-3">{exp.period}</p>
              <div className="text-gray-700 space-y-2">
                {exp.description.split('\n').map((line, lineIndex) => {
                  if (line.trim().startsWith('🚀') || line.trim().startsWith('📊') || 
                      line.trim().startsWith('🧠') || line.trim().startsWith('🧭')) {
                    return <p key={lineIndex} className="pl-4">{line.trim()}</p>;
                  }
                  return line.trim() ? <p key={lineIndex}>{line.trim()}</p> : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h3>
        <SocialIcons social={aboutData.social} />
      </div>

      {/* Footer Quote */}
      <div className="text-center mt-16 py-8 border-t">
        <p className="text-gray-600 italic">{aboutData.slogan_footer}</p>
      </div>
    </div>
  );
}