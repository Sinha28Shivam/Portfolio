
const fetchCommitCount = async (username: string, token: string | null = null): Promise<number> => {
    try {
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};
        
      const response = await fetch(
        `https://api.github.com/users/${username}/events/public`,
        { headers }
      );
  
      if (!response.ok) {
        console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
        throw new Error('Failed to fetch data from GitHub');
      }
  
      const events = await response.json();
  
      // Count all PushEvent commits
      const commitCount = events
      .filter((event: any) => event.type === 'PushEvent')
      .reduce((total: number, event: any) => total + event.payload.commits.length, 0);
  
      console.log(`Commit count for ${username}: ${commitCount}`);
      return commitCount;
    } catch (error) {
      console.error('Error fetching commit count:', error);
      return 0;
    }
  };
  
  export default fetchCommitCount;
