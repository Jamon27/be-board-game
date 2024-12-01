import { Knight } from '../models/knight.model';
import {
  IChessboardMapper,
  StandardChessboardMapper,
} from '../utils/chessboard-mapper.utils';

describe('Knight', () => {
  let chessboardMapperMock: jest.Mocked<IChessboardMapper>;

  beforeEach(() => {
    // Create a mock of IChessboardMapper
    chessboardMapperMock = {
      parsePosition: jest.fn(),
      mapPositionToChessNotation: jest.fn(),
      isValidPosition: jest.fn(),
    };
  });

  describe('Initialization', () => {
    it('should initialize correctly with valid parameters', () => {
      chessboardMapperMock.parsePosition.mockReturnValue([1, 2]);
      chessboardMapperMock.mapPositionToChessNotation.mockReturnValue('b3');
      const knight = new Knight('white', 'b3', chessboardMapperMock);

      expect(knight.color).toBe('white');
      expect(knight.getPosition()).toBe('b3');
      expect(
        chessboardMapperMock.mapPositionToChessNotation,
      ).toHaveBeenCalledWith(1, 2);
    });

    it('should throw an error if initialized with an invalid position', () => {
      chessboardMapperMock.parsePosition.mockReturnValue(null);

      expect(() => new Knight('white', 'z9', chessboardMapperMock)).toThrow(
        'Invalid position "z9". Must be in a1-h8 or A1-H8 format.',
      );
    });
  });

  describe('Position Management', () => {
    it('should set a valid string position and retrieve it correctly', () => {
      const chessboardMapper = new StandardChessboardMapper();
      const knight = new Knight('black', 'd4', chessboardMapper);

      expect(knight.getPosition()).toBe('d4');

      knight.setPosition('e5');
      expect(knight.getPosition()).toBe('e5');
    });

    it('should set a valid tuple position and retrieve it correctly', () => {
      const chessboardMapper = new StandardChessboardMapper();
      const knight = new Knight('black', 'd4', chessboardMapper);

      expect(knight.getPosition()).toBe('d4');

      knight.setPosition([1, 1]);
      expect(knight.getPosition()).toBe('b2');
    });

    it('should throw an error when setting an invalid position', () => {
      const chessboardMapper = new StandardChessboardMapper();

      const knight = new Knight('black', 'd4', chessboardMapper);

      expect(() => knight.setPosition('z9')).toThrow(
        'Invalid position "z9". Must be in a1-h8 or A1-H8 format.',
      );
    });
  });

  describe('Move Calculation', () => {
    it('should calculate valid knight moves within the board boundaries', () => {
      const chessboardMapper = new StandardChessboardMapper();

      const knight = new Knight('white', 'e5', chessboardMapper);

      const possibleMoves = knight.getPossibleMoves();
      expect(possibleMoves).toEqual(
        expect.arrayContaining([
          [2, 3], // c4
          [2, 5], // c6
          [3, 2], // d3
          [3, 6], // d7
          [5, 2], // f3
          [5, 6], // f7
          [6, 3], // g4
          [6, 5], // g6
        ]),
      );
    });

    it('should exclude moves outside the board boundaries', () => {
      const chessboardMapper = new StandardChessboardMapper();

      const knight = new Knight('black', 'a1', chessboardMapper);

      const possibleMoves = knight.getPossibleMoves();
      expect(possibleMoves).toEqual(
        expect.arrayContaining([
          [1, 2], // b3
          [2, 1], // c2
        ]),
      );
      expect(possibleMoves).not.toEqual(
        expect.arrayContaining([
          [-1, -2], // Invalid move outside the board
        ]),
      );
    });
  });
});
