const request = require('supertest');
const express = require('express');
const app = express();

// Mock the /weather route (since we can't call the real API in tests)
app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    // Mock a successful response
    res.status(200).json({
        name: req.query.city,
        main: { temp: 20 },
        weather: [{ description: 'clear sky' }]
    });
});

describe('GET /weather', () => {
    it('should return 400 if city is not provided', async () => {
        const response = await request(app).get('/weather');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'City name is required');
    });

    it('should return weather data for a valid city', async () => {
        const response = await request(app).get('/weather?city=London');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'London');
        expect(response.body.main).toHaveProperty('temp', 20);
    });
});
