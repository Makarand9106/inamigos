const express = require('express');
const router = express.Router();
const { createDonation, getDonations, getDonationStats } = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createDonation)
  .get(protect, admin, getDonations);

router.get('/stats', getDonationStats);

module.exports = router;
