import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, Check, Terminal, Cpu, Apple, AppWindowIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

const installCommands = {
  linux: {
    label: "Linux",
    icon: Cpu,
    prompt: "user@devbox:~$",
    distros: ["Debian/Ubuntu", "Fedora/RHEL", "Arch"],
    commands: [
      "curl -L https://github.com/Murchoid/iwashere/releases/download/v0.2.10/iwashere_0.2.10_linux_amd64.deb -o iwashere.deb",
      "sudo dpkg -i iwashere.deb",
      "iwashere --version"
    ],
    output: [
      "iwashere version v0.2.10 (commit: a1b2c3d)",
      "  built with go1.21.0",
      "  on linux/amd64"
    ]
  },
  macos: {
    label: "macOS",
    icon: Apple,
    prompt: "user@macbook ~ %",
    distros: ["Intel", "Apple Silicon"],
    commands: [
      "brew tap Murchoid/homebrew-iwashere",
      "brew install Murchoid/tap/iwashere",
      "iwashere --version"
    ],
    output: [
      "iwashere version v0.2.10 (commit: a1b2c3d)",
      "  built with go1.21.0",
      "  on darwin/arm64"
    ]
  },
  windows: {
    label: "Windows",
    icon: AppWindowIcon,
    prompt: "PS C:\\Users\\dev>",
    distros: ["PowerShell", "Scoop", "Winget"],
    commands: [
      "scoop bucket add iwashere https://github.com/Murchoid/scoop-iwashere",
      "scoop install iwashere",
      "iwashere --version"
    ],
    output: [
      "iwashere version v0.2.10 (commit: a1b2c3d)",
      "  built with go1.21.0",
      "  on windows/amd64"
    ]
  }
};

export function QuickInstall() {
  const [activeTab, setActiveTab] = useState("linux");
  const [copied, setCopied] = useState(false);
  const [typing, setTyping] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  
  const currentOS = installCommands[activeTab as keyof typeof installCommands];

  // Simulate terminal typing effect
  useEffect(() => {
    setTyping(true);
    setVisibleLines(0);
    
    const totalLines = currentOS.commands.length;
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
  }, [activeTab]);

  const handleCopy = () => {
    const fullCommand = [
      ...currentOS.commands,
      "",
      "# Output:",
      ...currentOS.output
    ].join("\n");
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background "code rain" effect */}
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
            <div className="flex px-2">
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

                 {/* Copy button */}
            <div className="relative top-0 right-0">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-muted/20 rounded transition-colors group"
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
              <span>OS: {currentOS.label}</span>
              <span>•</span>
              <span>Arch: {currentOS.label === 'macOS' ? 'arm64/intel' : 'amd64'}</span>
              <span>•</span>
              <span>Available: {currentOS.distros.join(', ')}</span>
            </div>

            {/* Interactive installation */}
            <div className="space-y-1 py-2">
              {currentOS.commands.map((cmd, index) => (
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
                  <span className="text-foreground">{cmd}</span>
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
                {currentOS.output.map((line, index) => (
                  <div key={index} className="text-muted-foreground/80 text-xs pl-4">
                    {line}
                  </div>
                ))}
              </motion.div>
            )}

          </div>

          {/* Terminal status bar */}
          <div className="px-4 py-1.5 bg-[#0F0F17] border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                iwashere ready
              </span>
              <span>v0.2.10</span>
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