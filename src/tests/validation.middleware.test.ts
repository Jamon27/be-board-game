import request from 'supertest';
import app from '../app';
import { ChessService } from '../services/chess.service';

jest.mock('../services/chess.service');

describe('validateChessInput Middleware', () => {
  beforeEach(() => {
    // Clear mock implementations between tests
    jest.clearAllMocks();
    (ChessService.prototype.calculatePath as jest.Mock).mockReturnValue(
      'Mocked Result',
    );
  });

  it('should return 400 if startPosition or endPosition is missing', async () => {
    const res = await request(app).post('/api/chess/paths').send({
      chessPieceType: 'knight',
      stepsLimit: 2,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Invalid input format. Expected startPosition and endPosition as strings.',
    );
  });

  it('should return 400 if chessPieceType is not a string', async () => {
    const res = await request(app).post('/api/chess/paths').send({
      startPosition: 'a1',
      endPosition: 'b3',
      chessPieceType: 123,
      stepsLimit: 2,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Invalid input format. Expected chessPieceType to be string.',
    );
  });

  it('should return 400 if stepsLimit is not a number', async () => {
    const res = await request(app).post('/api/chess/paths').send({
      startPosition: 'a1',
      endPosition: 'b3',
      chessPieceType: 'knight',
      stepsLimit: 'two',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Invalid input format. Expected stepsLimit to be number.',
    );
  });

  it('should return 400 if stepsLimit is out of range', async () => {
    const res = await request(app).post('/api/chess/paths').send({
      startPosition: 'a1',
      endPosition: 'b3',
      chessPieceType: 'knight',
      stepsLimit: 10,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Invalid input format. Expected stepsLimit to be from 1 to 5',
    );
  });

  it('should return 200 for valid input', async () => {
    const res = await request(app).post('/api/chess/paths').send({
      startPosition: 'a1',
      endPosition: 'b3',
      chessPieceType: 'knight',
      stepsLimit: 2,
    });

    expect(res.statusCode).toBe(200);
  });
});
