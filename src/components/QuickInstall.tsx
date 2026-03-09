import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs"

const installCommands = {
  linux: {
    label: "Linux",
    commands: [
      "# Download the .deb package",
      "",
      "curl -L https://github.com/Murchoid/iwashere/releases/download/v0.2.10/iwashere_0.2.10_linux_amd64.deb -o iwashere.deb",
      "",
      "# Install",
      "sudo dpkg -i iwashere.deb",
      "",
      "# Verify",
      "iwashere --version"
    ],
  },
  macos: {
    label: "macOS",
    commands: [
      "# Add the tap",
      "brew tap Murchoid/homebrew-iwashere",
      "",
      "# Install",
      "brew install Murchoid/tap/iwashere",
      "",
      "# verify",
      "iwashere --version",
    ],
  },
  windows: {
    label: "Windows",
    commands: [
      "# Add the bucket",
      "scoop bucket add iwashere https://github.com/Murchoid/scoop-iwashere",
      "",
      "# Install",
      "scoop install iwashere",
      "",
      "# install",
      "iwashere --version",
    ],
  },
};

export function QuickInstall() {
  const [activeTab, setActiveTab] = useState("linux");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const commands = installCommands[activeTab as keyof typeof installCommands].commands;
    navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Quick Install</h2>
          <p className="text-xl text-muted-foreground">
            Get started in seconds on your platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            {/* Tab List */}
            <Tabs.List className="flex gap-2 mb-6 p-1 rounded-lg bg-muted/30 w-fit mx-auto">
              {Object.entries(installCommands).map(([key, { label }]) => (
                <Tabs.Trigger
                  key={key}
                  value={key}
                  className="px-6 py-2 rounded-md font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* Tab Content */}
            {Object.entries(installCommands).map(([key, { commands }]) => (
              <Tabs.Content key={key} value={key}>
                <div className="relative rounded-lg overflow-hidden border border-border/50 bg-[#0A0A0F]">
                  {/* Code Block Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#1A1B2F]/50 border-b border-border/30">
                    <span className="text-xs text-muted-foreground font-mono">
                      install.sh
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1 hover:bg-muted/20 rounded transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Code Block Content */}
                  <div className="p-6 font-mono text-sm">
                    {commands.map((line, index) => (
                      <div key={index} className="min-h-[1.5em]">
                        {line.startsWith("#") ? (
                          <span className="text-[#94A3B8]">{line}</span>
                        ) : (
                          <span className="text-[#E2E8F0]">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              See all installation methods →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
