import { motion } from "framer-motion";
import { Star, Download, Tag, Users, Activity, Cpu, HardDrive, Network } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { 
    icon: Star, 
    label: "GitHub Stars", 
    value: "0",
    color: "text-yellow-500",
    graph: [4, 6, 8, 7, 10, 9, 12, 14, 16, 18, 20, 19],
  },
  { 
    icon: Download, 
    label: "Downloads", 
    value: "0",
    color: "text-green-500",
    graph: [120, 250, 380, 420, 560, 680, 750, 890, 1020, 1150, 1280, 1420],
  },
  { 
    icon: Tag, 
    label: "Latest Version", 
    value: "v0.2.10",
    color: "text-blue-500",
    graph: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
  },
  { 
    icon: Users, 
    label: "Contributors", 
    value: "1",
    color: "text-purple-500",
    graph: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
];

export function StatsBar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [systemLoad, setSystemLoad] = useState(42);

  // Simulate changing system load
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(Math.floor(Math.random() * 30) + 30);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border/50  relative overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Terminal header */}
        <div className="text-primary mt-12 mb-10 p-4 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm">
          <span>$ system_monitor --stats</span>
          <span className="ml-2">iwashere</span>
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
                        const x = 0/*(i / (stat.graph.length - 1)) * 80;*/
                        const y = 0/*40 - (val / Math.max(...stat.graph)) * 30*/;
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
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-mono font-bold tracking-tighter">
                        {stat.value}
                      </span>
                      <span className="text-xs font-mono text-primary/70">
                        {index === 0 ? '0' : index === 1 ? '0' : ''}
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
                          whileInView={{ width: index === 0 ? '0%' : '0%' }}
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

      <style >{`
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
