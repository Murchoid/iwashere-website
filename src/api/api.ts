export interface ReleaseAsset {
    name: string;
    browser_download_url: string;
    content_type: string;
    download_count: number;
}

export interface BackendRepoStats {
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
}

export interface BackendRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
}

export interface BackendContributors {
  contributors: number;
}

export interface BackendVersion {
  version: string;
}

interface BackendDownloads {
  totalDownloads: number;
}

const API_BASE_URL = 'http://127.0.0.1:4000';

// Helper for fetch with error handling
async function fetchFromBackend<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`Backend error: ${response.status} - ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch repository info (stars, forks, etc.)
export const fetchRepoStats = async (): Promise<BackendRepoStats> => {
  const data = await fetchFromBackend<BackendRepoStats>('/api/stats');
  return {
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    subscribers_count: data.subscribers_count,
    open_issues_count: data.open_issues_count,
  };
};

// Fetch latest release info
export const fetchLatestRelease = async (): Promise<BackendRelease> => {
  const data = await fetchFromBackend<BackendRelease>('/api/release/latest');
  return {
    id: data.id,
    tag_name: data.tag_name,
    name: data.name,
    published_at: data.published_at,
    assets: data.assets,
  };
};

// Fetch all releases (for download history)
export const fetchAllReleases = async (): Promise<BackendRelease[]> => {
  const data = await fetchFromBackend<BackendRelease[]>('/api/releases');
  return data.map(release => ({
    id: release.id,
    tag_name: release.tag_name,
    name: release.name,
    published_at: release.published_at,
    assets: release.assets,
  }));
};

// Fetch total downloads
export const fetchTotalDownloads = async (): Promise<number> => {
  const data = await fetchFromBackend<BackendDownloads>('/api/downloads/total');
  return data.totalDownloads;
};

// Fetch contributors count
export const fetchContributors = async (): Promise<number> => {
  const data = await fetchFromBackend<BackendContributors>('/api/contributors');
  return data.contributors;
};

// Fetch latest version
export const fetchLatestVersion = async (): Promise<{ tag_name: string }> => {
  const data = await fetchFromBackend<BackendVersion>('/api/version');
  return { tag_name: data.version };
};

// Optional: Combined data fetcher for homepage stats
export const fetchAllStats = async () => {
  const [stats, latestRelease, totalDownloads, contributors] = await Promise.all([
    fetchRepoStats(),
    fetchLatestRelease(),
    fetchTotalDownloads(),
    fetchContributors(),
  ]);

  return {
    stats,
    latestRelease,
    totalDownloads,
    contributors,
  };
}