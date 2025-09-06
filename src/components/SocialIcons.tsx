import React from 'react';
import { Social } from '@/types';

interface IconProps {
  className?: string;
}

export const GitHubIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const ResearchGateIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68l-.034.11a7.77 7.77 0 0 0-.15.632c-.203 1.082-.34 2.572-.34 4.48-.006 1.891.13 3.374.34 4.48.047.252.094.443.15.632l.034.11c.243.744.65 1.303 1.213 1.68.565.375 1.255.565 2.073.565.818 0 1.508-.19 2.073-.565.563-.377.97-.936 1.213-1.68l.034-.11c.056-.189.103-.38.15-.632.21-1.106.346-2.589.34-4.48.006-1.908-.13-3.398-.34-4.48a7.77 7.77 0 0 0-.15-.632l-.034-.11c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0zm-7.25 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68l-.034.11a7.77 7.77 0 0 0-.15.632c-.203 1.082-.34 2.572-.34 4.48-.006 1.891.13 3.374.34 4.48.047.252.094.443.15.632l.034.11c.243.744.65 1.303 1.213 1.68.565.375 1.255.565 2.073.565.818 0 1.508-.19 2.073-.565.563-.377.97-.936 1.213-1.68l.034-.11c.056-.189.103-.38.15-.632.21-1.106.346-2.589.34-4.48.006-1.908-.13-3.398-.34-4.48a7.77 7.77 0 0 0-.15-.632l-.034-.11c-.243-.744-.65-1.303-1.213-1.68C13.844.19 13.154 0 12.336 0zM4.508 0c-.818 0-1.508.19-2.073.565C1.872.942 1.465 1.501 1.222 2.245l-.034.11a7.77 7.77 0 0 0-.15.632c-.203 1.082-.34 2.572-.34 4.48-.006 1.891.13 3.374.34 4.48.047.252.094.443.15.632l.034.11c.243.744.65 1.303 1.213 1.68.565.375 1.255.565 2.073.565.818 0 1.508-.19 2.073-.565.563-.377.97-.936 1.213-1.68l.034-.11c.056-.189.103-.38.15-.632.21-1.106.346-2.589.34-4.48.006-1.908-.13-3.398-.34-4.48a7.77 7.77 0 0 0-.15-.632l-.034-.11c-.243-.744-.65-1.303-1.213-1.68C6.016.19 5.326 0 4.508 0z"/>
  </svg>
);

export const GoogleScholarIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
  </svg>
);

export const OrcidIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.516.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.303 3.588-3.722 0-2.297-1.228-3.722-3.588-3.722h-2.297z"/>
  </svg>
);

interface SocialIconsProps {
  social: Social;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ social }) => {
  const getIcon = (platform: string) => {
    const iconClassName = "w-6 h-6";
    
    switch (platform) {
      case 'github':
        return <GitHubIcon className={iconClassName} />;
      case 'linkedin':
        return <LinkedInIcon className={iconClassName} />;
      case 'twitter':
        return <TwitterIcon className={iconClassName} />;
      case 'researchgate':
        return <ResearchGateIcon className={iconClassName} />;
      case 'googleScholar':
        return <GoogleScholarIcon className={iconClassName} />;
      case 'orcid':
        return <OrcidIcon className={iconClassName} />;
      default:
        return <span className="text-sm">{platform}</span>;
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'googleScholar':
        return 'Google Scholar';
      case 'researchgate':
        return 'ResearchGate';
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  return (
    <div className="flex justify-center space-x-6">
      {Object.entries(social).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 group"
          title={getPlatformLabel(platform)}
        >
          <div className="transform group-hover:scale-110 transition-transform duration-200">
            {getIcon(platform)}
          </div>
          <span className="sr-only">{getPlatformLabel(platform)}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;