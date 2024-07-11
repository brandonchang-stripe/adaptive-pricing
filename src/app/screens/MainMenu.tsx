import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import TravelMap from "@/app/components/TravelMap/TravelMap";
import LevelSelectList from "@/app/components/LevelSelectList/LevelSelectList";

export default function MainMenu() {
  const setState = useAppStore((state) => state.setState);
  function handleStart() {
    setState("IN_GAME");
  }

  return (
    <>
      <TravelMap key="travel-map" />
      <Frame allowDrag label="Notes" position="starting-notes" type="note" index={2}>
        <>
          <p>
            <b>NOTES TO SELF!</b>
          </p>
          <p>
            Its finally time for my trip around the world, but before I go I need to buy everything I need for the trip.
          </p>
          <p>PS: Dont leave everything for the last minute again</p>
        </>
      </Frame>

      <LevelSelectList onLevelStart={handleStart} />
    </>
  );
}
