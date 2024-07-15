import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";
import { countryData } from "../components/gameData";

export default function MainMenu() {
  const countryIndex = useAppStore((state) => state.countryIndex);
  const setState = useAppStore((state) => state.transitionState);
  const tutorialStep = useAppStore((state) => state.tutorialStep);

  function handleStart() {
    if (tutorialStep === -1) {
      setState("GAME_PLAY");
    } else {
      setState("GAME_PAUSED");
    }
  }

  return (
    <>
      {countryIndex === 0 && (
        <Frame allowDrag label="Notes" position="starting-notes" type="note" index={2}>
          <div className="notes-contents">
            <p>
              <b>NOTES TO SELF!</b>
            </p>
            <p>
              Its finally time for my trip around the world, but before I go I need to buy everything I need for the
              trip.
            </p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <p>PS: Dont leave everything for the last minute again.</p>
              <Button onClick={handleStart}>Start shopping</Button>
            </div>
          </div>
        </Frame>
      )}

      {countryIndex === 1 && (
        <Frame allowDrag label="Notes" position="next-stop-notes" type="note" index={2}>
          <div className="notes-contents">
            <p>Next stop, {countryData[countryIndex].name}</p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={handleStart}>Start shopping</Button>
            </div>
          </div>
        </Frame>
      )}
    </>
  );
}
