import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getGeminiReply } from './geminiHandler.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const reply = await getGeminiReply(userMessage);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Something went wrong.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
