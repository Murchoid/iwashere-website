export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  content_type: string;
  download_count: number;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
}

export interface GitHubRepoStats {
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
}

// Fetch repository info (stars, etc.)
export const fetchRepoStats = async (): Promise<GitHubRepoStats> => {
  const response = await fetch('https://api.github.com/repos/Murchoid/iwashere');
  if (!response.ok) throw new Error('Failed to fetch repo stats');
  return response.json();
};

// Fetch all releases to calculate total downloads
export const fetchAllReleases = async (): Promise<GitHubRelease[]> => {
  let page = 1;
  let allReleases: GitHubRelease[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.github.com/repos/Murchoid/iwashere/releases?page=${page}&per_page=100`
    );
    
    if (!response.ok) break;
    
    const releases = await response.json();
    if (releases.length === 0) {
      hasMore = false;
    } else {
      allReleases = [...allReleases, ...releases];
      page++;
    }
  }
  
  return allReleases;
};

// Fetch contributors
export const fetchContributors = async (): Promise<number> => {
  const response = await fetch(
    'https://api.github.com/repos/Murchoid/iwashere/contributors?per_page=1'
  );
  
  if (!response.ok) return 0;
  
  // Get the Link header to determine total contributors count
  const linkHeader = response.headers.get('Link');
  if (linkHeader) {
    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
    if (match) {
      return parseInt(match[1]);
    }
  }
  
  // If no Link header, fetch all contributors (fallback)
  const allContributors = await fetch(
    'https://api.github.com/repos/Murchoid/iwashere/contributors?per_page=100'
  );
  const contributors = await allContributors.json();
  return contributors.length;
};

export const fetchLatestVersion = async ()  => {
    try {
        const res = await fetch("https://api.github.com/repos/Murchoid/iwashere/releases/latest")
        const data = await res.json()
        return data

    } catch (err){
        console.log(err)
    }
}
