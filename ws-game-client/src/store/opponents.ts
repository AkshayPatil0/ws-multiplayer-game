import Player from "../entities/Player";

export type IOpponents = { [id: string]: Player };

let opponents: IOpponents = {};

export const getOpponents = () => opponents;

export const setOpponents = (updatedOpponents: IOpponents) => {
  opponents = updatedOpponents;

  const statsRef = document.getElementById("stats");

  if (!statsRef) return;

  const opps = Object.keys(opponents).map((id) => {
    const { name, score, color } = opponents[id].state;
    return `<li style="--color: ${color}"><span class="stat-li-name">${name}</span> <span>${score}</span></li>`;
  });

  statsRef.innerHTML = `<ul>${opps.join("")}</ul>`;
};
