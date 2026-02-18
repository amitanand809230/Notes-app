import { useEffect, useState, useRef, useLayoutEffect, memo, useCallback } from "react";
import { useNotes } from "../context/NotesContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";


const EditNoteModal = memo(({ note, onClose }) => {
  const { updateNote } = useNotes();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving] = useState(false);

  const titleInputRef = useRef(null);

   /* FOCUS INPUT WHEN MODAL OPENS */

  useLayoutEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  /* ⭐ CENTRAL CLOSE HANDLER */
  const handleClose = useCallback( () => {
    onClose();

    /* RESTORE FOCUS AFTER MODAL UNMOUNT */

    setTimeout(() => {
      window.focusNoteTitle?.();
    }, 0);
  },[onClose]);

  /* CLOSE ON ESC KEY */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  {
    /* SAVE UPDATE */
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Fields cannot be empty");
      return;
    }

    setSaving(true);

    try {
      await updateNote(note.id, {
        ...note,
        title,
        content,
      });

      toast.success("Note updated successfully");
      handleClose();
    } catch (err) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  return (
     <AnimatePresence>
    <motion.div
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4"
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
   
        <h2 className="text-xl font-bold">Edit Note</h2>

        <input
          ref={titleInputRef}
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 text-white rounded ${
              saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
         </motion.div>
    </motion.div>
  </AnimatePresence>
  );
});

export default EditNoteModal;
