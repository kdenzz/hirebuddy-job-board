const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const jobRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resume');
const keywordRoutes = require('./routes/keywords');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/keywords', keywordRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('DB connection error:', err));