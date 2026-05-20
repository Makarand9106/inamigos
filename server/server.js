const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Campaign = require('./models/Campaign');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// Seed default data
const seedData = async () => {
  try {
    // 1. Seed default Admin if not exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'InAmigos Admin',
        email: 'admin@inamigosfoundation.org.in',
        password: 'adminpassword123', // Will be hashed via pre-save hook
        role: 'admin',
      });
      console.log('Seeded default admin: admin@inamigosfoundation.org.in / adminpassword123');
    }

    // 2. Seed default campaigns if none exist
    const campaignCount = await Campaign.countDocuments();
    if (campaignCount === 0) {
      const defaultCampaigns = [
        {
          title: 'Project Bachpanshala: Educating Children',
          description: 'Bridging educational gaps for underprivileged children by providing quality education, digital literacy, and life skills training in Bilaspur.',
          category: 'Education',
          targetAmount: 500000,
          raisedAmount: 185000,
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
          active: true
        },
        {
          title: 'Project Seva: Daily Meals & Clothing Support',
          description: 'Providing cooked meals, clean drinking water, and warm blankets to the homeless and daily wage laborers.',
          category: 'Food & Clothing',
          targetAmount: 300000,
          raisedAmount: 145000,
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
          active: true
        },
        {
          title: 'Project Jeev: Feeding & Caring for Stray Animals',
          description: 'Feeding programs, rescue efforts, and placing reflective safety collars for street animals to reduce road accidents.',
          category: 'Animal Welfare',
          targetAmount: 200000,
          raisedAmount: 62000,
          image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
          active: true
        },
        {
          title: 'Project Udaan: Women Empowerment & Skills',
          description: 'Empowering women in rural areas through tailoring classes, digital literacy, and distributing menstrual hygiene kits.',
          category: 'Women Empowerment',
          targetAmount: 400000,
          raisedAmount: 210000,
          image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
          active: true
        },
        {
          title: 'Project Prakriti: Planting 50,000 Trees',
          description: 'Promoting local biodiversity and combatting climate change by executing tree plantation campaigns and clean-up drives.',
          category: 'Environment',
          targetAmount: 250000,
          raisedAmount: 98000,
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          active: true
        }
      ];
      await Campaign.insertMany(defaultCampaigns);
      console.log('Seeded 5 default campaigns successfully!');
    }
  } catch (error) {
    console.error('Data seeding failed:', error.message);
  }
};

seedData();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
