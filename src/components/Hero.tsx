import { motion } from "framer-motion";
import { Download, BookOpen } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 178, 115, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 178, 115, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

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
              <span className="text-primary">coding context</span> again
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              iwashere remembers where you left off, so you don't have to. One
              command to save your context, one command to restore it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Download className="w-5 h-5" />
                Download v0.2.10
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-border rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
