const bcrypt = require('bcrypt');
const { User } = require('../Models/User_Model');
const { DB_Connection } = require('../config/DB');
const { set_token_to_user } = require('../services/set_token');

DB_Connection();

// Signup Handler with Redirection
async function handlePostSignupForm(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Simplified password hashing

        const new_user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await new_user.save();

        if (!savedUser) {
            return res.status(400).json({ message: "User is not created!!" });
        }

        // Generate JWT Token
        const token = set_token_to_user(savedUser);
        console.log("Token:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 12,   
        });

        return res.status(201).json({ 
            message: "User registered successfully!", 
            token 
        });

    } catch (error) {
        console.error('Error in New_User Saving:', error);
        res.status(500).json({ msg: "Error in New_User Saving", err: error.message });
    }
}


// Logout
async function handleLogout(req, res) {
    res.clearCookie("token");
    return res.status(201).json({ 
        message: "User Logout successfully!", 
    });
}


// JWT-based Login Handler
async function handlePostUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = set_token_to_user(foundUser);
        console.log("Token:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 12,   
        });

        return res.status(201).json({ 
            message: "Login successful!", 
            token 
        });

    } catch (error) {
        res.status(500).json({ msg: "Error in User_Login", err: error.message });
    }
}

module.exports = {
    handlePostSignupForm,
    handleLogout,
    handlePostUserLogin,
};