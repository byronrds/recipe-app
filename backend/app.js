import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chatbotRouter from './routes/chatbot.js';
import recipesRouter from './routes/recipes.js';
dotenv.config(); // load .env file

import admin from 'firebase-admin';
const serviceAccount = await import('./permissions.json', { with: { type: 'json' } });

const app = express();
const port = 5001;

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIRESTORE_PROJECT_ID,
		privateKey: process.env.FIRESTORE_PRIVATE_KEY,
		clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
	}),
});

export const db = admin.firestore();

app.use(bodyParser.json());
app.use('/chat', chatbotRouter);
app.use('/recipes', recipesRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
