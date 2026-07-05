import React from 'react';
import {
  UserInfoContainer,
  TabsContainer,
  TabButton,
  TabButtonBg,
  TabCount,
  TabLabel,
  MetaContainer,
  MetaRow,
  MetaIcon,
  MetaLink
} from './UserInfo.styles';

export default function UserInfo({ publicRepos, followers, following, gistsCount, company, location, blog, createdAt, activeTab, onTabChange }) {
  const tabs = [
    { id: 'repos', label: 'Repos', value: publicRepos },
    { id: 'followers', label: 'Followers', value: followers },
    { id: 'following', label: 'Following', value: following },
    { id: 'gists', label: 'Gists', value: gistsCount },
  ];

  return (
    <UserInfoContainer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <TabsContainer>
        {tabs.map((tab) => (
          <TabButton 
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {activeTab === tab.id && (
              <TabButtonBg 
                layoutId="activeTabBg" 
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <TabCount>{tab.value}</TabCount>
            <TabLabel>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabsContainer>

      <MetaContainer>
        {company && (
          <MetaRow>
            <MetaIcon>🏢</MetaIcon> <span>{company}</span>
          </MetaRow>
        )}
        {location && (
          <MetaRow>
            <MetaIcon>📍</MetaIcon> <span>{location}</span>
          </MetaRow>
        )}
        {blog && (
          <MetaRow>
            <MetaIcon>🔗</MetaIcon> 
            <MetaLink 
              href={blog.startsWith('http') ? blog : `https://${blog}`} 
              target="_blank" 
              rel="noopener noreferrer" 
            >
              {blog}
            </MetaLink>
          </MetaRow>
        )}
        <MetaRow>
          <MetaIcon>🗓️</MetaIcon> 
          <span>Joined {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
        </MetaRow>
      </MetaContainer>
    </UserInfoContainer>
  );
}
