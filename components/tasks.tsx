"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, X, Circle, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  priority?: 'low' | 'medium' | 'high'
}

export default function Tasks() {
  // Load tasks from localStorage on component mount
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [newTask, setNewTask] = useState("")

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setTasks([
      {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
      },
      ...tasks
    ])
    setNewTask("")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Get stats for the header
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="w-full p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">Tasks</h3>
          <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{pendingTasks} pending</span>
            <span>•</span>
            <span>{completedTasks} completed</span>
          </div>
        </div>
        <Clock className="h-5 w-5 text-slate-400" />
      </div>

      <form onSubmit={addTask} className="relative flex gap-2 mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/50 dark:bg-slate-900/50 pr-10"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost"
          className="absolute right-0 top-0 h-full"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>

      <div className="space-y-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                <span className={cn(
                  "flex-1 text-sm text-slate-700 dark:text-slate-200 transition-colors duration-200",
                  task.completed && "line-through text-slate-400 dark:text-slate-500"
                )}>
                  {task.text}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-1"
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-4">
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  )
}
