import { IChessboardMapper } from '../utils/chessboard-mapper.utils';
import { BoardPiece } from './board-piece.model';

type Position = [file: number, rank: number];

export abstract class ChessPiece extends BoardPiece {
  private position!: Position;
  private chessboardMapper: IChessboardMapper;

  constructor(
    color: string,
    position: string,
    chessboardMapper: IChessboardMapper,
  ) {
    super(color);
    this.chessboardMapper = chessboardMapper;
    this.setPosition(position);
  }

  protected abstract getMoveOffsets(): number[][];

  public getPossibleMoves(): Position[] {
    const [file, rank] = this.position; // x, y

    return this.getMoveOffsets()
      .map(([dx, dy]) => {
        const newFile = file + dx;
        const newRank = rank + dy;

        // Ensure the move is within the board boundaries
        if (this.chessboardMapper.isValidPosition(newFile, newRank)) {
          return [newFile, newRank];
        }
        return null;
      })
      .filter(Boolean) as Position[];
  }

  // Internal representation to chess notation
  public getPosition(): string {
    const [file, rank] = this.position;
    return this.chessboardMapper.mapPositionToChessNotation(file, rank);
  }

  public setPosition(newPosition: string | Position): void {
    if (typeof newPosition === 'string') {
      const parsedPosition = this.chessboardMapper.parsePosition(newPosition);
      if (parsedPosition === null) {
        throw new Error(
          `Invalid position "${newPosition}". Must be in a1-h8 or A1-H8 format.`,
        );
      }

      this.position = parsedPosition;
    } else {
      this.position = newPosition as Position;
    }
  }
}
