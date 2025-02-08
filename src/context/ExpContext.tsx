import React, { createContext, useContext, useState } from "react";

// Define the type for the context
interface ExpContextType {
  exp: number;
  setExp: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const ExpContext = createContext<ExpContextType | undefined>(undefined);

// Provider component
export const ExpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exp, setExp] = useState<number>(0);

  return (
    <ExpContext.Provider value={{ exp, setExp }}>
      {children}
    </ExpContext.Provider>
  );
};

// Custom hook to use the EXP context
export const useExp = () => {
  const context = useContext(ExpContext);
  if (!context) {
    throw new Error("useExp must be used within an ExpProvider");
  }
  return context;
};
