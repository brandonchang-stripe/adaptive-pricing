import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";

export async function GET(_: Request, { params }: { params: { scores: string } }) {
  // const fontData = await fetch(
  // new URL('public/fonts/dogica/dogicapixelbold.ttf', import.meta.url),
  // ).then((res) => res.arrayBuffer());
  try {
    const scores = JSON.parse(atob(params.scores));
    if (!scores || !Array.isArray(scores)) {
      throw new Error("Invalid scores");
    }

    const scoreStrings = scores.map((score) => {
      if (typeof score !== "number" || score < 0) {
        return "***";
      }
      return (score * 100).toString();
    })
    const total = scores.reduce((acc, score) => acc + score * 100, 0).toString();

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://images.ctfassets.net/fzn2n1nzq965/eBHEQWdZwNR89SksLUGTi/520e56b0ca3f6a4ef1e8f1276f6e5937/passport.png"
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(260px, 275px) rotate(-35deg) skew(13deg)",
            }}
          >
            {scoreStrings[1] || "***"}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(473px, 318px) rotate(-4deg)",
              textAlign: "center",
            }}
          >
            {scoreStrings[0] || "***"}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(720px, 450px) rotate(-3deg)",
            }}
          >
            {scoreStrings[2] || "***"}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              width: "100px",
              justifyContent: "center",
              fontWeight: "bold",
              fontFamily: "courier monospace",
              transform: "translate(933px, 265px) rotate(6deg)",
            }}
          >
            {scoreStrings[3] || "***"}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              color: "white",
              fontSize: "48px",
              fontWeight: "bold",
              fontFamily: "courier monospace",
              width: "200px",
              justifyContent: "center",
              transform: "translate(405px, 486px) rotate(1deg)",
            }}
          >
            {total}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    redirect(`/share-image.png`);
  }
}
