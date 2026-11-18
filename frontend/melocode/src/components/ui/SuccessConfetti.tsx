import { useEffect } from "react";
import confetti from "canvas-confetti";

export function SuccessConfetti() {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      shapes: ["star", "circle", "square"],
      gravity: 0.2,
      origin: { y: 0.8 },
      colors: ["#22c55e", "#15803d", "#86efac"],
    });
  }, []);

  return null;
}
