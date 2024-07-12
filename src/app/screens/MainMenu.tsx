import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";

export default function MainMenu() {
  const setState = useAppStore((state) => state.transitionState);
  function handleStart() {
    setState("GAME_PAUSED");
  }

  return (
    <>
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

        <Button onClick={handleStart}>Start shopping</Button>
      </Frame>
    </>
  );
}
