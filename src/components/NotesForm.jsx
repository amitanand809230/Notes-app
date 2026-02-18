import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNotes } from "../context/NotesContext";
import toast from "react-hot-toast";

const NoteForm = memo(() => {
  const { addNote } = useNotes();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    window.focusNoteTitle = () => {
      titleRef.current?.focus();
    };
  }, []);

  /* HANDLE INPUT CHANGE */

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /* VALIDATION */

  const validate = useCallback(() => {
    if (!form.title.trim()) return "Title is required";
    if (!form.content.trim()) return "Content is required";
    return "";
  }, [form]);

  /* HANDLE SUBMIT */

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationError = validate();
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

      setError("");
      setSubmitting(true);
      try {
        await addNote({
          title: form.title.trim(),
          content: form.content.trim(),
        });

        toast.success("Note added successfully");

        /* RESET FORM */

        setForm({ title: "", content: "" });
        setTimeout(() => {
          window.focusNoteTitle?.();
        }, 0);
      } catch (err) {
        console.error(err);
        setError("Failed to add note, Please try again.");
        toast.error("Failed to add note");
      } finally {
        setSubmitting(false);
      }
    },
    [form, addNote, validate],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounde shadow mb-6"
      noValidate
    >
      <label className="block text-sm font-medium mb-1"> Title</label>

      <input
        ref={titleRef}
        name="title"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        disabled={submitting}
        aria-invalid={!!error}
      />
      <label className="block text-sm font-medium mb-1">Content</label>

      <textarea
        name="content"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        disabled={submitting}
        aria-invalid={!!error}
      />

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded text-white transition ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {submitting ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
});

export default NoteForm;
