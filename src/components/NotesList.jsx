import { memo, useMemo } from "react";
import { useNotes } from "../context/NotesContext";
import NotesItem from "./NotesItem";
import NoteSkeleton from "./NotesSkeleton";

const NotesList = memo( ()=> {
    const { notes, loading, error,hasLoaded } = useNotes()

    /* MEMOIZED NOTES LIST */

    const renderedNotes = useMemo(() => {
        if (!Array.isArray(notes)) return null
        return notes.map(note => (
            <NotesItem key={note.id} note={note}/>
        ))
    },[notes])

    /* LOADING STATE */

    if(!hasLoaded || loading) {
        return (
            <div
            role="status" 
            className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                     <NoteSkeleton key={i} />
                ))}
            </div>
        )
    }

    /* ERROR STATE */

    if(error) {
        return (
            <div className="text-red-500 text-center">
                Failed to load notes. Try again.
            </div>
        )
    }

    /* EMPTY STATE */
    if(!notes?.length) {
        return (
            <div className="text-gray-500 text-center py-6">
                No notes yet, Create your first notes.
            </div>
        )
    }
    /* LIST RENDER */
    return (
    <div 
    role="list"
    aria-label="NotesList"
    className="space-y-3">
        { renderedNotes }
    </div>
)
})

export default NotesList