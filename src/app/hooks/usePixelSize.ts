import { useEffect, useState } from "react";

export function usePixelSize() {
  const [pixelSize, setPixelSize] = useState(0);

  useEffect(() => {
    const updatePixelSize = () => {
      const size = getComputedStyle(document.documentElement).getPropertyValue("--pixel-size");
      setPixelSize(parseFloat(size));
    };

    updatePixelSize();
    document.addEventListener("resize", updatePixelSize);

    return () => {
      document.removeEventListener("resize", updatePixelSize);
    };
  }, []);

  return pixelSize;
}
