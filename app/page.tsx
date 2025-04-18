"use client";

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import AnalogClock from "@/components/analog-clock"  
import Calendar from "@/components/calendar"         
import VideoEmbed from "@/components/video-embed"   
import Tasks from "@/components/tasks"             
import FloatingTimer from "@/components/floating-timer" 
import Notes from "@/components/notes"              
import { BackgroundPaths } from "@/components/BackgroundPaths" 
import StudySpaceAI from "@/components/study-space-ai"
import { GlowingBackground } from "@/components/ui/glow-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <BackgroundPaths title="StudySpace" />
      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">StudySpace</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {/* Clock Section */}
                <section id="clock-section" className="relative flex justify-center">
                  <AnalogClock />
                </section>

                {/* Calendar Section */}
                <section className="relative backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden">
                  <GlowingBackground />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Calendar</h2>
                    <Calendar />
                  </div>
                </section>

                {/* Video Embed Section */}
                <section className="relative backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden">
                  <GlowingBackground />
                  <div className="relative z-10">
                    <VideoEmbed />
                  </div>
                </section>

                {/* StudySpaceAI Section */}
                <section className="relative backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden">
                  <GlowingBackground />
                  <div className="relative z-10">
                    <StudySpaceAI />
                  </div>
                </section>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="flex flex-col gap-6">
                {/* Tasks Section */}
                <section className="relative backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden">
                  <GlowingBackground />
                  <div className="relative z-10">
                    <Tasks />
                  </div>
                </section>
                
                {/* Floating Timer */}
                <section className="relative">
                  <FloatingTimer />
                </section>

                {/* Notes Section */}
                <section className="relative backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6 overflow-hidden h-[500px]">
                  <GlowingBackground />
                  <div className="relative z-10 h-full">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">My Notes</h2>
                    <Notes />
                  </div>
                </section>
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} StudySpace. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
