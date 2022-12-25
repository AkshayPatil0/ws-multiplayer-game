import { AVATARS } from "../constants/avatars";
import { PlayerState } from "../shared/dtos";

type StatsInput = {
  id?: string;
  state: PlayerState | null;
  own?: boolean;
};

export const updateStats = ({ id, state, own }: StatsInput) => {
  const statsRef = document.getElementById("stats");
  if (!statsRef) return;

  let ulRef = document.querySelector<HTMLUListElement>("#stats-ul");
  if (!ulRef) {
    ulRef = document.createElement("ul");
    ulRef.id = "stats-ul";
    statsRef.innerHTML = "";
    statsRef.appendChild(ulRef);
  }

  let elId;

  if (own) {
    elId = "own-stat";
  } else {
    elId = `opponent-stat-${id}`;
  }

  if (state === null) {
    deleteStatsLi(elId);
    return;
  }

  updateStatsLi(elId, state, ulRef);
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

  let nameRef = document.querySelector<HTMLSpanElement>(`#${id} .stat-li-name`);
  if (!nameRef) {
    nameRef = document.createElement("span");
    nameRef.className = "stat-li-name";
    nameRef.style.setProperty(
      "--avatar",
      `url("${AVATARS[playerState.avatar] || ""}")`
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

const deleteStatsLi = (id: string) => {
  const liRef = document.getElementById(id);
  if (liRef) liRef.remove();
};
