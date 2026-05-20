const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add your phone number'],
    },
    project: {
      type: String,
      required: [true, 'Please select a project/cause'],
      enum: [
        'Project Seva',
        'Project Bachpanshala',
        'Project Jeev',
        'Project Udaan',
        'Project Prakriti',
        'Project Vikas'
      ],
    },
    message: {
      type: String,
      required: [true, 'Please add a brief message about why you want to join'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
