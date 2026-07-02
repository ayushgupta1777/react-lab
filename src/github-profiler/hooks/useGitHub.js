import { useState } from 'react';
import { githubService } from '../services/github.service';

export function useGitHub() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState('');
  
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('github_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchGitHubData = async (userToSearch) => {
    if (!userToSearch.trim()) return;

    setLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);

    try {
      // 1. Fetch User Profile Details
      const profileData = await githubService.fetchUserProfile(userToSearch);
      setProfile(profileData);
      setActiveUser(profileData.login);

      // Save to local storage history
      setSearchHistory((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== profileData.login.toLowerCase());
        const updated = [profileData.login, ...filtered].slice(0, 5);
        localStorage.setItem('github_search_history', JSON.stringify(updated));
        return updated;
      });

      // 2. Fetch Repositories
      const reposData = await githubService.fetchUserRepos(userToSearch);
      setRepos(reposData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('github_search_history');
  };

  return {
    profile,
    repos,
    loading,
    error,
    searchHistory,
    activeUser,
    fetchGitHubData,
    clearHistory
  };
}
