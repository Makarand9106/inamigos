const Volunteer = require('../models/Volunteer');

// @desc    Register a new volunteer
// @route   POST /api/volunteers
// @access  Public
const registerVolunteer = async (req, res) => {
  const { name, email, phone, project, message } = req.body;

  try {
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      project,
      message,
    });

    res.status(201).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private/Admin
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.json({ success: true, count: volunteers.length, data: volunteers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update volunteer status (Approve/Reject)
// @route   PUT /api/volunteers/:id
// @access  Private/Admin
const updateVolunteerStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer application not found' });
    }

    volunteer.status = status;
    await volunteer.save();

    res.json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerVolunteer,
  getVolunteers,
  updateVolunteerStatus,
};
