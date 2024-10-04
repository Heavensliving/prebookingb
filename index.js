import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import prebookRoutes from './routes/prebookroutes.js';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
  origin: 'https://prebooking.onrender.com', // Allow only your frontend's URL
  methods: ['GET', 'POST', 'OPTIONS'], // Ensure OPTIONS is allowed for preflight checks
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers if needed
}));

app.use(bodyParser.json());
app.use('/api', prebookRoutes); // Mount the prebook routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
