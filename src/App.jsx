import React from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { AlertProvider } from "./useContext/AlertContext";
import { AlertModalProvider } from "./useContext/AlertModalContext";
import { InfoModalProvider } from "./useContext/InfoModalContext";

function App() {
  return (
    <AlertProvider>
      <AlertModalProvider>
        <InfoModalProvider>
          <AppRouter />
        </InfoModalProvider>
      </AlertModalProvider>
    </AlertProvider>
  );
}

export default App;
