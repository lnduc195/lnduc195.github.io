import { getSkillsData } from '@/lib/data';
import { SkillCategory } from '@/types';

function renderSkillCategory(category: string, data: SkillCategory, depth: number = 0): JSX.Element[] {
  const elements: JSX.Element[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // This is a skill list
      elements.push(
        <div key={key} className={`mb-6 ${depth > 0 ? 'ml-4' : ''}`}>
          <h3 className={`font-semibold text-gray-900 mb-3 ${
            depth === 0 ? 'text-lg' : depth === 1 ? 'text-base' : 'text-sm'
          }`}>
            {key}
          </h3>
          <div className="flex flex-wrap gap-2">
            {value.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      );
    } else {
      // This is a nested category
      elements.push(
        <div key={key} className={`mb-8 ${depth > 0 ? 'ml-4' : ''}`}>
          <h3 className={`font-bold text-gray-900 mb-4 ${
            depth === 0 ? 'text-xl' : depth === 1 ? 'text-lg' : 'text-base'
          } border-b border-gray-200 pb-2`}>
            {key}
          </h3>
          <div className="space-y-4">
            {renderSkillCategory(key, value, depth + 1)}
          </div>
        </div>
      );
    }
  });
  
  return elements;
}

export default async function SkillsPage() {
  const skillsData = await getSkillsData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills & Expertise</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive overview of my technical skills across AI/ML, software development, 
          infrastructure, and emerging technologies.
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(skillsData).map(([categoryName, categoryData]) => (
          <div key={categoryName} className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - Big Title */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 sticky top-8">
                {categoryName.replace(/_/g, ' ')}
              </h2>
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="space-y-8">
                  {renderSkillCategory(categoryName, categoryData as SkillCategory)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}