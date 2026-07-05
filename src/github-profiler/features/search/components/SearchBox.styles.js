import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SearchForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SearchLabel = styled.label`
  font-weight: 600;
  color: var(--text-secondary);
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StyledInput = styled.input`
  flex: 1;
  background: var(--bg-tertiary) !important;
  border: 1px solid var(--border-color) !important;
`;

export const SubmitButton = styled.button`
  height: 100%;
`;
