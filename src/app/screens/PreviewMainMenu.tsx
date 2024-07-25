import Frame from "@/app/components/Frame/Frame";
import { countryData } from "../components/gameData";

export default function PreviewMainMenu() {
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
        <b>Play Price Adapter on Jul 30</b>
      </div>
    </Frame>
  );
}
