import React from 'react';
import ReactDOM from 'react-dom'; // 수정
import App from './App'; // App 컴포넌트를 import



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
