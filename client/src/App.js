import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Invoice from "./components/Invoice";
import Analysis from "./components/Analysis";

// Create the context
const AppContext = createContext();

function App() {
  // Define state variables
  const [isInvoice, setInvoice] = useState(true);
  const [isAnalysis, setAnalysis] = useState(false);
  const [currentPath, setCurrentPath] = useState("invoice");
  const [items, setItems] = useState([]); // Add items state here

  // Create the value object to pass to the context provider
  const value = {
    isInvoice,
    setInvoice,
    isAnalysis,
    setAnalysis,
    currentPath,
    setCurrentPath,
    items, // Include items in the context value
    setItems, // Include setItems function in the context value
  };

  return (
    <AppContext.Provider value={value}>
      <Navbar />
      {isInvoice && <Invoice />}
      {isAnalysis && <Analysis />}
    </AppContext.Provider>
  );
}

export { AppContext }; // Export the context
export default App;
