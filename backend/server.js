import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './src/routes/auth.js';
import profileRoutes from './src/routes/profiles.js';
import jobRoutes from './src/routes/jobs.js';
import applicationRoutes from './src/routes/applications.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Static for uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Job portal API running' });
});

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
