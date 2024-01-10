type PlayerItem = {
  name: string;
  stack: number;
  status: string;
  bet: number;
  hole_cards: [];
  version: string;
  id: number;
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
  community_cards: [];
  current_buy_in: number;
  pot: number;
};

export class Player {
  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    betCallback(Math.min(gameState.current_buy_in * 2, 100));
  }

  public showdown(gameState: GameState): void {}
}

export default Player;
