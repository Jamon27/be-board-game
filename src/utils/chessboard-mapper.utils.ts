export interface IChessboardMapper {
  parsePosition(position: string): [number, number] | null;
  mapPositionToChessNotation(file: number, rank: number): string;
  isValidPosition(file: number, rank: number): boolean;
}

export class StandardChessboardMapper implements IChessboardMapper {
  parsePosition(position: string): [number, number] | null {
    const file = position.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(position[1], 10) - 1;

    if (!this.isValidPosition(file, rank)) {
      return null;
    }

    return [file, rank];
  }

  mapPositionToChessNotation(file: number, rank: number): string {
    return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
  }

  isValidPosition(file: number, rank: number): boolean {
    return file >= 0 && file < 8 && rank >= 0 && rank < 8;
  }
}
