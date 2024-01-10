type PlayerItem = {
  name: string;
  stack: number;
  status: string;
  bet: number;
  hole_cards: Card[];
  version: string;
  id: number;
};

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

type Suit = "spades" | "hearts" | "clubs" | "diamonds";

export type Card = {
  rank: Rank;
  suit: Suit;
};

type GameState = {
  players: PlayerItem[];
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  orbits: number;
  dealer: number;
  community_cards: Card[];
  current_buy_in: number;
  pot: number;
};

export class Player {
  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    console.log(gameState);
    const me = this.getMe(gameState);
    const hasPair = this.hasPair(gameState);
    betCallback(hasPair ? me.stack : 0);
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
