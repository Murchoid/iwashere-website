import { AlarmClock, GitBranch, Monitor, Play, RotateCw, Share2, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: GitBranch,
    title: "Git Integration",
    description: "Automatically captures branch and commit context",
    filename: "git-integration.ts",
    code: "iwashere add 'fix bug' --auto-git",
  },
  {
    icon: Play,
    title: "Session Tracking",
    description: "Group related notes into work sessions with pause/resume",
    filename: "sessions.ts",
    code: "iwashere session start 'feature'",
  },
  {
    icon: Share2,
    title: "Team Sharing",
    description: "Encrypted note sharing with teammates",
    filename: "sharing.enc",
    code: "iwashere share 123 --with alice",
  },
  {
    icon: Monitor,
    title: "Cross-Platform",
    description: "Works on Linux, macOS, and Windows",
    filename: "install.sh",
    code: "curl iwashere.dev | bash",
  },
  {
    icon: RotateCw,
    title: "Self-Updating",
    description: "One command keeps you current",
    filename: "update.go",
    code: "iwashere update",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays encrypted on your machine",
    filename: "private.key",
    code: "aes-256-gcm",
  },
  {
    icon: AlarmClock,
    title: "Reminders",
    description: "Set reminders on things you want to do later",
    filename: "reminder.cron",
    code: "iwashere remind 123 --at '9am'",
  },
];

export function FeatureGrid() {
  return (
    <section id= "features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background "code rain" effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="font-mono text-xs text-primary/30 whitespace-pre">
          {Array(50).fill('>_').join(' ')}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header as terminal output */}
        <div className="mb-16 font-mono">
          <div className="text-primary mb-2">$ cat features.md</div>
          <h2 className="text-4xl font-bold mb-4">Built for Developers</h2>
          <p className="text-xl text-muted-foreground border-l-4 border-primary pl-4">
            Everything you need to never lose track of your work again
          </p>
        </div>

        {/* Features as terminal processes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Process line */}
              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-primary/20">
                {/* Process indicator */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                  <div className="w-px h-8 bg-border" />
                </div>
                
                {/* Process details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">PID: {1000 + index}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary/80">
                      running
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                  
                  {/* Resource usage (visual flair) */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                    <span>CPU: {20 + index * 5}%</span>
                    <span>MEM: {15 + index * 3}MB</span>
                    <span>↑ {index * 2 + 1}kbps</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System stats footer */}
        <div className="mt-12 p-4 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm">
          <div className="flex justify-between items-center">
            <span className="text-primary">$ systemctl status iwashere</span>
            <span className="text-green-500">● active (running)</span>
          </div>
          <div className="mt-2 text-muted-foreground text-xs">
            {features.length} processes running • uptime 7d • memory usage 42MB
          </div>
        </div>
      </div>
    </section>
  );
}