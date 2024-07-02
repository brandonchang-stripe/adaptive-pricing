import { useAppStore } from "@/app/store"

export default function Score() {
  const score = useAppStore(state => state.score);
  return <div className="price">
    {score}
  </div>
}