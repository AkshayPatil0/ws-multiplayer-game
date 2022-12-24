import Minimap from "../entities/Minimap";
import { PlayerState } from "../shared/dtos";

export * from "./opponents";
export * from "./player";
export * from "./ball";

export const minimapRef = document.querySelector<HTMLDivElement>(
  "#minimap"
) as HTMLDivElement;

export const minimap = new Minimap(minimapRef);

export type IOpponents = { [id: string]: PlayerState };

let gameStarted: boolean;

export const isGameStated = () => gameStarted;

export const setIsGameStarted = (val: boolean) => (gameStarted = val);
