import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FormProvider } from "./context/FormContext";
import { CompareProvider } from "./context/CompareContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CompareProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </CompareProvider>
  </StrictMode>,
);
