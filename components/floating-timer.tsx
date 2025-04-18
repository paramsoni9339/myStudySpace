"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Clock, GripHorizontal } from "lucide-react"

export default function FloatingTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const timerRef = useRef(null)
  const dragRef = useRef(null)

  // Timer logic
  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval)
            setIsActive(false)
            // Play sound or notification here
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && dragRef.current) {
        setPosition({
          x: e.clientX - dragRef.current.offsetWidth / 2,
          y: e.clientY - dragRef.current.offsetHeight / 2,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    dragRef.current = timerRef.current
  }

  const formatTime = (min, sec) => {
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={timerRef}
      className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl p-4 border border-white/20 dark:border-slate-700/20 w-full"
      style={isDragging ? { position: "fixed", left: position.x, top: position.y, zIndex: 50 } : {}}
    >
      <div className="flex items-center justify-between mb-3 cursor-move" onMouseDown={handleMouseDown}>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">Timer</h3>
        </div>
        <GripHorizontal className="h-4 w-4 text-slate-400" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-slate-800 dark:text-white mb-4">{formatTime(minutes, seconds)}</div>

        <div className="grid grid-cols-2 gap-2 mb-4 w-full">
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Minutes</label>
            <Input
              type="number"
              min="0"
              max="60"
              value={minutes}
              onChange={(e) => setMinutes(Number.parseInt(e.target.value) || 0)}
              disabled={isActive}
              className="h-8"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Seconds</label>
            <Input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Number.parseInt(e.target.value) || 0)}
              disabled={isActive}
              className="h-8"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={toggleTimer}
            variant="outline"
            size="sm"
            className={
              isActive
                ? "bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/30 dark:hover:bg-rose-900/50"
                : "bg-teal-100 text-teal-600 border-teal-200 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800/30 dark:hover:bg-teal-900/50"
            }
          >
            {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            size="sm"
            className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
