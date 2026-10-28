const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const applicationRoutes=require('./routes/application.routes');
const companyRoutes=require('./routes/company.routes');
const profileRoutes=require('./routes/Profile.routes');
const uploadRoutes=require('./routes/upload.routes')
const jobRoutes = require('./routes/job.routes');

const app = express();

app.use(cors());

// app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/profiles',profileRoutes);
app.use('/api/uploads', uploadRoutes);

module.exports = app;