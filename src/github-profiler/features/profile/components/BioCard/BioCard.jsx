import React from 'react';
import { motion } from 'framer-motion';
import {
  BioContainer,
  AvatarContainer,
  AvatarImage,
  Name,
  Username,
  BioText,
  ProfileLink
} from './BioCard.styles';

export default function BioCard({ avatarUrl, name, login, bio, htmlUrl }) {
  return (    <BioContainer>
      <AvatarContainer
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <AvatarImage
          src={avatarUrl}
          alt={`${name || login} avatar`}
        />
      </AvatarContainer>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Name>{name || login}</Name>
        <Username>@{login}</Username>
      </motion.div>
      
      {bio && (
        <BioText 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "{bio}"
        </BioText>
      )}

      <ProfileLink
        href={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        View Profile on GitHub
      </ProfileLink>
    </BioContainer>
  );
}
