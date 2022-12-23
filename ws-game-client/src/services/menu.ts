import { getOrCreateRef } from "../utils/html-ref";
import { showPopup } from "./popup";
import { socket } from "./socket";
import { minimap, setIsGameStarted } from "./store";

const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const groundRef = document.querySelector<HTMLDivElement>(
  "#ground"
) as HTMLDivElement;

startBtn.addEventListener("click", showPopup);

export {};
