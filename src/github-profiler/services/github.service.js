/**
 * Service to handle communications with GitHub API.
 */

export const githubService = {
  /**
   * Fetches user profile data from GitHub.
   * @param {string} username - The GitHub username to search.
   * @returns {Promise<Object>} - User profile JSON object.
   */
  fetchUserProfile: async (username) => {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    
    if (!profileRes.ok) {
      if (profileRes.status === 404) {
        throw new Error('User not found. Please try another username.');
      } else if (profileRes.status === 403) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Failed to fetch user (Status: ${profileRes.status})`);
      }
    }
    
    return await profileRes.json();
  },

  /**
   * Fetches a user's repositories from GitHub.
   * @param {string} username - The GitHub username.
   * @returns {Promise<Array>} - List of public repositories.
   */
  fetchUserRepos: async (username) => {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repositories (Status: ${reposRes.status})`);
    }
    
    return await reposRes.json();
  }
};
