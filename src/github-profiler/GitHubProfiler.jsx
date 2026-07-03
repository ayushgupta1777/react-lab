import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useGitHub } from './hooks/useGitHub';

import Card from './components/common/Card/Card';
import Loader from './components/common/Loader/Loader';

import SearchBox from './features/search/components/SearchBox';
import SearchHistory from './features/search/components/SearchHistory';

import BioCard from './features/profile/components/BioCard/BioCard';
import UserInfo from './features/profile/components/UserInfo/UserInfo';
import RepoCard from './features/profile/components/RepoCard/RepoCard';
import UserCard from './features/profile/components/UserCard/UserCard';

export default function GitHubProfiler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const usernameQuery = searchParams.get('username');
  const [activeTab, setActiveTab] = useState('repos');

  const {
    profile,
    repos,
    followersList,
    followingList,
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
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>User Profiler</h1>
          <p style={{ color: '#666', margin: 0, marginTop: '0.25rem' }}>
            Search for users, view their profile data, and explore their public repositories.
          </p>
        </div>
        <Link to="/" style={{ textDecoration: 'none', color: '#06b6d4' }}>
           Back to Storefront
        </Link>
      </header>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <aside style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <SearchBox onSubmit={handleSearchSubmit} loading={loading} initialUsername={usernameQuery || ''} />
            <SearchHistory 
              searchHistory={searchHistory} 
              activeUser={activeUser} 
              onHistoryClick={handleSearchSubmit} 
              onClear={clearHistory} 
            />
          </Card>

          {profile && (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  company={profile.company}
                  location={profile.location}
                  blog={profile.blog}
                  createdAt={profile.created_at}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>
            </Card>
          )}
        </aside>

        <main style={{ flex: 1 }}>
          {loading && <Loader message="Fetching profile data..." />}

          {error && (
            <div style={{ color: 'red' }}>
              <h3>Search Error</h3>
              <p>{error}</p>
            </div>
          )}

          {!profile && !loading && !error && (
            <div style={{ color: '#666' }}>
              <h3>No Profile Loaded</h3>
              <p>Enter a username on the left sidebar to view their profile statistics and repositories.</p>
            </div>
          )}

          {profile && !loading && (
            <div>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h2 style={{ margin: 0, textTransform: 'capitalize' }}>
                  {activeTab === 'repos' && `Public Repositories (${processedRepos.length})`}
                  {activeTab === 'followers' && `Followers (${followersList.length})`}
                  {activeTab === 'following' && `Following (${followingList.length})`}
                </h2>
              </div>

              {activeTab === 'repos' && (
                processedRepos.length === 0 ? (
                  <div style={{ color: '#666' }}>No repositories found for this user.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {processedRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                )
              )}

              {activeTab === 'followers' && (
                followersList.length === 0 ? (
                  <div style={{ color: '#666' }}>This user has no followers.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {followersList.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                )
              )}

              {activeTab === 'following' && (
                followingList.length === 0 ? (
                  <div style={{ color: '#666' }}>This user is not following anyone.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {followingList.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
