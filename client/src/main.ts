import "./styles/index.css";
import "./styles/app.css";
import "./styles/popup.css";
import "./styles/form.css";

const joinRoom = () => {
  const roomId = document
    .querySelector<HTMLInputElement>("#room-id")
    ?.value?.trim();

  if (!roomId) return;

  const params = new URLSearchParams();
  params.append("roomId", roomId);
  window.location.href = `/play?${params.toString()}`;
};

const joinButtonRef = document.querySelector(
  "#join-room-btn"
) as HTMLButtonElement;

joinButtonRef.addEventListener("click", joinRoom);
