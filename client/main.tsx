import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);