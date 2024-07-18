import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";
import { countryData } from "../components/gameData";
import RoundEndFrame from "../components/RoundFinishFrame/RoundFinishFrame";

export default function MainMenu() {
  const countryIndex = useAppStore((state) => state.countryIndex);
  const setState = useAppStore((state) => state.transitionState);
  const tutorialStep = useAppStore((state) => state.tutorialStep);

  function handleStart() {
    if (tutorialStep === -1) {
      setState("GAME_PLAY");
    } else {
      setState("TUTORIAL");
    }
  }

  return (
    <>
      {countryIndex === 0 && (
        <Frame allowDrag position="starting-notes" type="note" index={2}>
          <>
            <p>
              Get ready for your world tour! You&apos;re headed to Japan, Mexico, Brazil, and New Zealand. Make sure you
              have everything you need before you go.
            </p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={handleStart}>Start shopping</Button>
            </div>
          </>
        </Frame>
      )}

      {countryIndex === 1 && (
        <Frame allowDrag label="Notes" position="next-stop-notes" type="note" index={2}>
          <>
            <p>Next stop, {countryData[countryIndex].name}</p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={handleStart}>Start shopping</Button>
            </div>
          </>
        </Frame>
      )}
    </>
  );
}
