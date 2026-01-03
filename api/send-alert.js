const twilio = require('twilio');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { message, lat, lon } = req.body;
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        await client.messages.create({
            body: `[SENTRY ALERT] ${message}. Loc: https://www.google.com/maps?q=${lat},${lon}`,
            to: process.env.EMERGENCY_PHONE,
            from: process.env.TWILIO_PHONE
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
