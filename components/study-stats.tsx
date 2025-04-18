"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StudyStats {
  totalTime: number
  sessionsCompleted: number
  dailyGoalMet: number
  weeklyStats: number[]
}

export default function StudyStats() {
  const [stats, setStats] = useState<StudyStats>({
    totalTime: 0,
    sessionsCompleted: 0,
    dailyGoalMet: 0,
    weeklyStats: [0, 0, 0, 0, 0, 0, 0]
  })

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('study-stats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  return (
    <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg border-white/20 dark:border-slate-700/20">
      <CardHeader>
        <CardTitle>Study Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <h4 className="text-2xl font-bold">{stats.totalTime}h</h4>
            <p className="text-sm text-muted-foreground">Total Study Time</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold">{stats.sessionsCompleted}</h4>
            <p className="text-sm text-muted-foreground">Sessions Complete</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold">{stats.dailyGoalMet}%</h4>
            <p className="text-sm text-muted-foreground">Daily Goals Met</p>
          </div>
        </div>
        
        {/* Add weekly progress chart here using react-chartjs-2 */}
      </CardContent>
    </Card>
  )
}
