import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getJobSeekerProfile, upsertJobSeekerProfile, getEmployerProfile, upsertEmployerProfile } from '../dataStore.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${req.user.id}-${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Job seeker profile
router.get('/seeker/me', requireAuth, requireRole('JOB_SEEKER'), (req, res) => {
  const profile = getJobSeekerProfile(req.user.id);
  res.json({ profile: profile || null });
});

router.post(
  '/seeker/me',
  requireAuth,
  requireRole('JOB_SEEKER'),
  upload.single('resume'),
  (req, res) => {
    const { headline, skills, experience, education, location } = req.body;
    const resume_path = req.file ? `/uploads/${req.file.filename}` : undefined;

    const profile = upsertJobSeekerProfile(req.user.id, {
      headline,
      skills,
      experience,
      education,
      location,
      ...(resume_path ? { resume_path } : {}),
    });
    res.json({ profile });
  }
);

// Employer profile
router.get('/employer/me', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const profile = getEmployerProfile(req.user.id);
  res.json({ profile: profile || null });
});

router.post('/employer/me', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const { company_name, website, location, description } = req.body;
  if (!company_name) {
    return res.status(400).json({ message: 'company_name is required' });
  }

  const profile = upsertEmployerProfile(req.user.id, {
    company_name,
    website,
    location,
    description,
  });
  res.json({ profile });
});

export default router;
