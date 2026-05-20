const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Campaign = require('./models/Campaign');

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://inamigos-l8pw.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));

// Health Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        time: new Date()
    });
});

// Seed Function
const seedData = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            await User.create({
                name: 'InAmigos Admin',
                email: 'admin@inamigosfoundation.org.in',
                password: 'adminpassword123',
                role: 'admin',
            });

            console.log('Default admin created');
        }

        const campaignCount = await Campaign.countDocuments();

        if (campaignCount === 0) {
            await Campaign.insertMany([
                {
                    title: 'Project Bachpanshala',
                    description: 'Education support',
                    category: 'Education',
                    targetAmount: 500000,
                    raisedAmount: 185000,
                    active: true
                }
            ]);

            console.log('Campaign seeded');
        }

    } catch (error) {
        console.log('Seed Error:', error.message);
    }
};

// Start Server ONLY after DB connects
const startServer = async () => {
    try {

        await connectDB();

        console.log("MongoDB Connected");

        await seedData();

        const PORT = process.env.PORT || 4000;

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (error) {
        console.log("Startup Error:", error.message);
    }
};

startServer();