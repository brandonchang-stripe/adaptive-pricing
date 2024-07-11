import { useAppStore } from "@/app/store";
import { useEffect } from "react";
import FinishFrame from "@/app/components/FinishFrame/FinishFrame";

type Props = {
  delay?: number;
};

export default function GameFinish({ delay = 3000 }: Props) {
  const setState = useAppStore((state) => state.setState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState("SCORE_SCREEN");
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [setState]);

  return <FinishFrame />;
}
