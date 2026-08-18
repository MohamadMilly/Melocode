import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import JsonSuccessMark from "../../../assests/successMark.json";

export function SuccessCheckMark() {
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
      <div style={{ transform: "scale(3)" }}>
        {" "}
        <DotLottieReact data={JsonSuccessMark} autoplay loop={false} />
      </div>
    </div>
  );
}
