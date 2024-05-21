"use client";

import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

function ContextProvider({ children }) {
    const [uploaded,setUploaded] = useState("")
  return <Context.Provider value={{uploaded,setUploaded}}>{children}</Context.Provider>;
}

export default ContextProvider;
