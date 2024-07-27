import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  // const fontData = await fetch(
  // new URL('public/fonts/dogica/dogicapixelbold.ttf', import.meta.url),
  // ).then((res) => res.arrayBuffer());
  try {
    const { searchParams } = new URL(request.url);
    // if (!searchParams.has("scores")) {
    //   throw new Error("Score is required");
    // } 

    const scores = searchParams.getAll("scores") || [];

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
            style={{
              width: "100%",
              height: "100%",
              imageRendering: "crisp-edges",
            }}
            src="https://images.ctfassets.net/fzn2n1nzq965/eBHEQWdZwNR89SksLUGTi/e731cb1413908decbf08c153ba04942a/passport.png"
          />
          <div
            style={{
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(220px, 270px) rotate(-36deg) skew(14deg)",
            }}
          >
            {scores[1] || "***"}
          </div>
          <div
            style={{
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(475px, 312px) rotate(-5deg)",
              textAlign: "center",
            }}
          >
            {scores[0] || "***"}
          </div>
          <div
            style={{
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              fontWeight: "bold",
              width: "100px",
              justifyContent: "center",
              fontFamily: "courier monospace",
              transform: "translate(758px, 475px) rotate(-3deg)",
            }}
          >
            {scores[2] || "***"}
          </div>
          <div
            style={{
              position: "absolute",
              color: "#635bff",
              fontSize: "48px",
              width: "100px",
              justifyContent: "center",
              fontWeight: "bold",
              fontFamily: "courier monospace",
              transform: "translate(995px, 260px) rotate(6deg)",
            }}
          >
            {scores[3] || "***"}
          </div>
          <div
            style={{
              position: "absolute",
              color: "white",
              fontSize: "48px",
              fontWeight: "bold",
              fontFamily: "courier monospace",
              width: "200px",
              justifyContent: "center",
              transform: "translate(404px, 516px) rotate(1deg)",
            }}
          >
            {scores[4] || "****"}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
