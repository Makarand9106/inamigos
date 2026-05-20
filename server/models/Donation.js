const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.ObjectId,
      ref: 'Campaign',
      required: false, // Can be a general donation
    },
    donorName: {
      type: String,
      required: [true, 'Please add your name'],
    },
    donorEmail: {
      type: String,
      required: [true, 'Please add your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a donation amount'],
      min: [1, 'Donation must be at least 1 INR'],
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Success', 'Pending', 'Failed'],
      default: 'Success',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);
