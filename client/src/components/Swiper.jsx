import "../styles/swiper.css";
import { useEffect, useRef } from "react";
import swiper from "../assets/swiper1.png";
import swiper_flipped from "../assets/swiper1_flipped.png";

export default function Swiper({ onClick }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const target = swiperRef.current;
    const gameArea = document.getElementById("game-area");
    const gameAreaHeight = gameArea.offsetHeight - 150

    target.style.position = "absolute";
    target.style.top = Math.random() * gameAreaHeight + "px";
    target.style.height = "150px";
    target.src = swiper;
    target.alt = "Swiper";
    target.style.transform = "translateX(calc(100vw + 200px))";
    let transition = "transform 5s ease-in-out";

    if (Math.random() > 0.7) {
      transition = "transform 2s linear";
    }
    let spawnSide = "left";
    if (Math.random() > 0.5) {
      spawnSide = "right";
      target.src = swiper_flipped;
    }
    if (spawnSide === "left") {
      target.style.left = "-200px";
      target.style.transition = transition;
      target.style.transform = "translateX(calc(100vw + 200px))";
    } else {
      target.style.right = "-200px";
      target.style.transition = transition;
      target.style.transform = "translateX(calc(-100vw - 200px))";
    }
  }, []);

  return (
    <div className="swiper" onClick={onClick}>
      <img ref={swiperRef} alt="swiper" draggable="false" />
    </div>
  );
}
