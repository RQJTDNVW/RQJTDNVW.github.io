import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * Enable the reveal system only once JavaScript is actually running. Doing this
 * before render (and outside React) means above-the-fold content never flashes
 * in at full opacity first, while a JS failure leaves everything visible.
 */
document.documentElement.classList.add("motion-ready");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
