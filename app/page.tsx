"use client"

import { useState, useEffect } from "react"
import AnalogClock from "@/components/analog-clock"
import Calendar from "@/components/calendar"
import FloatingTimer from "@/components/floating-timer"
import Notes from "@/components/notes"
import Tasks from "@/components/tasks"
import VideoEmbed from "@/components/video-embed"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">StudySpace</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              {/* Clock Section */}
              <section className="flex justify-center">
                <AnalogClock />
              </section>

              {/* Calendar Section */}
              <section className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20 dark:border-slate-700/20">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Calendar</h2>
                <Calendar />
              </section>

              {/* Video Embed Section */}
              <section className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20 dark:border-slate-700/20">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Study Material</h2>
                <VideoEmbed />
              </section>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col gap-6">
              {/* Tasks Section */}
              <Tasks />
              
              {/* Floating Timer */}
              <FloatingTimer />

              {/* Notes Section */}
              <section className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20 dark:border-slate-700/20 h-[500px]">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">My Notes</h2>
                <Notes />
              </section>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} StudySpace. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
