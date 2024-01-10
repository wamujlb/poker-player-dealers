import { DefaultEvaluator } from "./DefaultEvaluator";
import {
  Combination,
  Stage,
  PlayerItem,
  Rank,
  Suit,
  Card,
  GameState,
} from "./types";

const TOTAL_CARDS = 52;
const UNIQUE_HANDS = 7462;

const evaluator = new DefaultEvaluator();

export class Player {
  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    const me = this.getMe(gameState);
    const currentStage = this.getStage(gameState);

    const highCard = me.hole_cards.find((card) =>
      ["A", "K", "Q"].includes(card.rank)
    );
    betCallback(
      evaluator.evaluate([...me.hole_cards, ...gameState.community_cards]) >=
        2 || highCard
        ? this.getRaise(gameState.current_buy_in, gameState.minimum_raise, me)
        : 0
    );
  }

  getRaise = (
    current_buy_in: number,
    minimum_raise: number,
    me: PlayerItem
  ): number => {
    return current_buy_in - me.bet + minimum_raise;
  };

  getStage = ({ community_cards }: GameState): Stage => {
    if (community_cards.length === 0) return "preflop";
    if (community_cards.length === 3) return "flop";
    if (community_cards.length === 4) return "turn";
    if (community_cards.length === 5) return "river";
    return "preflop";
  };

  calculateOddsOfWinning(holeCards: Card[], communityCards: Card[]): number {
    const allCards = [...holeCards, ...communityCards];
    const handStrength = evaluator.evaluate([...holeCards, ...communityCards]);
    const totalOutcomes = Math.pow(TOTAL_CARDS - allCards.length, 2);
    const winningOutcomes = (totalOutcomes * handStrength) / 7462;

    // The odds of winning are the ratio of winning outcomes to total outcomes
    const oddsOfWinning = winningOutcomes / totalOutcomes;

    return oddsOfWinning;
  }

  getTable = (gameState: GameState): Card[] => {
    return gameState.community_cards;
  };

  getMe = (gameState: GameState): PlayerItem => {
    return gameState.players.find((player) => player.name === "Dealers")!;
  };

  public showdown(gameState: GameState): void {}
}

export default Player;
