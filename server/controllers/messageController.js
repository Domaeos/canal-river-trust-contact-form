const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = await Message.create({ name, email, subject, message });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Something went wrong. Try again later." });
    }
};
