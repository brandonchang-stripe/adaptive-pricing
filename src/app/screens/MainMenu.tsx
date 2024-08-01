import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import Button from "../components/Button/Button";

export default function MainMenu() {
  const setState = useAppStore((state) => state.transitionState);
  const tutorialActive = useAppStore((state) => state.tutorialActive);
  const countryData = useAppStore((state) => state.countryData);

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
        Get ready for your trip around the world! You&apos;re headed to
        {countryData.map(({ name }, index) => (
          <span key={name}>{index === countryData.length - 1 ? ` and ${name}. ` : ` ${name},`}</span>
        ))}
        Make sure you have everything you need before you go.
      </p>
      <p>
        Some shops don&apos;t display prices in your local currency, so you&apos;ll have to convert the prices yourself.
      </p>
      <div className="spacer"></div>
      GOAL:
      <div className="notes-footer">
        <b>Get points by choosing the cheapest items!</b>
        <Button onClick={handleStart}>Start shopping</Button>
      </div>
    </Frame>
  );
}
