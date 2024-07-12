import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";
import Button from "../components/Button/Button";

export default function InGame() {
  const currentItems = useAppStore((state) => state.currentItems);
  const country = useAppStore((state) => state.currentCountry);
  const evaluate = useAppStore((state) => state.evaluate);
  const setState = useAppStore((state) => state.transitionState);
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const nextTutorialStep = useAppStore((state) => state.nextTutorialStep);
  const tutorialActive = tutorialStep !== -1;

  const handleStart = () => {
    setState("GAME_PLAY");
  };

  return (
    <>
      {currentItems.map((item, i) => (
        <ItemDisplay key={item.merchant} item={item} index={i + 1} />
      ))}

      {tutorialStep === 0 && (
        <Frame label="Buying items" position="tutorial-0" type="note" index={1} allowDrag>
          <>
            <p>I&apos;m going to try save money by comparing prices between two different merchants, side-by-side.</p>
            <Button onClick={nextTutorialStep}>NEXT</Button>
          </>
        </Frame>
      )}

      {(!tutorialActive || tutorialStep >= 1) && <Conversion country={country!} position="slider" index={2} />}

      {tutorialStep === 1 && (
        <Frame label="Buying items" position="tutorial-1" type="note" index={1} allowDrag>
          <>
            <p>Use the conversion slider to help compare prices to get the best deal.</p>
            <Button onClick={nextTutorialStep}>NEXT</Button>
          </>
        </Frame>
      )}

      {(!tutorialActive || tutorialStep >= 2) && <Timer onTimeout={() => evaluate(false)} index={2} />}

      {tutorialStep === 2 && (
        <Frame label="Buying items" position="tutorial-2" type="note" index={1} allowDrag>
          <>
            <p>I only have a limited time, so think fast!</p>
            <p>If I buy quickly, I can get a deal with Flash Sales!</p>
            <Button onClick={handleStart}>START SHOPPING</Button>
          </>
        </Frame>
      )}
    </>
  );
}
