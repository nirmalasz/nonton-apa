const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cassandra = require('cassandra-driver');
const userRepository = require('../repositories/userRepository');


const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await userRepository.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already taken." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = cassandra.types.Uuid.random();

        await userRepository.createUser(userId, username, hashedPassword);
        res.status(201).json({ success: true, message: "User registered successfully!" });
        
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "An internal server error occurred during registration." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username " });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password " });
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: user.user_id, username: user.username },
            secret,
            { expiresIn: '24h' }
        );

        res.status(200).json({ token });
        
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "An internal server error occurred during login." });
    }
};

module.exports = { register, login };