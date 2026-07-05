import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  HistoryContainer,
  HeaderRow,
  Title,
  ClearButton,
  TagsContainer,
  HistoryTag
} from './SearchHistory.styles';

export default function SearchHistory({ searchHistory, activeUser, onHistoryClick, onClear }) {
  if (searchHistory.length === 0) return null;

  return (
    <HistoryContainer 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <HeaderRow>
        <Title>Recent Searches</Title>
        <ClearButton onClick={onClear}>Clear</ClearButton>
      </HeaderRow>
      <TagsContainer layout>
        <AnimatePresence>
          {searchHistory.map((histUser) => (
            <HistoryTag
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={histUser}
              onClick={() => onHistoryClick(histUser)}
              $isActive={histUser === activeUser}
              className={`btn ${histUser === activeUser ? 'btn-primary' : 'btn-secondary'}`}
            >
              {histUser}
            </HistoryTag>
          ))}
        </AnimatePresence>
      </TagsContainer>
    </HistoryContainer>
  );
}
