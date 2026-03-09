import { motion } from "framer-motion";
import {
  GitBranch,
  Play,
  Share2,
  Monitor,
  RotateCw,
  Shield,
  AlarmClock,
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Git Integration",
    description: "Automatically captures branch and commit context",
  },
  {
    icon: Play,
    title: "Session Tracking",
    description: "Group related notes into work sessions with pause/resume",
  },
  {
    icon: Share2,
    title: "Team Sharing",
    description: "Encrypted note sharing with teammates",
  },
  {
    icon: Monitor,
    title: "Cross-Platform",
    description: "Works on Linux, macOS, and Windows",
  },
  {
    icon: RotateCw,
    title: "Self-Updating",
    description: "One command: iwashere update keeps you current",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays on your machine, encrypted for sharing",
  },
  {
    icon: AlarmClock,
    title: "Remind",
    description: "Set reminders on things you want to do later",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Built for Developers</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to never lose track of your work again
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-lg border border-border/50 backdrop-blur-sm"
              style={{
                background: 'var(--card)',
              }}
            >
              <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
