import { useAppStore } from "../store";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import TutorialFrame from "../components/TutorialFrame/TutorialFrame";

export default function InGame() {
  const state = useAppStore((state) => state.state);
  const currentItems = useAppStore((state) => state.currentItems);
  const evaluate = useAppStore((state) => state.evaluate);
  const transitionState = useAppStore((state) => state.transitionState);
  const endTutorial = useAppStore((state) => state.endTutorial);

  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const nextTutorialStep = useAppStore((state) => state.nextTutorialStep);
  const tutorialActive = tutorialStep !== -1;

  const handleStart = () => {
    endTutorial();
    transitionState("GAME_START");
  };

  return (
    <>
      {state !== "GAME_START" && <ItemDisplay item={currentItems[0]} index={1} />}

      <TutorialFrame tutorialStep={0} onNext={nextTutorialStep} index={2}>
        <p>Save money by comparing prices between two different merchants, side-by-side.</p>
      </TutorialFrame>

      {tutorialStep !== 0 && state !== "GAME_START" && <ItemDisplay item={currentItems[1]} index={2} />}
      <TutorialFrame tutorialStep={1} onNext={nextTutorialStep} index={6}>
        <p>
          This merchant has Stripe&apos;s Adaptive Pricing enabled! It&apos;s already converted to my local currency.
        </p>
      </TutorialFrame>

      {(!tutorialActive || tutorialStep >= 2) && <Conversion position="slider" index={2} />}

      {tutorialStep === 2 && (
        <TutorialFrame tutorialStep={2} onNext={nextTutorialStep} index={1}>
          <p>Use the conversion slider to help compare prices to get the best deal.</p>
        </TutorialFrame>
      )}

      {(!tutorialActive || tutorialStep >= 3) && <Timer onTimeout={() => evaluate(false)} index={2} />}

      <TutorialFrame tutorialStep={3} onNext={handleStart} index={1}>
        <p>I only have a limited time, so think fast!</p>
      </TutorialFrame>

      {!tutorialActive && <ProgressBar />}
    </>
  );
}
