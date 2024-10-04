// routes/prebookroutes.js
import express from 'express'; // Use import syntax
import PreBook from '../models/prebookmodel.js'; // Ensure to add the .js extension

const router = express.Router();

// POST route for creating a pre-booking entry
router.post('/prebook', async (req, res) => {
  try {
    const newPreBook = new PreBook(req.body);
    await newPreBook.save();
    return res.status(201).json({ message: 'Pre-booking created successfully', data: newPreBook });
  } catch (error) {
    console.error('Error creating pre-booking:', error);
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ message: 'Transaction ID must be unique', error: error.message });
    }
    return res.status(500).json({ message: 'Error creating pre-booking', error: error.message });
  }
});

export default router; // Use export default
