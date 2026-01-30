import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.js";
import profileRoutes from "./src/routes/profiles.js";
import jobRoutes from "./src/routes/jobs.js";
import applicationRoutes from "./src/routes/applications.js";

// Verify routes are loaded
console.log('Route imports:', {
  authRoutes: typeof authRoutes,
  profileRoutes: typeof profileRoutes,
  jobRoutes: typeof jobRoutes,
  applicationRoutes: typeof applicationRoutes
});

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration - Allow multiple origins flexibly
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port for development
    if (origin.match(/^https?:\/\/localhost(:\d+)?$/)) {
      return callback(null, true);
    }
    
    // Allow Vercel deployments
    if (origin.match(/^https:\/\/.*\.vercel\.app$/)) {
      return callback(null, true);
    }
    
    // Allow Railway deployments
    if (origin.match(/^https:\/\/.*\.railway\.app$/)) {
      return callback(null, true);
    }
    
    // Allow specific production frontend
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    
    console.log(`CORS blocked origin: ${origin}`);
    console.log(`FRONTEND_URL env: ${process.env.FRONTEND_URL || 'not set'}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Static for uploaded resumes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Job portal API running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    routes: {
      auth: '/auth (POST /register, POST /login, GET /me)',
      jobs: '/jobs (GET, POST)',
      profiles: '/profiles',
      applications: '/applications'
    }
  });
});

// Test endpoint to verify routes are working
app.get('/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  });
});

// Routes with debugging
console.log('Loading routes...');
app.use("/auth", (req, res, next) => {
  console.log(`Auth route: ${req.method} ${req.path}`);
  next();
}, authRoutes);

app.use("/profiles", (req, res, next) => {
  console.log(`Profile route: ${req.method} ${req.path}`);
  next();
}, profileRoutes);

app.use("/jobs", (req, res, next) => {
  console.log(`Job route: ${req.method} ${req.path}`);
  next();
}, jobRoutes);

app.use("/applications", (req, res, next) => {
  console.log(`Application route: ${req.method} ${req.path}`);
  next();
}, applicationRoutes);

console.log('Routes loaded successfully');

// 404 handler
app.use("*", (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Frontend URL from env: ${process.env.FRONTEND_URL || 'not set'}`);
  console.log('CORS will allow:');
  console.log('- localhost on any port');
  console.log('- *.vercel.app domains');
  console.log('- *.railway.app domains');
  console.log('- FRONTEND_URL if set');
});
