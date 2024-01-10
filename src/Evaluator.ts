import {Card, PokerHand} from "./types";

export interface Evaluator {
    evaluate(hand: Card[]): number;

    evaluateAndGetPokerHand(hand: Card[]): PokerHand;
}