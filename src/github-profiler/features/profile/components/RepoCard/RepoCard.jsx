import React from 'react';
import styled from 'styled-components';
import { ListCard, ListCardTitle, Badge, StatsRow, StatsItem, LangDot } from '../../../../components/common/ListCardStyles';

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const MetricsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const Metric = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const Description = styled.p`
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

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
    <ListCard variants={itemVariants}>
      <HeaderRow>
        <ListCardTitle>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>
          <Badge $isPublic={!repo.private}>
            {repo.private ? 'Private' : 'Public'}
          </Badge>
        </ListCardTitle>
        
        <MetricsContainer>
          <Metric>
            ⭐ {repo.stargazers_count}
          </Metric>
          <Metric>
            🍴 {repo.forks_count}
          </Metric>
        </MetricsContainer>
      </HeaderRow>

      {repo.description && (
        <Description>
          {repo.description}
        </Description>
      )}

      <StatsRow>
        {repo.language && (
          <StatsItem>
            <LangDot style={{ backgroundColor: getLanguageColor(repo.language) }} />
            <span>{repo.language}</span>
          </StatsItem>
        )}
        <StatsItem>Updated {new Date(repo.updated_at).toLocaleDateString()}</StatsItem>
      </StatsRow>
    </ListCard>
  );
}
