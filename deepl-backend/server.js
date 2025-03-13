import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import * as deepl from 'deepl-node'

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const authKey = process.env.DEEPL_API_KEY; // Load API key from environment
const translator = new deepl.Translator(authKey);

app.post("/translate", async (req, res) => {
    const { text, target_lang } = req.body;

    if (!text || !target_lang) {
        return res.status(400).json({ error: "Missing text or target_lang" });
    }

    try {
        const result = await translator.translateText(text, null, target_lang);
        res.json({ translatedText: result.text });
    } catch (error) {
        console.error("DeepL API error:", error.message);
        res.status(500).json({ error: "Translation failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

