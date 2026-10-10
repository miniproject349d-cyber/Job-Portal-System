const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const applicationModel = require('../models/application.model');
const jobModel = require('../models/job.model');
const emailService = require('../services/email.service');

async function createApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user.id;
    try {
        // Check if the job exists
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        // Check if the user has already applied for this job
        const existingApplication = await applicationModel.findOne({ jobId, userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }
        else {
            const newApplication = new applicationModel({
                jobId,
                userId
            });
            await newApplication.save();
        }
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createCompany(req, res) {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCompany = new companyModel({
            name,
            email,
            password: hashedPassword,
        });
        await newCompany.save();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateCompany(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const company = await companyModel.findById(id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        if (name) company.name = name;
        if (email) company.email = email;
        if (password) {
            company.password = await bcrypt.hash(password, 10);
        }
        await company.save();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createApplication,
    createCompany,
    updateCompany
};


