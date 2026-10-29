import React from "react";
import ReactDOM from "react-dom/client";

import { SidebarMock } from "./components/SidebarMock";
import "./index.css";

ReactDOM.createRoot(document.getElementById("sidebar-mock") as HTMLElement).render(
  <React.StrictMode>
    <SidebarMock />
  </React.StrictMode>,
);
