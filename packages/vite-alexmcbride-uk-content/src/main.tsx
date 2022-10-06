import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

polyfillCountryFlagEmojis();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
