import express from 'express';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, getUserById } from '../dataStore.js';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password and role are required' });
  }
  if (!['JOB_SEEKER', 'EMPLOYER'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const password_hash = bcrypt.hashSync(password, 10);
  try {
    const created = createUser({ name, email, password_hash, role });
    const user = { id: created.id, name: created.name, email: created.email, role: created.role };

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.message === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

router.get('/me', requireAuth, (req, res) => {
  const user = getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

export default router;
