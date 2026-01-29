import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import {
  createApplication,
  getApplicationsForSeeker,
  getApplicationsForJob,
  updateApplicationStatus,
  getJobById,
} from '../dataStore.js';

const router = express.Router();

// Job seeker applies to a job
router.post('/', requireAuth, requireRole('JOB_SEEKER'), (req, res) => {
  const { job_id, cover_letter } = req.body;
  if (!job_id) return res.status(400).json({ message: 'job_id is required' });
  const job = getJobById(job_id);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const result = createApplication(req.user.id, { job_id, cover_letter });
  if (result === 'DUPLICATE') {
    return res.status(409).json({ message: 'You already applied to this job' });
  }
  if (result === 'NO_JOB') {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(201).json({ application: result });
});

// Job seeker: my applications
router.get('/me', requireAuth, requireRole('JOB_SEEKER'), (req, res) => {
  const apps = getApplicationsForSeeker(req.user.id);
  res.json({ applications: apps });
});

// Employer: applicants for a job
router.get('/job/:jobId', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const jobId = Number(req.params.jobId);
  const apps = getApplicationsForJob(jobId, req.user.id);
  if (apps === 'NO_JOB') return res.status(404).json({ message: 'Job not found' });
  if (apps === 'FORBIDDEN') {
    return res.status(403).json({ message: 'Forbidden: not your job posting' });
  }
  res.json({ applications: apps });
});

// Employer: update status
router.patch('/:id/status', requireAuth, requireRole('EMPLOYER'), (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'status is required' });
  const updated = updateApplicationStatus(id, req.user.id, status);
  if (updated === 'NO_APP') return res.status(404).json({ message: 'Application not found' });
  if (updated === 'FORBIDDEN') {
    return res.status(403).json({ message: 'Forbidden: not your job posting' });
  }
  res.json({ application: updated });
});

export default router;
