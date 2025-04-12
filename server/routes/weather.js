const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  const { city } = req.query;  
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(weatherRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
module.exports = router;
