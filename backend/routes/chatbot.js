import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";

const router = express.Router();

dotenv.config(); // load .env file

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    const { model, messages } = req.body;
    console.log("message on backend: ", messages);

    if (!model || !messages) {
        return res.status(400).json({ error: "Model and messages are required" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
        });
        console.log("response on backend: ", response);
        res.status(200).json(response.choices[0].message);
    } catch (error) {
        console.error("Error creating chat completion:", error);
        res.status(500).json({ error: "Failed to create chat completion" });
    }
});

export default router;