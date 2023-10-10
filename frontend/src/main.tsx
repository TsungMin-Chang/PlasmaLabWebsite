import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// wrap the whole app in StrictMode to get warnings about antipatterns
// wrap the whole app in context providers so the whole app can consume them
// V this is the non null assertion operator, which tells typescript that the value will not be nullish
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
