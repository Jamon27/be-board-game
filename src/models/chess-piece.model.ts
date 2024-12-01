import { BoardPiece } from './board-piece.model';

type Position = [file: number, rank: number];

export abstract class ChessPiece extends BoardPiece {
  private position!: Position;

  constructor(color: string, position: string) {
    super(color);
    this.setPosition(position);
  }

  // Static getter for moveOffsets
  protected abstract getMoveOffsets(): number[][];

  // Calculate possible moves using moveOffsets
  public getPossibleMoves(): string[] {
    const [file, rank] = this.position;

    return this.getMoveOffsets()
      .map(([dx, dy]) => {
        const newFile = file + dx;
        const newRank = rank + dy;

        // Ensure the move is within the board boundaries
        if (this.isValidPosition([newFile, newRank])) {
          return (
            String.fromCharCode('a'.charCodeAt(0) + newFile) + (newRank + 1)
          );
        }
        return null;
      })
      .filter(Boolean) as string[];
  }

  // Internal representation to chess notation
  public getPosition(): string {
    const [file, rank] = this.position;
    return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
  }

  public setPosition(newPosition: string): void {
    this.position = this.parsePosition(newPosition);
  }

  private parsePosition(position: string): Position {
    const file = position.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(position[1], 10) - 1;

    if (!this.isValidPosition([file, rank])) {
      throw new Error(
        `Invalid position "${position}". Must be in a1-h8 format.`,
      );
    }

    return [file, rank];
  }

  private isValidPosition([file, rank]: Position): boolean {
    return file >= 0 && file < 8 && rank >= 0 && rank < 8;
  }

  // public getNumericPosition(): number[] {
  //   return this.position;
  // }
}
