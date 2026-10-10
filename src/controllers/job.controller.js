const jobModel = require("../models/job.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createJob(req, res) {
    const { title, description, salary } = req.body;
    const recruiterRef = req.user.id; // Assuming the authenticated user's ID is stored in req.user
    try {
        const newJob = new jobModel({
            title,
            description,
            salary,
            recruiterRef
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getAllJobs(req, res) {
    try {
        const jobs = await jobModel.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getJobById(req, res) {
    const { id } = req.params;
    try {
        const job = await jobModel.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateJob(req, res) {
    const { id } = req.params;
    const { title, description, salary } = req.body;
    try {
        const job = await jobModel.findByIdAndUpdate(id, { title, description, salary }, { new: true });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteJob(req, res) {
    const { id } = req.params;
    try {
        const job = await jobModel.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};