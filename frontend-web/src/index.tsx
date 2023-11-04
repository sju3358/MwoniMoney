import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import CreateDOM from "react-dom/client";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = CreateDOM.createRoot(rootElement);

  root.render(
    // <React.StrictMode>
    <Router>
      <App />
    </Router>
    // </React.StrictMode>
  );
} else {
  console.error("Cannot find the 'root' element in the DOM.");
}
