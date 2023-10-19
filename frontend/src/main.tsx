import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import api from '../../backend/api/generated/ClientAPI';

api.$baseURL = '/api/v1';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
