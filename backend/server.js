const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json', async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const apiResponse = await axios.get(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${lat}&lon=${lon}`);
        const locations = apiResponse.data;

        res.json(locations);
    } catch (error) {
        console.error('Error fetching pinball locations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})