import styled from 'styled-components';
import { motion } from 'framer-motion';

export const UserInfoContainer = styled(motion.div)``;

export const TabsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  background: rgba(0, 0, 0, 0.03);
  padding: 0.5rem;
  border-radius: var(--radius-lg);

  [data-theme="dark"] & {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const TabButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: ${props => props.$active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  z-index: 1;
  transition: color var(--transition-fast);
`;

export const TabButtonBg = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  z-index: -1;
`;

export const TabCount = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  font-family: var(--font-heading);
`;

export const TabLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
`;

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 0.75rem;
  color: var(--text-secondary);
`;

export const MetaIcon = styled.span`
  opacity: 0.5;
`;

export const MetaLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
`;
