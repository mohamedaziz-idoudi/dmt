import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
window.onload = function() {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

