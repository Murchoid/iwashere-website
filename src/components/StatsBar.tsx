import { motion } from "framer-motion";
import { Star, Download, Tag, Users, Cpu, HardDrive, Network } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import type { GitHubRelease } from "#/api/api";
import { getContributors, getReleases, getRepoStats } from "#/services/useFetchGitInfo";


// Calculate total downloads across all releases
const calculateTotalDownloads = (releases: GitHubRelease[]): number => {
  return releases.reduce((total, release) => {
    const releaseDownloads = release.assets.reduce(
      (sum, asset) => sum + (asset.download_count || 0),
      0
    );
    return total + releaseDownloads;
  }, 0);
};

// Get latest version
const getLatestVersion = (releases: GitHubRelease[]): string => {
  if (!releases.length) return "v0.0.0";
  return releases[0].tag_name;
};

// Generate graph data for visual representation
const generateGraphData = (releases: GitHubRelease[], type: 'stars' | 'downloads' | 'version') => {
  // For now, return placeholder data
  // I will later switch to a database
  return [0, 6, 8, 7, 10, 9, 12, 14, 16, 18, 20, 19];
};

export function StatsBar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [systemLoad, setSystemLoad] = useState(42);
  const {data: releases, isLoading: releasesLoading, error: releasesError} = getReleases()
  const {data: repoStats, isLoading: statsLoading, error: statsError} = getRepoStats()
  const {data: contributorCount, isLoading: contributorsLoading} = getContributors()
  

  // Calculate derived stats
  const totalDownloads = useMemo(() => {
    if (!releases) return 0;
    return calculateTotalDownloads(releases);
  }, [releases]);

  const latestVersion = useMemo(() => {
    if (!releases) return "v0.0.0";
    return getLatestVersion(releases);
  }, [releases]);

  // Prepare stats array with real data
  const stats = useMemo(() => {
    const isLoading = statsLoading || releasesLoading || contributorsLoading;
    
    return [
      { 
        icon: Star, 
        label: "GitHub Stars", 
        value: isLoading ? "..." : (repoStats?.stargazers_count?.toLocaleString() || "0"),
        color: "text-yellow-500",
        graph: generateGraphData(releases || [], 'stars'),
        trend: repoStats?.stargazers_count ? `${((repoStats.stargazers_count / 1000).toFixed(1))}k` : "0",
      },
      { 
        icon: Download, 
        label: "Total Downloads", 
        value: isLoading ? "..." : (totalDownloads?.toLocaleString() || "0"),
        color: "text-green-500",
        graph: generateGraphData(releases || [], 'downloads'),
        trend: totalDownloads ? `${((totalDownloads / 1000).toFixed(1))}k` : "0",
      },
      { 
        icon: Tag, 
        label: "Latest Version", 
        value: isLoading ? "..." : latestVersion,
        color: "text-blue-500",
        graph: generateGraphData(releases || [], 'version'),
        trend: releases?.[0]?.published_at ? new Date(releases[0].published_at).toLocaleDateString() : "",
      },
      { 
        icon: Users, 
        label: "Contributors", 
        value: isLoading ? "..." : (contributorCount?.toString() || "0"),
        color: "text-purple-500",
        graph: generateGraphData(releases || [], 'stars'),
        trend: `${contributorCount || 0} total`,
      },
    ];
  }, [repoStats, totalDownloads, latestVersion, contributorCount, statsLoading, releasesLoading, contributorsLoading]);

  // Simulate changing system load
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(Math.floor(Math.random() * 30) + 30);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate release download breakdown
  const releaseBreakdown = useMemo(() => {
    if (!releases) return [];
    return releases.slice(0, 5).map(release => ({
      version: release.tag_name,
      downloads: release.assets.reduce((sum, asset) => sum + asset.download_count, 0),
      date: new Date(release.published_at).toLocaleDateString(),
    }));
  }, [releases]);

  if (statsError || releasesError) {
    console.error("Failed to fetch GitHub data:", statsError || releasesError);
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border/50 relative overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Terminal header */}
        <div className="text-primary mt-12 mb-10 p-4 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm">
          <span>$ system_monitor --stats</span>
          <span className="ml-2">iwashere</span>
          {!statsLoading && !releasesLoading && (
            <span className="ml-4 text-xs text-muted-foreground">
              (Updated: {new Date().toLocaleTimeString()})
            </span>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
              className="group relative"
            >
              {/* Terminal-style border */}
              <div className={`
                absolute -inset-0.5 bg-gradient-to-r 
                ${stat.color.replace('text', 'from')}/20 to-transparent 
                rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 blur
              `} />
              
              <div className="relative p-4 rounded-lg border border-border/50 bg-[#0A0A0F] overflow-hidden">
                {/* Mini sparkline graph */}
                <div className="absolute bottom-0 right-0 opacity-20">
                  <svg width="80" height="40" viewBox="0 0 80 40" className="text-primary">
                    <polyline
                      points={stat.graph.map((val, i) => {
                        const x = (i / (stat.graph.length - 1)) * 80;
                        const y = 40 - (val / Math.max(...stat.graph)) * 30;
                        return `${x},${y}`;
                      }).join(' ')}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      className={stat.color}
                    />
                  </svg>
                </div>

                {/* Animated cursor for active stat */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeStat"
                    className="absolute top-2 right-2 w-1 h-4 bg-primary/70 animate-pulse"
                  />
                )}

                {/* Stat content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`
                      p-2 rounded-lg bg-primary/5 
                      group-hover:bg-primary/10 transition-colors
                    `}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    {stat.trend && (
                      <span className="text-xs font-mono text-muted-foreground ml-auto">
                        {stat.trend}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl text-white font-mono font-bold tracking-tighter">
                        {stat.value}
                      </span>
                    </div>
                    
                    <div className="text-xs font-mono text-muted-foreground">
                      {stat.label}
                    </div>

                    {/* Progress bar (for stars/downloads) */}
                    {(index === 0 || index === 1) && (
                      <div className="mt-2 h-1 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: index === 0 
                              ? `${Math.min((repoStats?.stargazers_count || 0) / 1000, 100)}%`
                              : `${Math.min(totalDownloads / 10000, 100)}%`
                          }}
                          viewport={{ once: true }}
                          className={`h-full ${stat.color.replace('text', 'bg')}`}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Digital noise effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')] opacity-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Release download breakdown */}
        {releaseBreakdown.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 p-4 rounded-lg border border-border/30 bg-muted/20"
          >
            <div className="text-xs font-mono text-primary mb-3">$ release_stats --recent</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {releaseBreakdown.map((release) => (
                <div key={release.version} className="text-xs font-mono">
                  <div className="text-primary">{release.version}</div>
                  <div className="text-muted-foreground">
                    {release.downloads.toLocaleString()} downloads
                  </div>
                  <div className="text-muted-foreground/50 text-[10px]">{release.date}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System info footer */}
        <div className="mt-6 flex items-center justify-between font-mono text-xs border-t border-border/30 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">SYSTEM LOAD:</span>
              <span className="text-foreground">{systemLoad}%</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">UPTIME:</span>
              <span className="text-foreground">7d 13h</span>
            </div>
            <div className="flex items-center gap-1">
              <Network className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">PEERS:</span>
              <span className="text-foreground">3</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-3 bg-green-500/50 animate-pulse" />
            <span className="text-muted-foreground">STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  );
}