import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

/**
 * Application Entry Point
 * ------------------------
 * - `createRoot` mounts the React application to the DOM.
 * - `<StrictMode>` enables additional checks and warnings in development.
 * - `<BrowserRouter>` enables client-side routing for the entire app.
 * - The whole app is rendered inside the root div in index.html.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      BrowserRouter wraps the entire application
      and enables URL-based navigation without full page reloads.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
