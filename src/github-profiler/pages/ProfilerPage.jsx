import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useGitHub } from '../hooks/useGitHub';
import SearchBox from '../features/search/components/SearchBox';
import SearchHistory from '../features/search/components/SearchHistory';
import BioCard from '../features/profile/components/BioCard/BioCard';
import UserInfo from '../features/profile/components/UserInfo/UserInfo';
import RepoCard from '../features/profile/components/RepoCard/RepoCard';
import UserCard from '../features/profile/components/UserCard/UserCard';
import GistCard from '../features/profile/components/GistCard/GistCard';

function Loader({ message = 'Loading...' }) {
  return <div><p>{message}</p></div>;
}

import {
  Container,
  Header,
  Title,
  Subtitle,
  StyledBackLink,
  Layout,
  Sidebar,
  MainContent,
  GlassPanel,
  LoaderWrapper,
  ErrorPanel,
  EmptyPanel,
  SectionHeader,
  SectionTitle,
  ListContainer
} from './ProfilerPage.styles';

// --- Animation Variants ---

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProfilerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const usernameQuery = searchParams.get('username');
  const [activeTab, setActiveTab] = useState('repos');

  const {
    profile,
    repos,
    followersList,
    followingList,
    gists,
    loading,
    error,
    searchHistory,
    activeUser,
    fetchGitHubData,
    clearHistory
  } = useGitHub();

  useEffect(() => {
    if (usernameQuery && usernameQuery !== activeUser) {
      setActiveTab('repos');
      fetchGitHubData(usernameQuery);
    }
  }, [usernameQuery]);

  const handleSearchSubmit = (username) => {
    setActiveTab('repos');
    setSearchParams({ username });
  };

  const processedRepos = repos;

  return (
    <Container
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header>
        <div>
          <Title 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            User Profiler
          </Title>
          <Subtitle 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Search for users, view their profile data, and explore their public repositories.
          </Subtitle>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StyledBackLink to="/">
             <span style={{ fontSize: '1.2rem' }}>&larr;</span> Back to Storefront
          </StyledBackLink>
        </motion.div>
      </Header>

      <Layout>
        <Sidebar>
          <GlassPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBox onSubmit={handleSearchSubmit} loading={loading} initialUsername={usernameQuery || ''} />
            <SearchHistory 
              searchHistory={searchHistory} 
              activeUser={activeUser} 
              onHistoryClick={handleSearchSubmit} 
              onClear={clearHistory} 
            />
          </GlassPanel>

          <AnimatePresence>
            {profile && (
              <GlassPanel
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <BioCard
                  avatarUrl={profile.avatar_url}
                  name={profile.name}
                  login={profile.login}
                  bio={profile.bio}
                  htmlUrl={profile.html_url}
                />
                <UserInfo
                  publicRepos={profile.public_repos}
                  followers={profile.followers}
                  following={profile.following}
                  gistsCount={gists.length}
                  company={profile.company}
                  location={profile.location}
                  blog={profile.blog}
                  createdAt={profile.created_at}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </GlassPanel>
            )}
          </AnimatePresence>
        </Sidebar>

        <MainContent>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}
            >
              <LoaderWrapper>
                <Loader message="Fetching profile data..." />
              </LoaderWrapper>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {error && (
              <ErrorPanel
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Search Error</h3>
                <p style={{ margin: 0 }}>{error}</p>
              </ErrorPanel>
            )}

            {!profile && !loading && !error && (
              <EmptyPanel
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}>🔍</div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>No Profile Loaded</h3>
                <p style={{ margin: 0 }}>Enter a username on the left sidebar to view their profile statistics and repositories.</p>
              </EmptyPanel>
            )}

            {profile && !loading && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SectionHeader>
                  <SectionTitle>
                    {activeTab === 'repos' && `Public Repositories (${processedRepos.length})`}
                    {activeTab === 'followers' && `Followers (${followersList.length})`}
                    {activeTab === 'following' && `Following (${followingList.length})`}
                    {activeTab === 'gists' && `Gists (${gists.length})`}
                  </SectionTitle>
                </SectionHeader>

                <ListContainer 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                >
                  {activeTab === 'repos' && (
                    processedRepos.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)' }}>No repositories found for this user.</div>
                    ) : (
                      processedRepos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                      ))
                    )
                  )}

                  {activeTab === 'followers' && (
                    followersList.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)' }}>This user has no followers.</div>
                    ) : (
                      followersList.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))
                    )
                  )}

                  {activeTab === 'following' && (
                    followingList.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)' }}>This user is not following anyone.</div>
                    ) : (
                      followingList.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))
                    )
                  )}

                  {activeTab === 'gists' && (
                    gists.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)' }}>This user has no gists.</div>
                    ) : (
                      gists.map((gist) => (
                        <GistCard key={gist.id} gist={gist} />
                      ))
                    )
                  )}
                </ListContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </MainContent>
      </Layout>
    </Container>
  );
}
