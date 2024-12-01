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
        `Invalid end position "${endPosition}". Must be in a1-h8 format.`,
      );
    }

    const start = this.chessboardMapper.parsePosition(
      this.chessPiece.getPosition(),
    )!;

    const queue: Array<[[number, number], [number, number][]]> = [[start, []]];
    const allPaths: string[][] = [];
    let shortestPaths: string[][] = [];

    while (queue.length > 0) {
      const [currentPosition, path] = queue.shift()!;

      const newPath = [...path, currentPosition];

      // If target reached within limit
      if (
        currentPosition[0] === end[0] &&
        currentPosition[1] === end[1] &&
        newPath.length <= stepsLimit + 1
      ) {
        const pathInNotation = newPath.map(([file, rank]) =>
          this.chessboardMapper.mapPositionToChessNotation(file, rank),
        );
        allPaths.push(pathInNotation);

        if (
          !shortestPaths.length ||
          pathInNotation.length <= shortestPaths[0].length // works fine because we using breadth traverse
        ) {
          shortestPaths.push(pathInNotation);
        }
        continue;
      }

      // Stop exploring paths beyond the limit
      if (newPath.length > stepsLimit + 1) {
        continue;
      }

      // Temporarily set the chess piece to the current position
      this.chessPiece.setPosition([currentPosition[0], currentPosition[1]]);

      // Explore all possible moves from the current position
      const possibleMoves = this.chessPiece.getPossibleMoves();
      possibleMoves.forEach(([nextFile, nextRank]) => {
        if (
          !newPath.some(
            ([file, rank]) => file === nextFile && rank === nextRank,
          )
        ) {
          queue.push([[nextFile, nextRank], newPath]);
        }
      });
    }

    return {
      shortestPaths: shortestPaths.map((path) => path.join(' -> ')),
      allPaths: allPaths.map((path) => path.join(' -> ')),
    };
  }
}
