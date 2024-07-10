import { RefObject, createContext, createRef, useContext, useRef } from "react";

type Props = {
  children?: React.ReactNode;
  pixelSize?: number;
};

export type PixelContextType = { pixelSize: number };

export const Pixel = createContext<PixelContextType>({ pixelSize: 3 });

export function PixelContext({ children, pixelSize = 3 }: Props) {
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
