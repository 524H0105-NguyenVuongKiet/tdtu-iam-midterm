require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db'); 

const app = express();

// Kết nối Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Dòng này giúp server hiểu và chạy file HTML trong thư mục public
app.use(express.static('public'));

// Route test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to IAM System API - Web Programming Midterm' });
});

// === CẮM ROUTE ĐĂNG KÝ/ĐĂNG NHẬP VÀO ===
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);
// =======================================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
});

