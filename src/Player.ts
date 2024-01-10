type PlayerItem = {
  name: string;
  stack: number;
  status: string;
  bet: number;
  hole_cards: HoleCard[];
  version: string;
  id: number;
};

type Rank =
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

type HoleCard = {
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
  community_cards: HoleCard[];
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
    betCallback(Math.min(gameState.current_buy_in * 2, me.stack));
  }

  getMe = (gameState: GameState): PlayerItem => {
    return gameState.players.find((player) => player.name === "Dealers")!;
  };

  public showdown(gameState: GameState): void {}
}

export default Player;
