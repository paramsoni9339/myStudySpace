"use client"

import { motion } from "framer-motion"

export function GlowingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <motion.div
        animate={{
          opacity: [0.5, 0.3, 0.5],
          scale: [1, 1.1, 1],
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -inset-[100%] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
      />
    </div>
  )
}