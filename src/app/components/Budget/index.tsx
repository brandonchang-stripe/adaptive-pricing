import { useAppStore } from "@/app/store";

export default function Budget() {
  const item = useAppStore((state) => state.currentItem);
  return <>{item && <div className="price">$USD {item.budget}</div>}</>;
}
