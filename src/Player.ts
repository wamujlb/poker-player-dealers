type GameState = { current_buy_in: number };

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
