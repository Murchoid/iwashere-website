import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function TerminalWindow() {
  const [showCommand, setShowCommand] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const commandTimer = setTimeout(() => setShowCommand(true), 500);
    const outputTimer = setTimeout(() => setShowOutput(true), 1500);

    return () => {
      clearTimeout(commandTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Window Chrome */}
      <div className="rounded-lg overflow-hidden border border-border/50 bg-[#0A0A0F] shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1B2F]/50 border-b border-border/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">
            terminal
          </span>
        </div>

        {/* Terminal Content */}


        <div className="p-6 font-mono text-sm min-h-[300px]">

          {/* Command 1 */}
          <div className="mb-4">
            <span className="text-[#3BB273]">$ </span>
            {showCommand && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E2E8F0]"
              >
                iwashere session start "Implementing JWT auth"
              </motion.span>
            )}
          </div>

          {/* Command 2 */}
          <div className="mb-4">
            <span className="text-[#3BB273]">$ </span>
            {showCommand && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E2E8F0]"
              >
                iwashere add "Implementing JWT auth, stuck on token refresh" --session --tags fix
              </motion.span>
            )}
          </div>

          {/* Empty line */}
          <div className="mb-4"></div>

          {/* Command 3 */}
          {showOutput && (
            <>
              <div className="mb-4">
                <span className="text-[#3BB273]">$ </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#E2E8F0]"
                >
                  iwashere status
                </motion.span>
              </div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 text-[#E2E8F0]/90"
              >
                <div>

                  <div>iwashere status</div>
                  <div>=================</div>


                  <div>

                    <p>You were working on 'Implementing JWT auth' (2m ago)</p>
                    <p> Session ongoing</p>
                    <p>Last note: Implementing JWT auth, stuck on token refresh</p>

                  </div>

                  <div>
                    Modified files:
                    <ul>
                      <li>
                        • auth.ts
                      </li>
                    </ul>
                    Related notes from this session:
                    └─ 1m ago - Implementing JWT auth, stuck on token refresh

                    What's next?
                    <ul>
                      <li>
                        • Add a note: iwashere add "next task"
                      </li>
                      <li>
                        • End session: iwashere session end
                      </li>
                      <li>
                        • View all notes: iwashere list
                      </li>
                    </ul>
                    
                  </div>
            </div>
              </motion.div>

              {/* Cursor */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#3BB273] ml-1 mt-4"
              />
            </>
          )}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary rounded-full" />
      </div>
    </div>
  );
}
