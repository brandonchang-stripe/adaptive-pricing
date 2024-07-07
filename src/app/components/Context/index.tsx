import { createContext } from "react";

type Props = {
  children?: React.ReactNode;
  pixelSize?: number;
};

export type PixelContextType = { pixelSize: number };

export const Context = createContext<PixelContextType>({ pixelSize: 3 });

export default function PixelContext({ children, pixelSize = 3 }: Props) {
  return <Context.Provider value={{ pixelSize }}>{children}</Context.Provider>;
}
