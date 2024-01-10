import { Card } from "./types";

export interface Evaluator {
  evaluate(hand: Card[]): number;
}
