import { isGameStated } from "../store";
import { exitGame } from "./game";
import { showPopup } from "./popup";

const startBtn = document.getElementById("start-btn") as HTMLButtonElement;

startBtn.addEventListener("click", () => {
  if (isGameStated()) {
    exitGame();
    return;
  }
  showPopup();
});

export {};
