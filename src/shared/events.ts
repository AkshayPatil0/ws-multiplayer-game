import { GameState, PlayerState, StarState } from "./dtos";

export interface ServerToClientEvents {
  player_connected: (id: string, state: PlayerState) => void;
  player_disconnected: (id: string) => void;
  opponent_update: (id: string, state: PlayerState) => void;
  self_update: (state: PlayerState) => void;
  star_moved: (state: StarState) => void;
  game_update: (state: GameState) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  start_game: (name: string, avatar: string, roomId: string) => void;
  exit_game: () => void;
  player_update: (state: PlayerState, roomId: string) => void;
  intersects_star: (roomId: string) => void;
}
