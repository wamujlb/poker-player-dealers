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

export class Player {
  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    console.log(gameState);
    const me = this.getMe(gameState);
    const hasPair = this.hasPair(gameState);
    const highCard = me.hole_cards.find(
      (card) => card.rank === "A" || card.rank === "K"
    );
    betCallback(hasPair || highCard ? me.stack : 0);
  }

  hasPair = (gameState: GameState): boolean => {
    const me = this.getMe(gameState);
    const myCards = me.hole_cards;
    if (myCards[0].rank === myCards[1].rank) {
      return true;
    }
    return false;
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
