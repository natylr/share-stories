import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated import
import './styles/index.css';
import './styles/auth.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

// Use createRoot from "react-dom/client"
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics
reportWebVitals();
