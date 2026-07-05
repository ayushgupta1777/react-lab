export const githubService = {
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

  fetchUserRepos: async (username) => {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`);
    
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repositories (Status: ${reposRes.status})`);
    }
    
    return await reposRes.json();
  },

  fetchUserFollowers: async (username) => {
    const followersRes = await fetch(`https://api.github.com/users/${username}/followers?per_page=100`);
    
    if (!followersRes.ok) {
      throw new Error(`Failed to fetch followers (Status: ${followersRes.status})`);
    }
    
    return await followersRes.json();
  },

  fetchUserFollowing: async (username) => {
    const followingRes = await fetch(`https://api.github.com/users/${username}/following?per_page=100`);
    
    if (!followingRes.ok) {
      throw new Error(`Failed to fetch following (Status: ${followingRes.status})`);
    }
    
    return await followingRes.json();
  },

  fetchUserGists: async (username) => {
    const gistsRes = await fetch(`https://api.github.com/users/${username}/gists?per_page=100`);
    
    if (!gistsRes.ok) {
      throw new Error(`Failed to fetch gists (Status: ${gistsRes.status})`);
    }
    
    return await gistsRes.json();
  }
};
