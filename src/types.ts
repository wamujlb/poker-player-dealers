export type Combination =
  | "fiveKind"
  | "fourKind"
  | "fullHouse"
  | "threeKind"
  | "twoPair"
  | "onePair"
  | "highCard";

export type PlayerItem = {
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

export type Suit = "spades" | "hearts" | "clubs" | "diamonds";

export type Card = {
  rank: Rank;
  suit: Suit;
};

export type GameState = {
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

export type Stage = "preflop" | "flop" | "turn" | "river";

export type MyCombination = {
  combination: Combination;
  highCard: Rank;
};
