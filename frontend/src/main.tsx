import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./App";
import "./index.css";
import api from '../../backend/api/generated/ClientAPI';

api.$baseURL = '/api/v1';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
