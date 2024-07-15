import Frame from "@/app/components/Frame/Frame";
import { useAppStore } from "../store";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";
import Button from "../components/Button/Button";
import ProgressBar from "../components/ProgressBar/ProgressBar";

export default function InGame() {
  const currentItems = useAppStore((state) => state.currentItems);
  const country = useAppStore((state) => state.countryIndex);
  const evaluate = useAppStore((state) => state.evaluate);
  const setState = useAppStore((state) => state.transitionState);
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const nextTutorialStep = useAppStore((state) => state.nextTutorialStep);
  const endTutorial = useAppStore((state) => state.endTutorial);
  const tutorialActive = tutorialStep !== -1;

  const handleStart = () => {
    endTutorial();
    setState("GAME_PLAY");
  };

  return (
    <>
      {currentItems.map((item, i) => (
        <ItemDisplay key={item.merchant} item={item} index={i + 1} />
      ))}

      {tutorialStep === 0 && (
        <Frame label="Buying items" position="tutorial-0" type="note" index={1} allowDrag>
          <div className="notes-contents">
            <p>I&apos;m going to try save money by comparing prices between two different merchants, side-by-side.</p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={nextTutorialStep}>NEXT</Button>
            </div>
          </div>
        </Frame>
      )}

      {(!tutorialActive || tutorialStep >= 1) && <Conversion position="slider" index={2} />}

      {tutorialStep === 1 && (
        <Frame label="Buying items" position="tutorial-1" type="note" index={1} allowDrag>
          <div className="notes-contents">
            <p>Use the conversion slider to help compare prices to get the best deal.</p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={nextTutorialStep}>NEXT</Button>
            </div>
          </div>
        </Frame>
      )}

      {(!tutorialActive || tutorialStep >= 2) && <Timer onTimeout={() => evaluate(false)} index={2} />}

      {tutorialStep === 2 && (
        <Frame label="Buying items" position="tutorial-2" type="note" index={1} allowDrag>
          <div className="notes-contents">
            <p>I only have a limited time, so think fast!</p>
            <div className="spacer"></div>
            <div className="notes-footer">
              <Button onClick={handleStart}>START SHOPPING</Button>
            </div>
          </div>
        </Frame>
      )}

      {/* {!tutorialActive && <ProgressBar />} */}
      <ProgressBar />
    </>
  );
}
