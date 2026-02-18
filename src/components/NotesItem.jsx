import { memo, useState } from "react";
import { useNotes } from "../context/NotesContext";
import EditNoteModal from "./EditNoteModal";
import toast from "react-hot-toast";

const NoteItem = memo(({ note }) => {
  const { deleteNote } = useNotes();

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;

    setDeleting(true);

    try {
      await deleteNote(note.id);
      toast.success("Note deleted");
      setTimeout(() => {
        window.focusNoteTitle?.();
      }, 0);
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow space-y-3">
        <div className="flex justify-between items-center gap-4">
          <h3 className="font-bold">{note.title}</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="text-green-600 font-semibold hover:text-green-800"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`font-semibold ${
                deleting ? "text-gray-400" : "text-red-600 hover:text-red-800"
              }`}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <p className="text-gray-600">{note.content}</p>
      </div>

      {showModal && (
        <EditNoteModal note={note} onClose={() => setShowModal(false)} />
      )}
    </>
  );
});

export default NoteItem;
