const express=require('express')
const connectDB=require('./config/db')
const dotenv = require('dotenv');
const path = require('path');

const cors=require('cors')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const turfRoutes = require('./routes/turfRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');




dotenv.config()
connectDB()
const app=express()
const allowedOrigins = [
  'https://polite-lolly-d6934f.netlify.app',
  'http://localhost:5173' // optional, for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // include this if you're sending cookies or tokens
}));
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/turfs', turfRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));



app.listen(process.env.PORT,()=>{
    console.log('connected to server')
})

