import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Copy, Check, Terminal, Cpu, Apple, AppWindowIcon, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getLatestVersion } from "#/services/useFetchGitInfo";
import type { ReleaseAsset } from "#/api/api";


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

const getVersionInfo = (tagName: string) => {
  const version = tagName.startsWith('v') ? tagName : `v${tagName}`;
  const commit = "latest"; 
  return { version, commit };
};

const installCommands = {
  linux: {
    label: "Linux",
    icon: Cpu,
    prompt: "user@devbox:~$",
    distros: ["Debian/Ubuntu", "Fedora/RHEL", "Arch"],
    getCommands: (version: string, commit: string) => [
      `curl -L https://github.com/Murchoid/iwashere/releases/download/${version}/iwashere_${version.replace("v", "")}_linux_amd64.deb -o iwashere.deb`,
      "sudo dpkg -i iwashere.deb",
      "iwashere version"
    ],
    getOutput: (version: string, commit: string, arch: string = "linux/amd64") => [
      `iwashere version ${version} (commit: ${commit})`,
      "  built with go1.21.0",
      `  on ${arch}`
    ]
  },
  macos: {
    label: "macOS",
    icon: Apple,
    prompt: "user@macbook ~ %",
    distros: ["Intel", "Apple Silicon"],
    getCommands: () => [
      "brew tap Murchoid/homebrew-iwashere",
      "brew install Murchoid/tap/iwashere",
      "iwashere version"
    ],
    getOutput: (version: string, commit: string, arch: string = "darwin/arm64") => [
      `iwashere version ${version} (commit: ${commit})`,
      "  built with go1.21.0",
      `  on ${arch}`
    ]
  },
  windows: {
    label: "Windows",
    icon: AppWindowIcon,
    prompt: "PS C:\\Users\\dev>",
    distros: ["PowerShell", "Scoop", "Winget"],
    getCommands: () => [
      "scoop bucket add iwashere https://github.com/Murchoid/scoop-iwashere",
      "scoop install iwashere",
      "iwashere version"
    ],
    getOutput: (version: string, commit: string, arch: string = "windows/amd64") => [
      `iwashere version ${version} (commit: ${commit})`,
      "  built with go1.21.0",
      `  on ${arch}`
    ]
  }
};

