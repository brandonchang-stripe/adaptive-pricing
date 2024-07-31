import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";
import { countryData } from "../components/gameData";

export default function MainMenu() {
  const setState = useAppStore((state) => state.transitionState);
  const tutorialActive = useAppStore((state) => state.tutorialActive);

  function handleStart() {
    if (tutorialActive) {
      setState("TUTORIAL");
    } else {
      setState("GAME_START");
    }
  }

  return (
    <Frame allowDrag position="starting-notes" type="note" index={2}>
      <p>
        Get ready for your world tour! You&apos;re headed to
        {countryData.map(({ name }, index) => (
          <span key={name}>{index === countryData.length - 1 ? ` and ${name}. ` : ` ${name},`}</span>
        ))}
        Make sure you have everything you need before you go.
        <br/>
        <br/>
        <b>Get points by choosing the cheapest items.</b>
      </p>
      <div className="spacer"></div>
      <div className="notes-footer">
        <Button onClick={handleStart}>Start shopping</Button>
      </div>
    </Frame>
  );
}
