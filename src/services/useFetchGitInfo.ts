import { fetchAllReleases, fetchContributors, fetchLatestVersion, fetchRepoStats } from "#/api/api";
import { useQuery } from "@tanstack/react-query";

//Fetch latest version
export function getLatestVersion() {
  return useQuery({
    queryKey: ["latest-version"],
    queryFn: async () => await fetchLatestVersion(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
  })
}


// Fetch repository stats
export function getRepoStats() {
  return useQuery({
    queryKey: ['github-repo-stats'],
    queryFn: fetchRepoStats,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
  });
}

// Fetch all releases
export function getReleases() {
  return useQuery({
    queryKey: ['github-releases'],
    queryFn: fetchAllReleases,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000,
  });
}


// Fetch contributors
export function getContributors() {
  return useQuery({
    queryKey: ['github-contributors'],
    queryFn: fetchContributors,
    refetchInterval: 3600000, // Refetch every hour
    staleTime: 3000000,
  });
}