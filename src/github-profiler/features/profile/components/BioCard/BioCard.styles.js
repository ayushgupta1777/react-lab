import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
`;

export const AvatarContainer = styled(motion.div)`
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, var(--accent), #06b6d4, #10b981);
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid var(--bg-secondary);
  object-fit: cover;
`;

export const Name = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  letter-spacing: -0.02em;
`;

export const Username = styled.p`
  margin: 0;
  color: var(--accent);
  font-weight: 600;
  margin-top: 0.25rem;
`;

export const BioText = styled(motion.p)`
  font-style: italic;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.02);
  padding: 1rem;
  border-radius: var(--radius-md);
`;

export const ProfileLink = styled(motion.a)`
  text-decoration: none;
  display: inline-block;
  width: 100%;
  margin-top: 0.5rem;
`;
