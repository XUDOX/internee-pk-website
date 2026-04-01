import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Note: I changed this to a default import to match how we exported App.tsx!
import "./index.css"; // Make sure your Tailwind CSS file is imported here!

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);