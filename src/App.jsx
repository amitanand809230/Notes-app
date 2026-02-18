import "./App.css";
import Footer from "./components/Footer";
import NoteForm from "./components/NotesForm";
import NotesList from "./components/NotesList";

function App() {
  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">

      {/* ===== CONTAINER ===== */}
      <div className="max-w-7xl mx-auto">

        {/* ===== HEADER ===== */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Notes Manager
          </h1>
          <p className="text-gray-500 mt-2">
            Organize your thoughts quickly and efficiently
          </p>
        </header>

        {/* ===== MAIN GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* ===== FORM CARD ===== */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Note
            </h2>
            <NoteForm />
          </div>

          {/* ===== NOTES LIST CARD ===== */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Your Notes
            </h2>
            <NotesList />
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
