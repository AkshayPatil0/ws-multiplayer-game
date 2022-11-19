import Minimap from "./entities/Minimap";

export const playerRef = document.querySelector<HTMLDivElement>(
  "#player"
) as HTMLDivElement;

export const ballRef = document.querySelector<HTMLDivElement>(
  "#ball"
) as HTMLDivElement;

export const groundRef = document.querySelector<HTMLDivElement>(
  "#ground"
) as HTMLDivElement;

export const minimapRef = document.querySelector<HTMLDivElement>(
  "#minimap"
) as HTMLDivElement;

export const minimap = new Minimap(minimapRef);
