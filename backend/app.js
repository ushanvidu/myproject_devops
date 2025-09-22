require('dotenv').config(); // Add this at the very top
const express = require('express');
const { connectDB } = require('./config/database');
const app = express();
const cors = require('cors');

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/',(req,res)=>res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));