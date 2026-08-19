const { verify_token } = require('../services/set_token'); 

async function jwt_authenticate(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log("Token received:", token);  // Debugging

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const user = verify_token(token);  // Verify token using your custom function
        if (!user) {
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }

        // Attach the user to req.user
        req.user = user;  
        console.log("Authenticated user:", req.user);  // Debugging

        next();   
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { jwt_authenticate };
