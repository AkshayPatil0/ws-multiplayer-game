import Minimap from "../entities/Minimap";

export * from "./opponents";
export * from "./player";
export * from "./star";

export const minimapRef = document.querySelector<HTMLDivElement>(
  "#minimap"
) as HTMLDivElement;

export const minimap = new Minimap(minimapRef);

let gameStarted: boolean;
export const isGameStated = () => gameStarted;
export const setIsGameStarted = (val: boolean) => (gameStarted = val);

export const getRoomId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("roomId");
};

export const setRoomId = (val: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set("roomId", val);
  window.location.href = `/play?${params.toString()}`;
};
