import React from 'react';

export default function RepoCard({ repo }) {
  // Simple color helper for common languages
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Java: '#b07219',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      PHP: '#4F5D95',
      Swift: '#F05138'
    };
    return colors[lang] || '#8b8b8b';
  };

  return (
    <div>
      <div>
        <h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>
          {repo.private ? (
            <span>Private</span>
          ) : (
            <span>Public</span>
          )}
        </h3>
        
        <div>
          <span>Stars: {repo.stargazers_count}</span>
          <span> | Forks: {repo.forks_count}</span>
        </div>
      </div>

      {repo.description && (
        <p>
          {repo.description}
        </p>
      )}

      <div>
        {repo.language && (
          <div>
            <span></span>
            <span>{repo.language}</span>
          </div>
        )}
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
