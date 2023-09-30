import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import CreateDOM from "react-dom/client";

// DOM ��Ҹ� ã�� ������ �Ҵ�
const rootElement = document.getElementById("root");

// rootElement�� null�� �ƴ� ��쿡�� ���ø����̼��� �������մϴ�.
if (rootElement) {
  const root = CreateDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Cannot find the 'root' element in the DOM.");
}
