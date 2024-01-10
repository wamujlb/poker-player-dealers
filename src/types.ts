export type Combination =
  | "fiveKind"
  | "fourKind"
  | "fullHouse"
  | "threeKind"
  | "twoPair"
  | "onePair"
  | "highCard";

export const combinationMapping: Record<string, Combination> = {
  "5": "fiveKind",
  "14": "fourKind",
  "23": "fullHouse",
  "113": "threeKind",
  "122": "twoPair",
  "1112": "onePair",
  "11111": "highCard",
} as const;

export const combinationStrength = {
  fiveKind: 7,
  fourKind: 6,
  fullHouse: 5,
  threeKind: 4,
  twoPair: 3,
  onePair: 1,
  highCard: 0,
} as const;

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
