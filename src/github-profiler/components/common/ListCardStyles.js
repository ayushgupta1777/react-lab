import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ListCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
    border-color: var(--accent-light);

    &::before {
      transform: translateX(100%);
    }
  }

  [data-theme="dark"] &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    background: var(--bg-tertiary);
  }
`;

export const ListCardTitle = styled.h3`
  font-size: 1.25rem;
  font-family: var(--font-heading);
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  a {
    text-decoration: none;
    color: var(--accent);
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Badge = styled.span`
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${props => props.$isPublic ? `
    color: var(--success);
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.05);
  ` : `
    color: var(--warning);
    border-color: rgba(245, 158, 11, 0.3);
    background: rgba(245, 158, 11, 0.05);
  `}
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 1rem;
`;

export const StatsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const LangDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.4rem;
`;
