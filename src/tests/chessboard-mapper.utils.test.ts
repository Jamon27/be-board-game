import request from 'supertest';
import app from '../app';

describe('GET /api', () => {
  it('should return 200 and a message', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, World!');
  });
});
