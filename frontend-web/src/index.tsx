import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import CreateDOM from 'react-dom/client';

// DOM 요소를 찾아 변수에 할당
const rootElement = document.getElementById('root');

// rootElement가 null이 아닌 경우에만 애플리케이션을 렌더링합니다.
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
