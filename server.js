require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express(); 
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', reportRoutes);
app.use('/api', authRoutes);

// Health
app.get('/api/health', (req, res) => {
  const dbStatus = db && db.threadId ? 'connected' : 'initialized';
  res.json({ status: 'ok', db: dbStatus, time: new Date().toISOString() });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => 
  console.log(`🚀 Server running at http://localhost:${PORT}/api/health`)
);