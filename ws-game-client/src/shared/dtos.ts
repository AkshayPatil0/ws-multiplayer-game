export type PlayerState = {
  name: string;
  score: number;
  color: string;
  x: number;
  y: number;
  height: number;
  width: number;
  direction: { x: number; y: number };
};
export type BallState = {
  color: string;
  x: number;
  y: number;
  height: number;
  width: number;
};
