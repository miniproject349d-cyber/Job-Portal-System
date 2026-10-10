const applicationModel = require('../models/application.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const profileModel=require("../models/Profile");


async function profile(req, res) {
    const { userId, name, email, phone, address, experience, skills } = req.body;
    try {
        const newProfile = new profileModel({
            userId,
            name,
            email,
            phone,
            address,
            experience,
            skills
        });
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getProfileByUserId(req, res) {
    const { userId } = req.params;
    try {
        const profile = await profileModel.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateProfile(req, res) {
    const { userId } = req.params;
    const { name, email, phone, address, experience, skills } = req.body;
    try {
        const profile = await profileModel.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (name) profile.name = name;
        if (email) profile.email = email;
        if (phone) profile.phone = phone;
        if (address) profile.address = address;
        if (experience) profile.experience = experience;
        if (skills) profile.skills = skills;
        const updatedProfile = await profile.save();
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProfile: profile,
    getProfileByUserId,
    updateProfile
};