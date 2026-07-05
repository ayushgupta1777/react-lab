import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HistoryContainer = styled(motion.div)`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--danger);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const TagsContainer = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const HistoryTag = styled(motion.button)`
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 20px;
  box-shadow: ${props => props.$isActive ? '0 4px 12px var(--accent-glow)' : 'none'};
`;
