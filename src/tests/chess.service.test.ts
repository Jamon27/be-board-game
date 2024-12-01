import { Knight } from './../models/knight.model';
import { StandardChessboardMapper } from './../utils/chessboard-mapper.utils';
import { ChessPiece } from '../models/chess-piece.model';
import { ChessService } from '../services/chess.service';
import { IChessboardMapper } from '../utils/chessboard-mapper.utils';

describe('ChessService', () => {
  let chessPieceMock: jest.Mocked<ChessPiece>;
  let chessboardMapperMock: jest.Mocked<IChessboardMapper>;

  beforeEach(() => {
    chessPieceMock = {
      getPosition: jest.fn(),
      setPosition: jest.fn(),
      getPossibleMoves: jest.fn(),
    } as unknown as jest.Mocked<ChessPiece>;

    chessboardMapperMock = {
      parsePosition: jest.fn(),
      mapPositionToChessNotation: jest.fn(),
      isValidPosition: jest.fn(),
    };
  });

  describe('Initialization', () => {
    it('should initialize correctly with valid parameters', () => {
      const service = new ChessService(chessPieceMock, chessboardMapperMock);

      expect(service).toBeInstanceOf(ChessService);
    });
  });

  describe('calculatePath', () => {
    it('should throw an error for an invalid end position', () => {
      const chessboardMapper = new StandardChessboardMapper();
      const service = new ChessService(chessPieceMock, chessboardMapper);

      expect(() => service.calculatePath('z9', 3)).toThrow(
        'Invalid end position "z9". Must be in a1-h8 format.',
      );
    });

    it('should calculate the correct paths', () => {
      const chessboardMapper = new StandardChessboardMapper();

      chessPieceMock.getPosition.mockReturnValue('e5');
      chessPieceMock.getPossibleMoves.mockReturnValue([
        [6, 5], // g6
        [5, 6], // f7
      ]);

      const service = new ChessService(chessPieceMock, chessboardMapper);
      const result = service.calculatePath('g6', 3);

      expect(result.shortestPaths).toEqual(['e5 -> g6']);
      expect(result.allPaths).toEqual(['e5 -> g6', 'e5 -> f7 -> g6']);
    });

    it('should calculate the correct paths for knight at a1 to b7', () => {
      const chessboardMapper = new StandardChessboardMapper();
      const knight = new Knight('Black', 'a1', chessboardMapper);

      const service = new ChessService(knight, chessboardMapper);
      const result = service.calculatePath('b7', 3);

      expect(result.shortestPaths).toEqual([
        'a1 -> b3 -> a5 -> b7',
        'a1 -> b3 -> c5 -> b7',
      ]);
      expect(result.allPaths).toEqual([
        'a1 -> b3 -> a5 -> b7',
        'a1 -> b3 -> c5 -> b7',
      ]);
    });

    it('should calculate the correct paths for knight at d4 to f3', () => {
      const chessboardMapper = new StandardChessboardMapper();
      const knight = new Knight('Black', 'd4', chessboardMapper);

      const service = new ChessService(knight, chessboardMapper);
      const result = service.calculatePath('f3', 3);

      console.log(result);
      expect(result.shortestPaths).toEqual(['d4 -> f3']);
      expect(result.allPaths).toEqual([
        'd4 -> f3',
        'd4 -> b3 -> d2 -> f3',
        'd4 -> c2 -> e1 -> f3',
        'd4 -> c6 -> e5 -> f3',
        'd4 -> e2 -> g1 -> f3',
        'd4 -> e6 -> g5 -> f3',
        'd4 -> f5 -> h4 -> f3',
      ]);
    });

    it('should exclude paths longer than the steps limit', () => {
      chessboardMapperMock.parsePosition
        .mockReturnValueOnce([4, 4]) // Start position
        .mockReturnValueOnce([6, 5]); // End position

      chessPieceMock.getPosition.mockReturnValue('e5');
      chessPieceMock.getPossibleMoves.mockReturnValue([
        [6, 5], // g6
        [5, 6], // f7
      ]);

      chessboardMapperMock.mapPositionToChessNotation
        .mockReturnValueOnce('e5')
        .mockReturnValueOnce('g6');

      const service = new ChessService(chessPieceMock, chessboardMapperMock);
      const result = service.calculatePath('g6', 1); // Set steps limit to 1

      expect(result.shortestPaths).toEqual([]);
      expect(result.allPaths).toEqual([]);
    });

    it('should handle cases with no possible paths', () => {
      chessboardMapperMock.parsePosition
        .mockReturnValueOnce([4, 4]) // Start position
        .mockReturnValueOnce([7, 7]); // End position

      chessPieceMock.getPosition.mockReturnValue('e5');
      chessPieceMock.getPossibleMoves.mockReturnValue([]);

      const service = new ChessService(chessPieceMock, chessboardMapperMock);
      const result = service.calculatePath('h8', 3);

      expect(result.shortestPaths).toEqual([]);
      expect(result.allPaths).toEqual([]);
    });
  });
});
