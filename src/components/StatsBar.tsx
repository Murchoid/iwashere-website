import { motion } from "framer-motion";
import { Star, Download, Tag, Users } from "lucide-react";

const stats = [
  { icon: Star, label: "GitHub Stars", value: "0" },
  { icon: Download, label: "Downloads", value: "0" },
  { icon: Tag, label: "Latest Version", value: "v0.2.10" },
  { icon: Users, label: "Contributors", value: "0" },
];

export function StatsBar() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-3 flex justify-center">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
