import { createContext } from "react";

type Props = {
  children?: React.ReactNode;
};

export type PixelContextType = { pixelSize: number };

export const Context = createContext<PixelContextType>({ pixelSize: 3 });

export default function PixelContext({ children }: Props) {
  return <Context.Provider value={{ pixelSize: 3 }}>{children}</Context.Provider>;
}
