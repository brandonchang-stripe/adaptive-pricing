import { useAppStore } from "@/app/store"

export default function Score() {
  const score = useAppStore(state => state.score);
  const level = useAppStore(state => state.level);
  return <div className="price">
    {score} / {level - 1}
  </div>
}