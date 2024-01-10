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
        ? me.stack
        : 0
    );
  }

  getStage = ({ community_cards }: GameState): Stage => {
    if (community_cards.length === 0) return "preflop";
    if (community_cards.length === 3) return "flop";
    if (community_cards.length === 4) return "turn";
    if (community_cards.length === 5) return "river";
    return "preflop";
  };

  getTable = (gameState: GameState): Card[] => {
    return gameState.community_cards;
  };

  getMe = (gameState: GameState): PlayerItem => {
    return gameState.players.find((player) => player.name === "Dealers")!;
  };

  public showdown(gameState: GameState): void {}
}

export default Player;
