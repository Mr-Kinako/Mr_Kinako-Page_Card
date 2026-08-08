import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/_variables.scss";
import "@/styles/_theme.scss";

import "./main.scss";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
   throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
   <StrictMode>
      <App />
   </StrictMode>,
);
