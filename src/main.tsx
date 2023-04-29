import React from "react";
import ReactDOM from "react-dom/client";
import { CustomHookReview } from "./customHooksReview/CustomHookReview.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CustomHookReview />
  </React.StrictMode>
);
