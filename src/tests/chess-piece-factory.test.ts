import { Knight } from '../models/knight.model';
import { ChessPieceFactory } from '../utils/chess-piece-factory';
import { StandardChessboardMapper } from '../utils/chessboard-mapper.utils';

describe('ChessPieceFactory', () => {
  let chessboardMapper: StandardChessboardMapper;

  beforeEach(() => {
    chessboardMapper = new StandardChessboardMapper();
  });

  it('should create a Knight when type is "knight"', () => {
    const chessPiece = ChessPieceFactory.create(
      'knight',
      'white',
      'e4',
      chessboardMapper,
    );

    expect(chessPiece).toBeInstanceOf(Knight);
    expect(chessPiece.color).toBe('white');
    expect(chessPiece.getPosition()).toBe('e4');
  });

  it('should throw an error for an unsupported chess piece type', () => {
    expect(() => {
      ChessPieceFactory.create('bishop', 'white', 'e4', chessboardMapper);
    }).toThrow('Unsupported chess piece type: bishop');
  });

  it('should be case-insensitive for type', () => {
    const chessPiece = ChessPieceFactory.create(
      'KnIgHt',
      'black',
      'g3',
      chessboardMapper,
    );

    expect(chessPiece).toBeInstanceOf(Knight);
    expect(chessPiece.color).toBe('black');
    expect(chessPiece.getPosition()).toBe('g3');
  });
});
