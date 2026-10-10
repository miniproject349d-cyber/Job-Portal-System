const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');

const app = express();

app.use(cors());

// app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/companies', require('./routes/company.routes'));
app.use('/api/profiles', require('./routes/profile.routes'));
app.use('/api/uploads', require('./routes/upload.routes'));

module.exports = app;