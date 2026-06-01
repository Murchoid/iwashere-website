import fs from "fs/promises"

export interface ReleaseAsset {
    id: string;
    name: string;
    browser_download_url: string;
    content_type: string;
    download_count: number;
}


export interface GitHubRelease {
    id: string;
    tag_name: string;
    name: string;
    published_at: string;
    assets: ReleaseAsset[];
}


export interface GitHubRepoStats {
    id: string;
    stargazers_count: number;
    forks_count: number;
    subscribers_count: number;
    open_issues_count: number;
}

export interface IwashereContributors {
    id: string;
    contributors: number;
}

export interface IwashereVersion {
    id: string;
    version: string;
}


export const repoStats = await githubRequest("/repos/Murchoid/iwashere") as GitHubRepoStats
const stars = repoStats.stargazers_count;
export const latestRelease = await githubRequest("/repos/Murchoid/iwashere/releases/latest") as GitHubRelease


export const allReleases = async (): Promise<GitHubRelease[]> => {
  let page = 1;
  let allReleases: GitHubRelease[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await githubRequest(`/repos/Murchoid/iwashere/releases?page=${page}&per_page=100`)
    if (!response.ok) break;

    const releases = await response.json() as GitHubRelease[];
    if (releases.length === 0) {
      hasMore = false;
    } else {
      allReleases = [...allReleases, ...releases];
      page++;
    }
  }
  return allReleases;
};


let downloads = 0;
let releases = await allReleases()

for (const release of releases) {
  for (const asset of release.assets) {
    downloads += asset.download_count;
  }
}


export const allContributors = async (): Promise<number> => {
  const contributors = await githubRequest("/repos/Murchoid/iwashere/contributors?per_page=100")
  return contributors.length;
};


  const downloadUrl =(releaseData: GitHubRelease[]) => {
    if (!releaseData) return { linux: "#", macos: "#", windows: "#" };
    
    let latest = releaseData.length-1;

    return {
      linux: getDownloadUrl(releaseData[latest].assets, "linux"),
      macos: getDownloadUrl(releaseData[latest].assets, "macos"),
      windows: getDownloadUrl(releaseData[latest].assets, "windows")
    };
  }


const getDownloadUrl = (assets: ReleaseAsset[], os: string, arch: string = "amd64") => {
  const patterns = {
    linux: [`linux_${arch}`, 'linux_amd64', '.deb', '.rpm', '.AppImage'],
    macos: ['darwin', 'macOS', 'apple', '.pkg'],
    windows: ['windows', '.exe', '.zip']
  };
  
  const osPatterns = patterns[os as keyof typeof patterns] || [];
  const asset = assets.find(asset => 
    osPatterns.some(pattern => asset.name.toLowerCase().includes(pattern))
  );
  
  return asset?.browser_download_url || "#";
};


//helper function
async function githubRequest(endpoint: string) {
  const response = await fetch(
    `https://api.github.com${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_STATS_TOKEN}`, //no ratelimits cause I am authenticated
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API failed: ${response.status}`
    );
  }

  return response.json();
}

export interface stats {
  stars: number;
  downloads: number;
  latestVersion: {
    version: string;
    commit: string
};
  contributors: number;
  generatedAt: Date;
  downloadUrls: {
    linux: string;
    macos: string;
    windows: string;
}
}

//prepare the data

let contributors = await allContributors()
let downloadUrls = downloadUrl(releases)

const getVersionInfo = (tagName: string) => {
    const version = tagName.startsWith('v') ? tagName : `v${tagName}`;
    const commit = "latest"; 
    return { version, commit };
};
const latestVersion = getVersionInfo(releases[0].tag_name)


let thisStats: stats = {
    stars,
    contributors,
    downloads,
    generatedAt: new Date(),
    latestVersion,
    downloadUrls
}

//write to file
await fs.writeFile(
  "public/stats.json",
  JSON.stringify(thisStats, null, 2)
);