import { motion } from "framer-motion"

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div>
            <div className="flex items-center gap-3 select-none">
              {/* Terminal prompt + commit marker */}
              <div className="flex items-center gap-2">
                <span className="text-[#3BB273] font-mono text-xl">$</span>
                <span className="w-3 h-3 rounded-full bg-[#3BB273]" />
              </div>

              {/* Logo text */}
              <div className="flex flex-col leading-tight">
                <span className="text-logo font-semibold text-xl tracking-tight">
                  iwashere
                </span>
              </div>

            </div>
              <span className="text-gray-400 text-sm font-mono">
                  Commit context, not code
              </span>
              <div className="h-[3px] w-12 bg-[#3BB273] mt-1 rounded" />
            </div>
          </motion.div>
    )
}