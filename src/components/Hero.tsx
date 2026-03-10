import { motion } from "framer-motion";
import { Download, BookOpen, Pin, Coffee, Zap } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export function Hero() {
  const [floatingNotes, setFloatingNotes] = useState<Array<{ id: number, x: number, y: number, rotation: number }>>([]);

  useEffect(() => {
    const notes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 20 - 10,
    }));
    setFloatingNotes(notes);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[800px]">
      {/* Background Pattern - Sticky Notes Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10 L30 5 L40 10 L40 30 L20 30 Z' fill='%233BB273' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Floating Sticky Notes (Animated) */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingNotes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute"
            initial={{ 
              left: `${note.x}%`, 
              top: `${note.y}%`,
              rotate: note.rotation,
              opacity: 0.1,
              scale: 0.5
            }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [note.rotation, note.rotation + 5, note.rotation],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8 + note.id,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              {/* Sticky Note */}
              <div className="w-24 h-24 bg-yellow-400/10 backdrop-blur-sm rounded-lg shadow-xl border border-yellow-400/20 rotate-2">
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-red-400/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4">
                  <Pin className="w-3 h-3 text-yellow-400/30 rotate-45" />
                </div>
                {/* Fake handwriting */}
                <div className="p-3 text-[8px] font-handwriting text-yellow-400/40">
                  fix bug...
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Never lose your{" "}
              <span className="relative">
                <span className="text-primary relative z-10">coding context</span>
                {/* Underline effect */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-1 left-0 h-3 bg-primary/20 -rotate-1 -z-10"
                />
              </span>{" "}
              again
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              iwashere remembers where you left off, so you don't have to. 
              <span className="block mt-2 font-handwriting text-primary/70 italic">
                (Goodbye, sticky notes)
              </span>
            </p>

            {/* Stats with sticky note design */}
            <div className="flex gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-yellow-400/5 rotate-3 rounded-lg" />
                <div className="relative text-sm font-mono text-muted-foreground">
                  <span className="text-primary font-bold">15min</span> saved daily
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-primary/5 -rotate-2 rounded-lg" />
                <div className="relative text-sm font-mono text-muted-foreground">
                  <span className="text-primary font-bold">∞</span> context switches
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <Download className="w-5 h-5 relative z-10" />
                <a href="https://github.com/Murchoid/iwashere/releases/latest" className="relative z-10">
                  Download Latest
                </a>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-border rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors group relative overflow-hidden"
              >
                <BookOpen className="w-5 h-5 group-hover:text-primary transition-colors" />
                <Link to="/documentation" className="group-hover:text-primary transition-colors">
                  View Documentation
                </Link>
                {/* Coffee stain effect on hover */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-700/10 rounded-full blur-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.button>
            </div>

            {/* Social proof with sticky note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-primary/50" />
                  </div>
                ))}
              </div>
              <span>Trusted by developers who hate context switching</span>
            </motion.div>
          </motion.div>

          {/* Right: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Sticky note attached to terminal */}
            <motion.div
              initial={{ rotate: -5, x: 20, y: -20 }}
              animate={{ rotate: -8, x: 30, y: -30 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 z-20"
            >
              <div className="relative">
                <div className="w-32 h-32 bg-yellow-400 rotate-6 rounded-lg shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-yellow-500/50" />
                  <div className="p-3">
                    <p className="text-xs font-handwriting text-amber-800">
                      Remember to check the auth middleware!
                    </p>
                    <Pin className="absolute -bottom-1 -right-1 w-4 h-4 text-amber-700 rotate-12" />
                  </div>
                </div>
              </div>
            </motion.div>

            <TerminalWindow />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-1" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}