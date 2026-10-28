const jwt = require("jsonwebtoken");

async function authRecruiter(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "recruiter") {
            return res.status(403).json({ message: "You don't have access" });
        }

        req.user = decoded;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

async function authJobseeker(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "jobseeker" && decoded.role !== "recruiter") {
            return res.status(403).json({ message: "You don't have access" });
        }

        req.user = decoded;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { authRecruiter, authJobseeker };