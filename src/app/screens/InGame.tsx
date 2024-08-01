import { useRef } from "react";
import { formatDisplayPrice, useAppStore, useUsdToCurrency } from "../store";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Conversion from "@/app/components/Conversion/Conversion";
import Timer from "@/app/components/Timer/Timer";
import { tutorialItems } from "../components/gameData";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import TutorialFrame from "../components/TutorialFrame/TutorialFrame";
import TutorialItemDisplayFrame from "../components/TutorialItemDisplay/TutorialItemDisplay";
import useDeviceDetails from "../hooks/useDeviceDetails";

export default function InGame() {
  const state = useAppStore((state) => state.state);
  const {isMobile} = useDeviceDetails();
  const currentItems = useAppStore((state) => state.currentItems);
  const evaluate = useAppStore((state) => state.evaluate);
  const transitionState = useAppStore((state) => state.transitionState);
  const endTutorial = useAppStore((state) => state.endTutorial);
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const nextTutorialStep = useAppStore((state) => state.nextTutorialStep);
  const localCurrency = useAppStore((state) => state.localCurrency);
  const rightItemPrice = useUsdToCurrency(tutorialItems[1].usdPrice, localCurrency);
  const sliderMax = useUsdToCurrency(100, localCurrency);

  // Handle advancing tutorial step when slider is in correct position,
  // ignoring if the user slides past the correct position
  const tutorial2Ref = useRef<any>(null);
  const handleSliderChange = (value: number) => {
    if (tutorialStep !== 2) return;
    if (value === tutorialItems[1].usdPrice) {
      tutorial2Ref.current = setTimeout(() => {
        nextTutorialStep();
      }, 500);
    } else if (tutorial2Ref.current !== null) {
      clearTimeout(tutorial2Ref.current);
    }
  };

  const handleStart = () => {
    transitionState("GAME_START");
    nextTutorialStep();
  };

  const handleFinalTutorial = () => {
    endTutorial();
    transitionState("GAME_START");
  };

  return (
    <>
      {/* Tutorial item displays */}
      {state === "TUTORIAL"  && tutorialStep < 6 && (
        <>
          <TutorialItemDisplayFrame item={tutorialItems[0]} index={1} />
          {tutorialStep >= 1 && ( <TutorialItemDisplayFrame item={tutorialItems[1]} index={2} />)}
        </>
      )}

      <TutorialFrame tutorialStep={0} onNext={nextTutorialStep} index={2} key={currentItems[0].merchant}>
        <p>Save money by comparing prices between two shops.</p>
      </TutorialFrame>

      {/* In game item displays */}
      {tutorialStep >= 4 && state === "GAME_PLAY" && (
        <>
          <ItemDisplay item={currentItems[0]} index={1} key={currentItems[0].merchant} />
          <ItemDisplay item={currentItems[1]} index={2} key={currentItems[1].merchant} />
        </>
      )}

      <TutorialFrame tutorialStep={1} onNext={nextTutorialStep} index={6}>
        <p>This is the second shop; the price is automatically converted to your local currency.</p>
      </TutorialFrame>

      {tutorialStep >= 2 && <Conversion position="slider" index={2} onChange={handleSliderChange} />}

      {tutorialStep === 2 && (
        <TutorialFrame tutorialStep={2} index={5}>
          <p>
            Use the currency conversion slider to compare prices.
            <br />
            <br />
            Move the slider to <b>match the {formatDisplayPrice(rightItemPrice, localCurrency)} price on the {isMobile ? "bottom" : "right"}.</b>
          </p>
        </TutorialFrame>
      )}

      {tutorialStep === 3 && (
        <TutorialFrame tutorialStep={3} index={1}>
          <p>
            Great! Now you can <b>compare the two prices</b>.
            The shop on the {isMobile ? "bottom" : "right"} has a better deal, so buy it!
          </p>
        </TutorialFrame>
      )}

      {tutorialStep === 4 && (
        <TutorialFrame tutorialStep={4} onNext={nextTutorialStep} index={1}>
          <p>
            The slider <b>maxes out at{" "}{formatDisplayPrice(sliderMax, localCurrency)}</b>. For anything more expensive, use your math skills!
          </p>
        </TutorialFrame>
      )}

      {tutorialStep >= 5 && <Timer onTimeout={() => evaluate(false)} index={2} />}

      <TutorialFrame tutorialStep={5} onNext={handleStart} index={1}>
        <p>You have limited time. Choose quickly!</p>
      </TutorialFrame>

      <TutorialFrame tutorialStep={6} onNext={handleFinalTutorial} index={1}>
        <p>
          The final trip is the <b>Lightning Round</b>! All prices have been converted. No need to use the slider, just
          pick the smaller number!
        </p>
      </TutorialFrame>

      {tutorialStep >= 5 && <ProgressBar />}
    </>
  );
}
