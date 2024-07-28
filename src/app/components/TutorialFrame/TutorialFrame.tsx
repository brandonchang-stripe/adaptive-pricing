import style from "./TutorialFrame.module.css";
import Button from "../Button/Button";
import Frame from "../Frame/Frame";
import { useAppStore } from "@/app/store";

type Props = {
  onNext: () => void;
  tutorialStep: number;
  index?: number;
  children?: React.ReactNode;
};

export default function TutorialFrame({ children, onNext, tutorialStep, index = 0 }: Props) {
  const currentStep = useAppStore((state) => state.tutorialStep);

  return (
    currentStep == tutorialStep && (
      <Frame position={`tutorial-${tutorialStep}`} type="tutorial" index={index} allowDrag>
        <div className={style.container}>
          {children}
          <div className="spacer"></div>
          <div className={style.footer}>
            <Button onClick={onNext}>NEXT</Button>
          </div>
        </div>
      </Frame>
    )
  );
}
