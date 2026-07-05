import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: 
    radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.08), transparent 25%);
  color: var(--text-primary);
  font-family: var(--font-sans);
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.05em;
`;

export const Subtitle = styled(motion.p)`
  color: var(--text-muted);
  margin-top: 0.5rem;
  font-size: 1.1rem;
`;

export const StyledBackLink = styled(Link)`
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 0.8;
  }
`;

export const Layout = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

export const GlassPanel = styled(motion.div)`
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-glass);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);

  &:hover {
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.1);
  }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.6; filter: drop-shadow(0 0 5px var(--accent)); }
  50% { opacity: 1; filter: drop-shadow(0 0 15px var(--accent)); }
  100% { opacity: 0.6; filter: drop-shadow(0 0 5px var(--accent)); }
`;

export const LoaderWrapper = styled.div`
  animation: ${pulseGlow} 2s infinite;
`;

export const ErrorPanel = styled(GlassPanel)`
  color: var(--danger);
  border-left: 4px solid var(--danger);
`;

export const EmptyPanel = styled(GlassPanel)`
  color: var(--text-secondary);
  text-align: center;
  padding: 4rem 2rem;
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  text-transform: capitalize;
  font-size: 1.8rem;
  font-family: var(--font-heading);
`;

export const ListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
