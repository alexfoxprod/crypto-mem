import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from "./pages/MainPage";
import "./App.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

