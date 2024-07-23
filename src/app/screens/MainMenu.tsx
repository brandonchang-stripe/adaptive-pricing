import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";
import { countryData } from "../components/gameData";

export default function MainMenu() {
  const setState = useAppStore((state) => state.transitionState);
  const tutorialStep = useAppStore((state) => state.tutorialStep);

  function handleStart() {
    if (tutorialStep === -1) {
      setState("GAME_START");
    } else {
      setState("TUTORIAL");
    }
  }

  return (
    <Frame allowDrag position="starting-notes" type="note" index={2}>
      <p>
        Get ready for your world tour! You&apos;re headed to
        {countryData.map(({ name }, index) => (
          <b key={name}>{index === countryData.length - 1 ? ` and ${name}. ` : ` ${name},`}</b>
        ))}
        Make sure you have everything you need before you go.
      </p>
      <div className="spacer"></div>
      <div className="notes-footer">
        <Button onClick={handleStart}>Start shopping</Button>
      </div>
    </Frame>
  );
}
