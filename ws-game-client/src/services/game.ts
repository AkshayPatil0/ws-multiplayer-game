import { getOrCreatePlayerRef, getOrCreateRef } from "../utils/html-ref";
import { playerControlsHandler } from "../utils/player";
import { socket } from "./socket";
import { minimap, setIsGameStarted } from "../store";
import { hidePopup } from "./popup";
import { updatePlayer } from "./player";

export const startGame = () => {
  const playerName = document
    .querySelector<HTMLInputElement>("#player-name")
    ?.value?.trim();

  const avatar = document.querySelector<HTMLInputElement>(
    "input[name=avatar]:checked"
  )?.value;

  if (!playerName || !avatar) return;
  socket.emit("start_game", playerName, avatar);

  hidePopup();
  document.documentElement.style.setProperty("--game-unit", "16");
  getOrCreatePlayerRef("player");

  minimap.ref.style.display = "block";
  const allCollapsibleToggles = document.querySelectorAll<HTMLInputElement>(
    ".collapsible-toggle"
  );

  allCollapsibleToggles.forEach((toggle) => {
    if (toggle.checked) toggle.click();
  });

  setIsGameStarted(true);
  const startBtn = document.getElementById("start-btn") as HTMLButtonElement;

  startBtn.innerText = "Exit Game";
  startBtn.style.color = "red";
  document.addEventListener("keydown", playerControlsHandler);
};

export const exitGame = () => {
  socket.emit("exit_game");
  setIsGameStarted(false);

  document.documentElement.style.setProperty("--game-unit", "6");

  minimap.ref.style.display = "none";

  updatePlayer(null);

  const allCollapsibleToggles = document.querySelectorAll<HTMLInputElement>(
    ".collapsible-toggle"
  );

  allCollapsibleToggles.forEach((toggle) => {
    if (!toggle.checked) toggle.click();
  });

  const startBtn = document.getElementById("start-btn") as HTMLButtonElement;

  startBtn.innerText = "Enter Game";
  startBtn.style.color = "unset";
  document.removeEventListener("keydown", playerControlsHandler);
};

const startButtonRef = document.querySelector(
  "#game-start-btn"
) as HTMLButtonElement;

startButtonRef.addEventListener("click", startGame);
