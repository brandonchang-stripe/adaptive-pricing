import Panel from "../Panel";

type Props = {
  onStart: () => void;
  children?: JSX.Element;
};

export default function StartScreen({ onStart, children }: Props) {
  return (
    <Panel label="Instructions">
      {children}
      <button onClick={onStart}>Start!</button>
    </Panel>
  );
}
