const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailService=require("../services/email.service")

function buildToken(user) {
    return jwt.sign({
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role,
    });

    const token = buildToken(user);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
    await emailService.sendRegisterEmail(user.email,user.name);
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;
    const loginField = username || email;

    if (!loginField || !password) {
        return res.status(400).json({ message: "Username/email and password are required" });
    }

    const user = await userModel.findOne({
        $or: [{ username: loginField }, { email: loginField }],
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = buildToken(user);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
    });

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
}

async function logoutUser(req, res) {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({ message: "User logged out successfully" });
}

async function getUser(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        message: "user get successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
}
async function patchUser(req, res) {
    const userId = req.user.id;
    const { username, email, password } = req.body;


    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
        message: "User updated successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
}

module.exports = { registerUser, loginUser, logoutUser, getUser, patchUser };