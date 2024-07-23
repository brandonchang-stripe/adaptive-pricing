import { useEffect, useState } from "react";

type DeviceDetails = {
  width: number;
  height: number;
  isMobile: boolean;
};

export default function useDeviceDetails() {
  const [details, setDetails] = useState<DeviceDetails>({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setDetails({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerHeight <= 720 || window.innerWidth <= 810,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return details;
}
