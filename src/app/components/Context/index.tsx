import { createContext, createRef, useContext, useEffect, useState } from "react";

const screenRef = createRef<HTMLDivElement>();
export const ScreenRef = createContext(screenRef);

export function ScreenRefContext({ children }: { children: React.ReactNode }) {
  return <ScreenRef.Provider value={screenRef}>{children}</ScreenRef.Provider>;
}

export const useScreenRef = () => {
  return useContext(ScreenRef);
};
