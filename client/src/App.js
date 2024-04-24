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
  const [items, setItems] = useState([
    {
      id: "1",
      productName: "test1",
      price: 12000,
      tax: 12,
    },
    {
      id: "2",
      productName: "test2",
      price: 1000,
      tax: 10,
    },
    {
      id: "3",
      productName: "test2",
      price: 12000,
      tax: 10,
    },
    {
      id: "4",
      productName: "test2",
      price: 1200,
      tax: 10,
    },
    {
      id: "5",
      productName: "test2",
      price: 1000,
      tax: 10,
    },
  ]); // Add items state here

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
