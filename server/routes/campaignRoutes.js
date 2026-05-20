const express = require('express');
const router = express.Router();
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCampaigns)
  .post(protect, admin, createCampaign);

router.route('/:id')
  .get(getCampaignById)
  .put(protect, admin, updateCampaign)
  .delete(protect, admin, deleteCampaign);

module.exports = router;
