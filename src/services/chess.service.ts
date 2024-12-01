import { ChessPiece } from '../models/chess-piece.model';
import { IChessboardMapper } from '../utils/chessboard-mapper.utils';

interface ICalculatedPaths {
  shortestPaths: string[];
  allPaths: string[];
}

export class ChessService {
  private readonly chessboardMapper;
  private chessPiece: ChessPiece;
  constructor(chessPiece: ChessPiece, chessboardMapper: IChessboardMapper) {
    this.chessboardMapper = chessboardMapper;
    this.chessPiece = chessPiece;
  }

  calculatePath(endPosition: string, stepsLimit: number): ICalculatedPaths {
    const end = this.chessboardMapper.parsePosition(endPosition);
    if (end === null) {
      throw new Error(
        `Invalid end position "${end}". Must be in a1-h8 format.`,
      );
    }

    return { shortestPaths: [], allPaths: [] };
  }
}
