const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a campaign title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Education',
        'Women Empowerment',
        'Food & Clothing',
        'Animal Welfare',
        'Environment',
        'Skill Development',
        'General'
      ],
      default: 'General',
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please add a target amount'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Campaign', campaignSchema);
