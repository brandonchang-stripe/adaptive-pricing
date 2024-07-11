import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import TravelMap from "@/app/components/TravelMap/TravelMap";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";

export default function InGame() {
  const currentItems = useAppStore((state) => state.currentItems);
  const country = useAppStore((state) => state.currentCountry);
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <>
      <TravelMap key="travel-map" />

      {currentItems.map((item, i) => (
        <ItemDisplay key={item.merchant} item={item} index={i + 1} />
      ))}

      <Frame allowDrag label="How to play" position="how-to-play" type="note" index={4} dismissible>
        <p>
          Buy the cheapest option available. Some merchants only sell in their local currency, so i&apos;ll need to
          convert the price to USD to compare.
        </p>
      </Frame>

      <Conversion country={country!} position="slider" index={3} />
      <Timer onTimeout={() => evaluate(false)} index={5} />
    </>
  );
}
