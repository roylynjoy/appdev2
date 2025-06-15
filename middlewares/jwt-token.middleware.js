const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateAccessToken = (email) => {
    return jwt.sign( { email }, TOKEN_SECRET, { expiresIn: "1800s" });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access!",
        });
    }

    try {
        const validToken = jwt.verify(token, TOKEN_SECRET);

        if (validToken) {
            req.user = validToken;

            next();
        }
        console.log(validToken)
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generateAccessToken,
    authenticateToken,
};