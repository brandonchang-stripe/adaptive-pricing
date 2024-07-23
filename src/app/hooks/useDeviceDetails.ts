import { useEffect, useState } from "react";

type DeviceDetails = {
  width: number;
  height: number;
  isMobile: boolean;
};

export default function useDeviceDetails() {
  const [details, setDetails] = useState<DeviceDetails>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 580,
  });

  useEffect(() => {
    const handleResize = () => {
      setDetails({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 580,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return details;
}
