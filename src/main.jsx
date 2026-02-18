import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { NotesProvider } from "./context/NotesContext"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
      <Toaster position="top-right" />
    </NotesProvider>
  </React.StrictMode>
)
