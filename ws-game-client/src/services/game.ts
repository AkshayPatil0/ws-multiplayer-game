import { getOrCreateRef } from "../utils/html-ref";
import {
  getMoveDirectionByKey,
  ifPlayerIntersectsOpponents,
} from "../utils/player";
import { socket } from "./socket";
import { getPlayer, minimap } from "../store";
import { hidePopup } from "./popup";

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
  getOrCreateRef("player", "player");

  minimap.ref.style.display = "block";
  const allCollapsibleToggles = document.querySelectorAll<HTMLInputElement>(
    ".collapsible-toggle"
  );

  allCollapsibleToggles.forEach((toggle) => {
    if (toggle.checked) toggle.click();
  });

  document.addEventListener("keydown", playerControlsHandler);
};

const playerControlsHandler = (e: KeyboardEvent) => {
  e.preventDefault();
  const player = getPlayer();

  if (!player) return;

  const speed = e.shiftKey ? 2 : 1;

  const { x, y } = getMoveDirectionByKey(e.key);

  if (x == 0 && y == 0) return;
  let newPlayerState = player.move(x * speed, y * speed);
  if (ifPlayerIntersectsOpponents(newPlayerState)) {
    newPlayerState = player.move(-x * speed, -y * speed);
  }
  socket.emit("player_update", newPlayerState);
};
