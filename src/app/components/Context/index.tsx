import { createContext, createRef, useContext, useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export type PixelContextType = { pixelSize: number };

export const Pixel = createContext<PixelContextType>({ pixelSize: 3 });

export function PixelContext({ children }: Props) {
  const [pixelSize, setPixelSize] = useState(2);

  useEffect(() => {
    function handleResize() {
      const size = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
      setPixelSize(size);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Pixel.Provider value={{ pixelSize }}>{children}</Pixel.Provider>;
}

export const usePixel = () => {
  return useContext(Pixel);
};

const screenRef = createRef<HTMLDivElement>();
export const ScreenRef = createContext(screenRef);

export function ScreenRefContext({ children }: { children: React.ReactNode }) {
  return <ScreenRef.Provider value={screenRef}>{children}</ScreenRef.Provider>;
}

export const useScreenRef = () => {
  return useContext(ScreenRef);
};
