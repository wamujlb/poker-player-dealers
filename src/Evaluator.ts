import {Card} from "./Player";

export interface Evaluator {
    evaluate(hand: Card[]): number;
}