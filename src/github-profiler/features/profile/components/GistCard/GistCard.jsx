import React from 'react';
import styled from 'styled-components';
import { ListCard, ListCardTitle, StatsRow, StatsItem } from '../../../../components/common/ListCardStyles';

const GistContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileCount = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function GistCard({ gist }) {
  const fileCount = Object.keys(gist.files).length;
  const firstFilename = Object.keys(gist.files)[0];

  return (
    <ListCard variants={itemVariants}>
      <GistContent>
        <ListCardTitle>
          <a
            href={gist.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gist.description || firstFilename || 'Untitled Gist'}
          </a>
        </ListCardTitle>
        <FileCount>
          📝 {fileCount} {fileCount === 1 ? 'file' : 'files'}
        </FileCount>
        <StatsRow>
          <StatsItem>Created: {new Date(gist.created_at).toLocaleDateString()}</StatsItem>
          <StatsItem>Updated: {new Date(gist.updated_at).toLocaleDateString()}</StatsItem>
        </StatsRow>
      </GistContent>
    </ListCard>
  );
}
