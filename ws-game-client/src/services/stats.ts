import { PlayerState } from "../shared/dtos";

export const updateStats = ({
  player,
  opponent,
}: {
  player?: PlayerState;
  opponent?: { id: string; state: PlayerState };
}) => {
  const statsRef = document.getElementById("stats");
  console.log({ statsRef });
  if (!statsRef) return;

  let ulRef = document.querySelector<HTMLUListElement>("#stats-ul");
  if (!ulRef) {
    ulRef = document.createElement("ul");
    ulRef.id = "stats-ul";
    statsRef.innerHTML = "";
    statsRef.appendChild(ulRef);
  }
  console.log({ ulRef });
  if (player) {
    updateStatsLi("own-stat", player, ulRef);
  }

  if (opponent?.id && opponent?.state) {
    updateStatsLi(`opponent-stat-${opponent.id}`, opponent.state, ulRef);
  }
};

const updateStatsLi = (
  id: string,
  playerState: PlayerState,
  ulRef: HTMLUListElement
) => {
  let liRef = document.getElementById(id);

  if (!liRef) {
    liRef = document.createElement("li");
    liRef.id = id;
    ulRef.appendChild(liRef);
  }

  // liRef.style.backgroundImage = `url("src/assets/avatars/${playerState.avatar}.png")`;

  let nameRef = document.querySelector<HTMLSpanElement>(`#${id} .stat-li-name`);
  if (!nameRef) {
    nameRef = document.createElement("span");
    nameRef.className = "stat-li-name";
    nameRef.style.setProperty(
      "--avatar",
      `url("src/assets/avatars/${playerState.avatar}.png")`
    );
    liRef.appendChild(nameRef);
  }
  nameRef.innerText =
    playerState.name.length > 15
      ? playerState.name.slice(0, 15) + "..."
      : playerState.name;

  let scoreRef = document.querySelector<HTMLSpanElement>(
    `#${id} .stat-li-score`
  );
  if (!scoreRef) {
    scoreRef = document.createElement("span");
    scoreRef.className = "stat-li-score";
    liRef.appendChild(scoreRef);
  } else {
  }
  scoreRef.innerText = playerState.score.toString();
};
