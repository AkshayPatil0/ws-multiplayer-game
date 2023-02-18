export interface PlayerState {
  name: string;
  avatar: string;
  score: number;
  color: string;
  x: number;
  y: number;
  height: number;
  width: number;
}
export interface StarState {
  color: string;
  x: number;
  y: number;
  height: number;
  width: number;
}
export interface GameState {
  players: { [id: string]: PlayerState };
  star: StarState;
}
