"use client";

import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useAppStore } from "../store";

export default function Test() {
  const skip = useAppStore((state) => state.skipItem);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: "200px" }} onClick={() => skip()}>
      <ProgressBar />
    </div>
  );
}
