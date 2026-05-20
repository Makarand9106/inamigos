const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

// @desc    Create a donation
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  const { campaign, donorName, donorEmail, amount, transactionId } = req.body;

  try {
    // 1. Create donation record
    const donation = await Donation.create({
      campaign: campaign || null,
      donorName,
      donorEmail,
      amount: Number(amount),
      transactionId: transactionId || `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Success', // Mock payment gateway success
    });

    // 2. If it's for a campaign, update the campaign's raisedAmount
    if (campaign) {
      const dbCampaign = await Campaign.findById(campaign);
      if (dbCampaign) {
        dbCampaign.raisedAmount += Number(amount);
        await dbCampaign.save();
      }
    }

    res.status(201).json({ success: true, data: donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).populate('campaign', 'title');
    res.json({ success: true, count: donations.length, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get donation statistics (total raised, total donations count)
// @route   GET /api/donations/stats
// @access  Public
const getDonationStats = async (req, res) => {
  try {
    const totalRaisedResult = await Donation.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalCampaigns = await Campaign.countDocuments({});
    const totalDonations = await Donation.countDocuments({ status: 'Success' });

    res.json({
      success: true,
      data: {
        totalRaised: totalRaisedResult[0] ? totalRaisedResult[0].total : 0,
        totalDonationsCount: totalDonations,
        totalCampaignsCount: totalCampaigns,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationStats,
};
