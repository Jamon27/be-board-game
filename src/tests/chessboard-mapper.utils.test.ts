import { StandardChessboardMapper } from '../utils/chessboard-mapper.utils';

describe('StandardChessboardMapper', () => {
  let chessboardMapper: StandardChessboardMapper;

  beforeEach(() => {
    chessboardMapper = new StandardChessboardMapper();
  });

  describe('parsePosition', () => {
    it('should parse a valid position correctly', () => {
      expect(chessboardMapper.parsePosition('a1')).toEqual([0, 0]);
      expect(chessboardMapper.parsePosition('h8')).toEqual([7, 7]);
      expect(chessboardMapper.parsePosition('e5')).toEqual([4, 4]);
    });

    it('should return null for an invalid position', () => {
      expect(chessboardMapper.parsePosition('i9')).toBeNull();
      expect(chessboardMapper.parsePosition('z1')).toBeNull();
      expect(chessboardMapper.parsePosition('a0')).toBeNull();
    });

    it('should return null for non-standard input', () => {
      expect(chessboardMapper.parsePosition('')).toBeNull();
      expect(chessboardMapper.parsePosition('11')).toBeNull();
      expect(chessboardMapper.parsePosition('a')).toBeNull();
    });
  });

  describe('mapPositionToChessNotation', () => {
    it('should map valid file and rank to chess notation', () => {
      expect(chessboardMapper.mapPositionToChessNotation(0, 0)).toBe('a1');
      expect(chessboardMapper.mapPositionToChessNotation(7, 7)).toBe('h8');
      expect(chessboardMapper.mapPositionToChessNotation(4, 4)).toBe('e5');
    });

    it('should handle edge cases', () => {
      expect(chessboardMapper.mapPositionToChessNotation(0, 7)).toBe('a8');
      expect(chessboardMapper.mapPositionToChessNotation(7, 0)).toBe('h1');
    });
  });

  describe('isValidPosition', () => {
    it('should return true for valid file and rank', () => {
      expect(chessboardMapper.isValidPosition(0, 0)).toBe(true);
      expect(chessboardMapper.isValidPosition(7, 7)).toBe(true);
      expect(chessboardMapper.isValidPosition(4, 4)).toBe(true);
    });

    it('should return false for invalid file or rank', () => {
      expect(chessboardMapper.isValidPosition(-1, 0)).toBe(false);
      expect(chessboardMapper.isValidPosition(0, -1)).toBe(false);
      expect(chessboardMapper.isValidPosition(8, 0)).toBe(false);
      expect(chessboardMapper.isValidPosition(0, 8)).toBe(false);
    });
  });
});
