import { ChessPiece } from './chess-piece';

export class Knight extends ChessPiece {
  private static moveOffsets = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  protected getMoveOffsets(): number[][] {
    return Knight.moveOffsets;
  }

  constructor(color: string, position: string) {
    super(color, position);
  }
}
