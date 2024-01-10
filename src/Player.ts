import { DefaultEvaluator } from "./DefaultEvaluator";
import {
  Combination,
  combinationMapping,
  combinationStrength,
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
    console.log(gameState);
    const me = this.getMe(gameState);

    const highCard = me.hole_cards.find((card) =>
      ["A", "K", "Q"].includes(card.rank)
    );
    betCallback(
      evaluator.evaluate(me.hole_cards) >= 2 || highCard ? me.stack : 0
    );
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
