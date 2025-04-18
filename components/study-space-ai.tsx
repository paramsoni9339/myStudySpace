"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function StudySpaceAI() {
  const [activeAI, setActiveAI] = useState<"youai" | "blackbox" | null>(null)

  return (
    <div className="space-y-4">
      {/* Button Controls */}
      <div className="flex gap-4">
        <Button
          variant={activeAI === "youai" ? "default" : "outline"}
          onClick={() => setActiveAI("youai")}
          className="flex-1 h-12 text-lg"
        >
          YouAI
        </Button>
        <Button
          variant={activeAI === "blackbox" ? "default" : "outline"}
          onClick={() => setActiveAI("blackbox")}
          className="flex-1 h-12 text-lg"
        >
          BlackBox
        </Button>
      </div>

      {/* AI Display Container */}
      <div className="w-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-900/50">
        {activeAI ? (
          <iframe
            src={activeAI === "youai" ? "https://you.com" : "https://www.blackbox.ai"}
            className="w-full h-[800px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          />
        ) : (
          <div className="w-full h-[800px] flex items-center justify-center">
            <p className="text-lg text-slate-500">Select an AI assistant to begin</p>
          </div>
        )}
      </div>
    </div>
  )
}