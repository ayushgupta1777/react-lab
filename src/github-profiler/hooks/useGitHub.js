import { useState } from 'react';
import { githubService } from '../services/github.service';

export function useGitHub() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState('');
  
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

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
    setFollowersList([]);
    setFollowingList([]);

    try {
      const profileData = await githubService.fetchUserProfile(userToSearch);
      setProfile(profileData);
      setActiveUser(profileData.login);

      setSearchHistory((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== profileData.login.toLowerCase());
        const updated = [profileData.login, ...filtered].slice(0, 5);
        localStorage.setItem('github_search_history', JSON.stringify(updated));
        return updated;
      });

      const [reposData, followersData, followingData] = await Promise.all([
        githubService.fetchUserRepos(userToSearch),
        githubService.fetchUserFollowers(userToSearch),
        githubService.fetchUserFollowing(userToSearch)
      ]);

      setRepos(reposData);
      setFollowersList(followersData);
      setFollowingList(followingData);
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
    followersList,
    followingList,
    loading,
    error,
    searchHistory,
    activeUser,
    fetchGitHubData,
    clearHistory
  };
}
