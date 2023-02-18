import Player from "../entities/Player";
import { updateStats } from "../services/stats";

export type IOpponents = { [id: string]: Player };

let opponents: IOpponents = {};

export const getOpponents = () => opponents;

export const setOpponents = (updatedOpponents: IOpponents) => {
  opponents = updatedOpponents;
};
