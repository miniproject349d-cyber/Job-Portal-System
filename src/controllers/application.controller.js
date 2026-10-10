const applicationModel = require('../models/application.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createApplication(req, res) {
    const { jobId } = req.body;
    const userId = req.user.id;
    try {
        const newApplication = new applicationModel({
            jobId,
            userId
        });
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllApplications(req, res) {
    try {
        const applications = await applicationModel.find().populate('jobId').populate('userId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getApplicationById(req, res) {
    const { id } = req.params;
    try {
        const application = await applicationModel.findById(id).populate('jobId').populate('userId');
        res.status(200).json(application);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById
};