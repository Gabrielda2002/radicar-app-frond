import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { UserProfileProvider } from "./context/userProfileContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
