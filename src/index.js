import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode> // 2回useEffectが行われる要因のため、ひとまず行わない
    <App />
  //</React.StrictMode>
);
