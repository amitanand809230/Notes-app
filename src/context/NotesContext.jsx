import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const NotesContext = createContext()

const API = "http://localhost:3001/notes"

 export const NotesProvider = ( { children }) => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /* Fetch Notes */

    const fetchNotes = useCallback(async (signal) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(API, { signal })

            if(!res.ok) {
                throw new Error ('Failed to fetch notes')
            }
            const data = await res.json()
            setNotes(data)
        } catch (err) {
            if(err.name !== "AbortError") {
                console.error(err);
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }, [])

    /* ADD NOTES */

    const addNote = useCallback(async (note) => {
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(note)
            })
            if(!res.ok) {
                throw new Error ('Failed to add notes')
            }
            const data = await res.json()
            setNotes(prev => [...prev, data])
        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    },[])

    /* Delete Notes */

    const deleteNote = useCallback(async (id) => {
        try {
            const res = await fetch(`${API}/${id}`, {method: "DELETE"})
            if(!res.ok) {
                throw new Error('Failed to delete note')
            }
            setNotes( prev => prev.filter(note => note.id !== id))
        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    }, [])

      /* UPDATE NOTES */

      const updateNote = useCallback(async (id, updated) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updated)
            })
             if(!res.ok) {
                throw new Error('Failed to update note')
            }
            const data = await res.json()
            setNotes( prev => prev.map(n =>(n.id === id ? data: n)))
        } catch (err) {
            console.error(err)
            setError(err.message)
        }
      }, [])

      /* LOAD ON MOUNT */
    useEffect( () => {
        const controller = new AbortController()
        fetchNotes(controller.signal)
        return () => controller.abort()
    },[fetchNotes])

    /* MEMOIZED VALUE (IMPORTANT) */

    const value = useMemo(() => ({
        notes,
        loading,
        error,
        addNote,
        deleteNote,
        updateNote,
        refetch:fetchNotes
    }), [notes, loading, error, addNote, deleteNote, updateNote, fetchNotes])

    return (
        <NotesContext.Provider value = {value}>
            {children}
        </NotesContext.Provider>
    )

 }

 export const useNotes = () => useContext(NotesContext)