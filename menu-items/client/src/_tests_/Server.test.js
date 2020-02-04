/* eslint-disable no-undef */
const request = require('supertest');

describe('Express server', () => {
  it('Respond to a valid GET request to /api/menu/1', async () => {
    const response = await request('http://localhost:3000').get('/api/menu/1');
    expect(response.statusCode).toBe(202);
  });

  it('Respond to a valid GET request to /api/menu/59', async () => {
    const response = await request('http://localhost:3000').get('/api/menu/59');
    expect(response.statusCode).toBe(202);
  });

  it('should NOT respond to a valid GET request to /api/menu/200', async () => {
    const response = await request('http://localhost:3000').get('/api/menu/200');
    expect(response.statusCode).toBe(404);
  });
});
