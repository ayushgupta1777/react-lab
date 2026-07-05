import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchForm,
  SearchLabel,
  InputGroup,
  StyledInput,
  SubmitButton
} from './SearchBox.styles';

export default function SearchBox({ onSubmit, loading, initialUsername = '' }) {
  const [username, setUsername] = useState(initialUsername);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <SearchForm 
      onSubmit={handleFormSubmit} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SearchLabel htmlFor="username-input">Search GitHub User</SearchLabel>
      <InputGroup>
        <StyledInput
          id="username-input"
          placeholder="e.g. gaearon"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SubmitButton type="submit" disabled={loading} className="btn btn-primary">
            {loading ? '...' : 'Search'}
          </SubmitButton>
        </motion.div>
      </InputGroup>
    </SearchForm>
  );
}
