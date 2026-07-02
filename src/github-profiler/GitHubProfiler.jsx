import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Hooks & Services
import { useGitHub } from './hooks/useGitHub';

// Common Components
import Card from './components/common/Card/Card';
import Loader from './components/common/Loader/Loader';

// Feature Components
import SearchBox from './features/search/components/SearchBox';
import SearchHistory from './features/search/components/SearchHistory';
import BioCard from './features/profile/components/BioCard/BioCard';
import UserInfo from './features/profile/components/UserInfo/UserInfo';
import RepoCard from './features/profile/components/RepoCard/RepoCard';

export default function GitHubProfiler() {
  const {
    profile,
    repos,
    loading,
    error,
    searchHistory,
    activeUser,
    fetchGitHubData,
    clearHistory
  } = useGitHub();

  // Repo filtering and sorting state
  const [repoSearch, setRepoSearch] = useState('');
  const [sortBy, setSortBy] = useState('updated'); // updated, stars, forks, name

  // Filter and sort repos list
  const processedRepos = repos
    .filter((repo) => {
      return (
        repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(repoSearch.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === 'forks') {
        return b.forks_count - a.forks_count;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // Default: recently updated
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: 'var(--text-main, #333)',
      backgroundColor: 'var(--bg-main, #fff)',
      minHeight: '100vh'
    }}>
      {/* Navigation Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color, #eaeaea)',
        paddingBottom: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🐙</span> GitHub Profiler
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted, #666)', fontSize: '0.9rem' }}>
            Search for GitHub users, view their profile data, and explore their public repositories.
          </p>
        </div>
        <Link to="/" style={{
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md, 4px)',
          border: '1px solid var(--border-color, #ccc)',
          color: 'var(--text-main, #333)',
          fontWeight: '500',
          fontSize: '0.9rem',
          backgroundColor: 'var(--bg-secondary, #fafafa)'
        }}>
          🏠 Back to Storefront
        </Link>
      </header>

      {/* Main Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '2rem'
      }}>
        
        {/* Left Column: Search Form & Profile info */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Search Box Card */}
          <Card>
            <SearchBox onSubmit={fetchGitHubData} loading={loading} />
            <SearchHistory
              searchHistory={searchHistory}
              activeUser={activeUser}
              onHistoryClick={fetchGitHubData}
              onClear={clearHistory}
            />
          </Card>

          {/* User Profile Card */}
          {profile && (
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              />
            </Card>
          )}
        </aside>

        {/* Right Column: Repositories List */}
        <main>
          {loading && <Loader message="Fetching GitHub profile data..." />}

          {error && (
            <div style={{
              padding: '2rem',
              borderRadius: 'var(--radius-lg, 8px)',
              border: '1px solid var(--danger, #ff3b30)',
              backgroundColor: '#fff5f5',
              color: 'var(--danger, #d00)',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>⚠️ Search Error</h3>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          )}

          {!profile && !loading && !error && (
            <div style={{
              padding: '5rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border-color, #ccc)',
              borderRadius: 'var(--radius-lg, 8px)',
              color: 'var(--text-muted, #666)'
            }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3 style={{ margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>No Profile Loaded</h3>
              <p style={{ margin: 0 }}>Enter a GitHub username on the left sidebar to view their profile statistics and repositories.</p>
            </div>
          )}

          {profile && !loading && (
            <div>
              {/* Repos header & filters */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '2px solid var(--border-color, #eaeaea)',
                paddingBottom: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                  Public Repositories ({processedRepos.length})
                </h2>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {/* Filter repos */}
                  <input
                    type="text"
                    placeholder="Filter repositories..."
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-md, 4px)',
                      border: '1px solid var(--border-color, #ccc)',
                      backgroundColor: 'var(--bg-tertiary, #fff)',
                      fontSize: '0.85rem',
                      color: 'inherit',
                      outline: 'none'
                    }}
                  />

                  {/* Sort repos */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-md, 4px)',
                      border: '1px solid var(--border-color, #ccc)',
                      backgroundColor: 'var(--bg-tertiary, #fff)',
                      fontSize: '0.85rem',
                      color: 'inherit',
                      outline: 'none'
                    }}
                  >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              {/* Repos grid/list */}
              {processedRepos.length === 0 ? (
                <div style={{
                  padding: '3rem',
                  textAlign: 'center',
                  color: 'var(--text-muted, #666)',
                  border: '1px solid var(--border-color, #eaeaea)',
                  borderRadius: 'var(--radius-md, 4px)'
                }}>
                  No repositories match your filter query.
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {processedRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
