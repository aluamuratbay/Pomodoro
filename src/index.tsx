import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { loadMessages } from "devextreme/localization";
import ruMessages from "./locales/ru.json";
import enMessages from "./locales/en.json";
import AppState from './store/AppState';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

loadMessages({
  Russian: ruMessages,
  English: enMessages,
});

root.render(
  <AppState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppState>
);