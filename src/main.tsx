import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/blackWhiteContext.tsx";
import "./index.css";
import { UserProfileProvider } from "./context/userProfileContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