export function QuickInstall() {
  const [activeTab, setActiveTab] = useState("linux");
  const [copied, setCopied] = useState(false);
  const [typing, setTyping] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const { data: releaseData, isLoading, error } = getLatestVersion() 

  // Memoize version info and commands based on release data
  const versionInfo = useMemo(() => {
    if (!releaseData?.tag_name) return { version: "v0.3.2", commit: "7021b8785e62f" };
    return getVersionInfo(releaseData.tag_name);
  }, [releaseData]);

  const currentOS = installCommands[activeTab as keyof typeof installCommands];
  
  const currentCommands = useMemo(() => {
    return currentOS.getCommands(versionInfo.version, versionInfo.commit);
  }, [currentOS, versionInfo]);

  const currentOutput = useMemo(() => {
    const arch = activeTab === 'macos' ? 'darwin/arm64' : `${activeTab}/amd64`;
    return currentOS.getOutput(versionInfo.version, versionInfo.commit, arch);
  }, [currentOS, versionInfo, activeTab]);

  const downloadUrls = useMemo(() => {
    if (!releaseData?.assets) return { linux: "#", macos: "#", windows: "#" };
    console.log(releaseData.tag_name)
    return {
      linux: getDownloadUrl(releaseData.assets, "linux"),
      macos: getDownloadUrl(releaseData.assets, "macos"),
      windows: getDownloadUrl(releaseData.assets, "windows")
    };
  }, [releaseData]);

  // Simulate terminal typing effect
  useEffect(() => {
    setTyping(true);
    setVisibleLines(0);

    const totalLines = currentCommands.length;
    let line = 0;
    
    const interval = setInterval(() => {
      if (line < totalLines) {
        setVisibleLines(prev => prev + 1);
        line++;
      } else {
        clearInterval(interval);
        setTyping(false);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, [activeTab, currentCommands]);

  const handleCopy = () => {
    const fullCommand = [
      ...currentCommands,
      "",
      "# Output:",
      ...currentOutput
    ].join("\n");
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (url: string) => {
    if (url && url !== "#") {
      window.open(url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <section id="install" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">Loading latest version information...</div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Failed to load release info:", error);
  }

  return (
    <section id="install" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="font-mono text-xs text-primary/30 whitespace-pre select-none">
          {Array(30).fill('./install.sh').join(' │ ')}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header as terminal command */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 font-mono"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <Terminal className="w-5 h-5" />
            <span>$ cat install.sh</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 ml-7">Quick Install</h2>
          <p className="text-xl text-muted-foreground ml-7 border-l-2 border-primary/30 pl-4">
            Get started in seconds on your platform
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden border border-border/50 bg-[#0A0A0F] shadow-2xl"
        >
          {/* Terminal Header - OS Tabs integrated */}
          <div className="border-b border-border/30 bg-[#0F0F17]">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">
                {currentOS.prompt}
              </span>
            </div>
            
            {/* OS Tabs */}
            <div className="flex px-2 justify-between items-center">
              <div className="flex">
                {Object.entries(installCommands).map(([key, { label, icon: Icon }]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
                      flex items-center gap-2 px-4 py-2 text-sm font-mono transition-all
                      ${activeTab === key 
                        ? 'text-primary border-b-2 border-primary bg-primary/5' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {activeTab === key && (
                      <span className="w-1 h-4 bg-primary/50 animate-pulse ml-1" />
                    )}
                  </button>
                ))}
              </div>

              {/* Copy button */}
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-muted/20 rounded transition-colors group mr-2"
                  title="Copy install commands"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-1">
            {/* System info line */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground/50 pb-3 border-b border-border/20">
              <span>Version: {versionInfo.version}</span>
              <span>•</span>
              <span>OS: {currentOS.label}</span>
              <span>•</span>
              <span>Arch: {currentOS.label === 'macOS' ? 'arm64/intel' : 'amd64'}</span>
              <span>•</span>
              <span>Available: {currentOS.distros.join(', ')}</span>
            </div>

            {/* Interactive installation */}
            <div className="space-y-1 py-2">
              {currentCommands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: index < visibleLines ? 1 : 0,
                    x: index < visibleLines ? 0 : -10
                  }}
                  className="flex items-start gap-2"
                >
                  <span className="text-primary select-none">$</span>
                  <span className="text-white">{cmd}</span>
                  {index === visibleLines - 1 && typing && (
                    <span className="w-2 h-4 bg-primary/70 animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Command output */}
            {!typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-border/30"
              >
                <div className="text-xs text-muted-foreground mb-2"># Output:</div>
                {currentOutput.map((line, index) => (
                  <div key={index} className="text-muted-foreground/80 text-xs pl-4">
                    {line}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Download Buttons Section */}
          <div className="px-6 pb-4 pt-2 border-t border-border/30 bg-[#0F0F17]/50">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <Download className="w-3 h-3" />
                <span>Direct Downloads:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(downloadUrls).map(([os, url]) => {
                  const Icon = installCommands[os as keyof typeof installCommands]?.icon;
                  return (
                    <button
                      key={os}
                      onClick={() => handleDownload(url)}
                      disabled={url === "#"}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all
                        ${url !== "#" 
                          ? 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50' 
                          : 'bg-muted/10 text-muted-foreground cursor-not-allowed border border-border/30'
                        }
                      `}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>Download for {installCommands[os as keyof typeof installCommands]?.label}</span>
                      {url !== "#" && <Download className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-muted-foreground/50 font-mono mt-1">
                ⚡ Latest version {versionInfo.version} from GitHub Releases
              </div>
            </div>
          </div>

          {/* Terminal status bar */}
          <div className="px-4 py-1.5 bg-[#0F0F17] border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                iwashere ready
              </span>
              <span>{versionInfo.version}</span>
            </div>
            <span className="font-mono">━━━━━━━━━━━━━━━━━━━━ 100%</span>
          </div>
        </motion.div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 font-mono text-sm"
        >
          <span className="text-muted-foreground">$ </span>
          <Link
            to="/documentation/installation"
            className="text-primary hover:underline hover:text-primary/80 transition"
          >
            See all installation methods
          </Link>
          <span className="text-muted-foreground animate-pulse ml-1">_</span>
        </motion.div>
      </div>
    </section>
  );
}