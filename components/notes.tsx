"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Trash } from "lucide-react"

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ id: null, content: "" })

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("studyNotes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studyNotes", JSON.stringify(notes))
  }, [notes])

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
      createdAt: new Date().toISOString(),
    }

    setNotes([...notes, newNote])
    setCurrentNote(newNote)
  }

  const saveNote = () => {
    if (!currentNote.id) return

    setNotes(notes.map((note) => (note.id === currentNote.id ? { ...note, content: currentNote.content } : note)))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (currentNote.id === id) {
      setCurrentNote({ id: null, content: "" })
    }
  }

  const selectNote = (note) => {
    setCurrentNote(note)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCurrentNote({ ...currentNote, content: newValue })
    localStorage.setItem("studyNotes", JSON.stringify(notes.map((note) => (note.id === currentNote.id ? { ...note, content: newValue } : note))))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={createNewNote}
          className="text-teal-600 border-teal-200 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-800/30 dark:hover:bg-teal-900/30"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Note
        </Button>

        {currentNote.id && (
          <Button
            variant="outline"
            size="sm"
            onClick={saveNote}
            className="text-slate-600 border-slate-200 hover:bg-slate-50 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 h-full">
        {/* Notes List */}
        <div className="w-full md:w-1/3 bg-white/50 dark:bg-slate-900/50 rounded-xl p-2 overflow-y-auto max-h-[150px] md:max-h-full">
          {notes.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No notes yet. Create one!</p>
          ) : (
            <ul className="space-y-1">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className={`p-2 rounded-lg text-sm cursor-pointer flex justify-between items-center group
                    ${
                      currentNote.id === note.id
                        ? "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  onClick={() => selectNote(note)}
                >
                  <div className="truncate flex-1">
                    <p className="font-medium truncate">{note.content.split("\n")[0] || "Untitled Note"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(note.createdAt)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNote(note.id)
                    }}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Note Editor */}
        <div className="flex-1 bg-white/50 dark:bg-slate-900/50 rounded-xl p-2 overflow-hidden">
          <Textarea
            placeholder="Write your notes here..."
            className="h-full resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-800 dark:text-slate-200"
            value={currentNote.content || ""}
            onChange={handleNotesChange}
            disabled={!currentNote.id}
          />
        </div>
      </div>
    </div>
  )
}
