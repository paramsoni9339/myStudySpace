"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnalogClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const seconds = time.getSeconds().toString().padStart(2, "0")

  const DigitGroup = ({ value, shouldAnimate = false }: { value: string, shouldAnimate?: boolean }) => (
    <div className="relative w-[60px] h-[80px] bg-slate-800/80 dark:bg-slate-200/10 rounded-lg backdrop-blur-md flex items-center justify-center overflow-hidden">
      {shouldAnimate ? (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute text-4xl font-bold text-white dark:text-slate-200"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="text-4xl font-bold text-white dark:text-slate-200">
          {value}
        </span>
      )}
    </div>
  )

  const Separator = () => (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="mx-2 text-4xl font-bold text-slate-600 dark:text-slate-400"
    >
      :
    </motion.div>
  )

  return (
    <div className="relative p-12">
      {/* Background Effects */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 20%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex items-center justify-center bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <DigitGroup value={hours[0]} />
            <DigitGroup value={hours[1]} />
          </div>
          <Separator />
          <div className="flex gap-1">
            <DigitGroup value={minutes[0]} />
            <DigitGroup value={minutes[1]} />
          </div>
          <Separator />
          <div className="flex gap-1">
            <DigitGroup value={seconds[0]} shouldAnimate />
            <DigitGroup value={seconds[1]} shouldAnimate />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
