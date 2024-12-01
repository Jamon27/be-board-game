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

    const queue: Array<[[number, number], [number, number][]]> = [
      [start, [start]],
    ];
    const allPaths: string[][] = [];
    let shortestPaths: string[][] = [];
    let minPathLength = Infinity;

    while (queue.length > 0) {
      console.log(queue?.length);
      const [currentPosition, path] = queue.shift()!;
      const pathLength = path.length - 1; // Number of moves made

      // If path exceeds steps limit, skip
      if (pathLength > stepsLimit) continue;

      // If target reached within steps limit
      if (
        this.isTheSamePosition(currentPosition, end) &&
        pathLength <= stepsLimit
      ) {
        const pathInNotation = path.map(([file, rank]) =>
          this.chessboardMapper.mapPositionToChessNotation(file, rank),
        );
        allPaths.push(pathInNotation);

        if (pathLength < minPathLength) {
          // Found a shorter path
          minPathLength = pathLength;
          shortestPaths = [pathInNotation];
        } else if (pathLength === minPathLength) {
          // Found another shortest path
          shortestPaths.push(pathInNotation);
        }
        // Continue to find all possible paths
      }

      // Continue exploring possible moves
      if (pathLength < stepsLimit) {
        this.chessPiece.setPosition(currentPosition);
        const possibleMoves = this.chessPiece.getPossibleMoves();
        possibleMoves.forEach((move) => {
          queue.push([move, [...path, move]]);
        });
      }
    }

    return {
      shortestPaths: shortestPaths.map((path) => path.join(' -> ')),
      allPaths: allPaths.map((path) => path.join(' -> ')),
    };
  }

  private isTheSamePosition(
    pos1: [number, number],
    pos2: [number, number],
  ): boolean {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }
}
