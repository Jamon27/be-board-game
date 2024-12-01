import { Knight } from '../models/knight.model';
import { ChessPiece } from '../models/chess-piece.model';
import { StandardChessboardMapper } from '../utils/chessboard-mapper.utils';

export class ChessPieceFactory {
  static create(
    type: string,
    color: string,
    position: string,
    chessboardMapper: StandardChessboardMapper,
  ): ChessPiece {
    switch (type.toLowerCase()) {
      case 'knight':
        return new Knight(color, position, chessboardMapper);
      default:
        throw new Error(`Unsupported chess piece type: ${type}`);
    }
  }
}
