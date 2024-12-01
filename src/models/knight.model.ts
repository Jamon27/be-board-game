import { IChessboardMapper } from '../utils/chessboard-mapper.utils';
import { ChessPiece } from './chess-piece.model';

export class Knight extends ChessPiece {
  private static moveOffsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  protected getMoveOffsets(): number[][] {
    return Knight.moveOffsets;
  }

  constructor(
    color: string,
    position: string,
    chessboardMapper: IChessboardMapper,
  ) {
    super(color, position, chessboardMapper);
  }
}
