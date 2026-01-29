import express from 'express';
import { searchJobs, createJob, getJobById, incrementJobViews, updateJob, deleteJob, getEmployerJobsWithAnalytics } from '../dataStore.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public job search with filters
router.get('/', (req, res) => {
  const { q, location, job_type, experience_level } = req.query;
  const jobs = searchJobs({ q, location, job_type, experience_level });
  res.json({ jobs });
});

// Create job (employer only)
router.post('/', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const {
    title,
    description,
    location,
    job_type,
    experience_level,
    salary_range,
    tags,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  const job = createJob(req.user.id, {
    title,
    description,
    location,
    job_type,
    experience_level,
    salary_range,
    tags,
  });
  res.status(201).json({ job });
});

// Get single job + increment views
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const job = getJobById(id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  const updated = incrementJobViews(id) || job;
  res.json({ job: updated });
});

// Update job (employer owner)
router.put('/:id', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const id = Number(req.params.id);
  const {
    title,
    description,
    location,
    job_type,
    experience_level,
    salary_range,
    tags,
  } = req.body;

  const job = updateJob(id, req.user.id, {
    ...(title && { title }),
    ...(description && { description }),
    ...(location && { location }),
    ...(job_type && { job_type }),
    ...(experience_level && { experience_level }),
    ...(salary_range && { salary_range }),
    ...(tags && { tags }),
  });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job === 'FORBIDDEN') {
    return res.status(403).json({ message: 'Forbidden: not your job posting' });
  }
  res.json({ job });
});

// Delete job
router.delete('/:id', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const id = Number(req.params.id);
  const result = deleteJob(id, req.user.id);
  if (!result) return res.status(404).json({ message: 'Job not found' });
  if (result === 'FORBIDDEN') {
    return res.status(403).json({ message: 'Forbidden: not your job posting' });
  }
  res.status(204).send();
});

// Employer dashboard: jobs + basic analytics
router.get('/employer/mine/list', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const jobs = getEmployerJobsWithAnalytics(req.user.id);
  res.json({ jobs });
});

export default router;
