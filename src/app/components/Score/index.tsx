import { useAppStore } from "@/app/store"

export default function Score() {
  const score = useAppStore(state => state.score);
  const itemCount = useAppStore(state => state.itemCount);
  return <div className="price">
    {score} / {itemCount - 1}
  </div>
}