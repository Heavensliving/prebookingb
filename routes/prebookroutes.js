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

// GET route to fetch the total count of pre-bookings
router.get('/prebook/count', async (req, res) => {
  try {
    const totalPreBookings = await PreBook.countDocuments();
    return res.status(200).json({ totalBookings: totalPreBookings });
  } catch (error) {
    console.error('Error fetching total pre-bookings:', error);
    return res.status(500).json({ message: 'Error fetching total pre-bookings', error: error.message });
  }
});

// GET route to fetch the total sum of custom payments
router.get('/prebook/custom-payment-sum', async (req, res) => {
  try {
    const customPaymentTotal = await PreBook.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          totalCustomAmount: { $sum: "$customAmount" } // Sum all customAmount fields
        }
      }
    ]);

    const totalAmount = customPaymentTotal.length > 0 ? customPaymentTotal[0].totalCustomAmount : 0;

    return res.status(200).json({ totalCustomPayment: totalAmount });
  } catch (error) {
    console.error('Error fetching total custom payments:', error);
    return res.status(500).json({ message: 'Error fetching total custom payments', error: error.message });
  }
});

// GET route to fetch all pre-book details
router.get('/prebook/all', async (req, res) => {
  try {
    const preBookings = await PreBook.find({}, 'name contactNumber'); // Only get name and contactNumber
    return res.status(200).json(preBookings);
  } catch (error) {
    console.error('Error fetching pre-book details:', error);
    return res.status(500).json({ message: 'Error fetching pre-book details', error: error.message });
  }
});



export default router; // Use export default


 
