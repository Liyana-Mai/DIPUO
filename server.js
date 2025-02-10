require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

const API_URL = "https://api.teddy.org/podcasts";
const API_KEY = process.env.API_KEY;


app.get('/api/podcasts', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch podcasts");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));