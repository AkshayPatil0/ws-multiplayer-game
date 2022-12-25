import { PlayerState, StarState } from "./dtos";

export interface ServerToClientEvents {
  player_connected: (id: string, state: PlayerState) => void;
  player_disconnected: (id: string) => void;
  opponent_update: (id: string, state: PlayerState) => void;
  self_update: (state: PlayerState) => void;
  star_moved: (state: StarState) => void;
}

export interface ClientToServerEvents {
  start_game: (name: string, avatar: string) => void;
  exit_game: () => void;
  player_update: (state: PlayerState) => void;
  intersects_star: () => void;
}
