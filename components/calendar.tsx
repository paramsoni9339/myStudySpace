"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <div className="w-full max-w-[350px] p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">Calendar</h3>
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {selectedDate.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className={cn(
          "w-full border-none bg-transparent",
          "rounded-md [&_.rdp-head_button]:text-slate-600 dark:[&_.rdp-head_button]:text-slate-400",
          "[&_.rdp-day_button]:text-sm [&_.rdp-day_button]:font-medium",
          "[&_.rdp-day_button:hover]:bg-slate-100 dark:[&_.rdp-day_button:hover]:bg-slate-800",
          "[&_.rdp-day_button.rdp-day_selected]:bg-blue-500 [&_.rdp-day_button.rdp-day_selected]:text-white",
          "[&_.rdp-day_button.rdp-day_selected]:hover:bg-blue-600"
        )}
      />
    </div>
  )
}
