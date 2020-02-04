/* eslint-disable no-undef */
const request = require('supertest');

describe('Express server', () => {
  it('Responds to a valid GET request to /api/nearby/1', async () => {
    const response = await request('http://localhost:1337').get('/api/nearby/1');
    expect(response.statusCode).toBe(200);
  });

  it('Respond to a valid GET request to /api/nearby/59', async () => {
    const response = await request('http://localhost:1337').get('/api/nearby/99');
    expect(response.statusCode).toBe(200);
  });

  it('Should NOT respond to an invalid GET request to /api/nearby/200', async () => {
    const response = await request('http://localhost:1337').get('/api/nearby/200');
    expect(response.statusCode).toBe(400);
  });

  it('Responds to a valid PUT request to /api/nearby/1', async () => {
    const response = await request('http://localhost:1337').put('/api/nearby/1?restaurantId=1&increment=1');
    expect(response.statusCode).toBe(202);
  });

  it('Should NOT respond to an invalid PUT request to /api/nearby/200', async () => {
    const response = await request('http://localhost:1337').put('/api/nearby/200');
    expect(response.statusCode).toBe(400);
  });

  it('Should recieve an ERROR message for invalid query on PUT request to /api/nearby/2?restaurantId=1&increment=1',
    async () => {
      const response = await request('http://localhost:1337').put('/api/nearby/2');
      expect(response.statusCode).toBe(400);
    });
});
