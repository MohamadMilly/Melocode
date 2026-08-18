import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import JsonWrongMark from "../../../assests/wrongMark.json";

export function WrongCheckMark() {
  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px -20px",
      }}
    >
      <div style={{ transform: "scale(1.5)" }}>
        {" "}
        <DotLottieReact data={JsonWrongMark} autoplay loop={false} />
      </div>
    </div>
  );
}
