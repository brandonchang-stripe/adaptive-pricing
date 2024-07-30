import { formatDisplayPrice, useAppStore, useUsdToCurrency } from "../store";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import TutorialFrame from "../components/TutorialFrame/TutorialFrame";
import { useRef } from "react";

export default function InGame() {
  const state = useAppStore((state) => state.state);
  const currentItems = useAppStore((state) => state.currentItems);
  const evaluate = useAppStore((state) => state.evaluate);
  const transitionState = useAppStore((state) => state.transitionState);
  const endTutorial = useAppStore((state) => state.endTutorial);
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const nextTutorialStep = useAppStore((state) => state.nextTutorialStep);
  const localCurrency = useAppStore((state) => state.localCurrency);
  const rightItemPrice = useUsdToCurrency(currentItems[1].usdPrice, localCurrency);
  const sliderMax = useUsdToCurrency(100, localCurrency);

  const tutorialActive = tutorialStep !== -1;

  // Handle advancing tutorial step when slider is in correct position,
  // ignoring if the user slides past the correct position
  const tutorial2Ref = useRef<any>(null);
  const handleSliderChange = (value: number) => {
    if (tutorialStep !== 2) return;
    if (value === rightItemPrice) {
      tutorial2Ref.current = setTimeout(() => { 
        nextTutorialStep();
      }, 500);
    } else if (tutorial2Ref.current !== null) {
      clearTimeout(tutorial2Ref.current);
    }
  }

  const handleStart = () => {
    endTutorial();
    transitionState("GAME_START");
  };

  return (
    <>
      {state !== "GAME_START" && <ItemDisplay item={currentItems[0]} index={1} />}

      <TutorialFrame tutorialStep={0} onNext={nextTutorialStep} index={2} key={currentItems[0].merchant}>
        <p>Save money by comparing prices between two shops, side by side</p>
      </TutorialFrame>

      {tutorialStep !== 0 && state !== "GAME_START" && (
        <ItemDisplay item={currentItems[1]} index={2} key={currentItems[1].merchant} />
      )}
      <TutorialFrame tutorialStep={1} onNext={nextTutorialStep} index={6}>
        <p>This is the second shop, the price is automatically converted to your local currency.</p>
      </TutorialFrame>

      {(!tutorialActive || tutorialStep >= 2) && <Conversion position="slider" index={2} onChange={handleSliderChange} />}

      {tutorialStep === 2 && (
        <TutorialFrame tutorialStep={2} index={1}>
          <p>
            Use the currency conversion slider to compare prices.
            <br/><br/>
            <b>Try sliding it so the right side matches the adapted price of {formatDisplayPrice(rightItemPrice, localCurrency)}</b>
          </p>
        </TutorialFrame>
      )}

      {tutorialStep === 3 && (
        <TutorialFrame tutorialStep={3} onNext={nextTutorialStep} index={1}>
          <p>
            Great! Now you can <b>compare the two prices</b> and find the better deal.
            The slider maxes out at {formatDisplayPrice(sliderMax, localCurrency)}.
            For anything more expensive, use your math skills!
          </p>
        </TutorialFrame>
      )}

      {(!tutorialActive || tutorialStep >= 4) && <Timer onTimeout={() => evaluate(false)} index={2} />}

      <TutorialFrame tutorialStep={4} onNext={handleStart} index={1}>
        <p>You have limited time. Choose quickly!</p>
      </TutorialFrame>

      {!tutorialActive && <ProgressBar />}
    </>
  );
}
