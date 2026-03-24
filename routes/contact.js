const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    console.log('Contact request body:', req.body);
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    
    res.json({ message: 'Message sent successfully and saved to DB' });
  } catch (error) {
    console.error('Contact error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;

