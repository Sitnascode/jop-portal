import db from "./db.js";

// Migration helper - move JSON data to SQLite if exists
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data.json");

// One-time migration from JSON to SQLite
function migrateFromJson() {
  if (!fs.existsSync(dataPath)) return;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    // Migrate users
    for (const user of data.users || []) {
      try {
        db.prepare(
          `
          INSERT OR IGNORE INTO users (id, name, email, password_hash, role, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        ).run(
          user.id,
          user.name,
          user.email,
          user.password_hash,
          user.role,
          user.created_at,
        );
      } catch (e) {
        console.log(`Skipping user ${user.email} - already exists`);
      }
    }

    // Migrate job seeker profiles
    for (const profile of data.jobSeekerProfiles || []) {
      try {
        db.prepare(
          `
          INSERT OR IGNORE INTO job_seeker_profiles 
          (id, user_id, headline, skills, experience, education, location, resume_path, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        ).run(
          profile.id,
          profile.user_id,
          profile.headline,
          profile.skills,
          profile.experience,
          profile.education,
          profile.location,
          profile.resume_path,
          profile.created_at,
          profile.updated_at,
        );
      } catch (e) {
        console.log(`Skipping seeker profile for user ${profile.user_id}`);
      }
    }

    // Migrate employer profiles
    for (const profile of data.employerProfiles || []) {
      try {
        db.prepare(
          `
          INSERT OR IGNORE INTO employer_profiles 
          (id, user_id, company_name, website, location, description, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        ).run(
          profile.id,
          profile.user_id,
          profile.company_name,
          profile.website,
          profile.location,
          profile.description,
          profile.created_at,
          profile.updated_at,
        );
      } catch (e) {
        console.log(`Skipping employer profile for user ${profile.user_id}`);
      }
    }

    // Migrate jobs
    for (const job of data.jobs || []) {
      try {
        db.prepare(
          `
          INSERT OR IGNORE INTO jobs 
          (id, employer_id, title, description, location, job_type, experience_level, salary_range, tags, views, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        ).run(
          job.id,
          job.employer_id,
          job.title,
          job.description,
          job.location,
          job.job_type,
          job.experience_level,
          job.salary_range,
          job.tags,
          job.views || 0,
          job.created_at,
          job.updated_at,
        );
      } catch (e) {
        console.log(`Skipping job ${job.id}`);
      }
    }

    // Migrate applications
    for (const app of data.applications || []) {
      try {
        db.prepare(
          `
          INSERT OR IGNORE INTO applications 
          (id, job_id, seeker_id, status, cover_letter, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        ).run(
          app.id,
          app.job_id,
          app.seeker_id,
          app.status,
          app.cover_letter,
          app.created_at,
          app.updated_at,
        );
      } catch (e) {
        console.log(`Skipping application ${app.id}`);
      }
    }

    // Backup and remove JSON file
    fs.renameSync(dataPath, dataPath + ".backup");
    console.log(
      "✅ Migration completed! JSON data backed up to data.json.backup",
    );
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run migration on startup
migrateFromJson();

// Users
export function createUser({ name, email, password_hash, role }) {
  try {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, email, password_hash, role);
    return getUserById(result.lastInsertRowid);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("EMAIL_EXISTS");
    }
    throw error;
  }
}

export function getUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email) || null;
}

export function getUserById(id) {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id) || null;
}

// Job seeker profiles
export function getJobSeekerProfile(userId) {
  const stmt = db.prepare(
    "SELECT * FROM job_seeker_profiles WHERE user_id = ?",
  );
  return stmt.get(userId) || null;
}

export function upsertJobSeekerProfile(userId, fields) {
  const existing = getJobSeekerProfile(userId);
  const now = new Date().toISOString();

  if (!existing) {
    const stmt = db.prepare(`
      INSERT INTO job_seeker_profiles 
      (user_id, headline, skills, experience, education, location, resume_path, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      userId,
      fields.headline,
      fields.skills,
      fields.experience,
      fields.education,
      fields.location,
      fields.resume_path,
      now,
    );
    return db
      .prepare("SELECT * FROM job_seeker_profiles WHERE id = ?")
      .get(result.lastInsertRowid);
  } else {
    const stmt = db.prepare(`
      UPDATE job_seeker_profiles 
      SET headline = ?, skills = ?, experience = ?, education = ?, location = ?, resume_path = ?, updated_at = ?
      WHERE user_id = ?
    `);
    stmt.run(
      fields.headline,
      fields.skills,
      fields.experience,
      fields.education,
      fields.location,
      fields.resume_path,
      now,
      userId,
    );
    return getJobSeekerProfile(userId);
  }
}

// Employer profiles
export function getEmployerProfile(userId) {
  const stmt = db.prepare("SELECT * FROM employer_profiles WHERE user_id = ?");
  return stmt.get(userId) || null;
}

export function upsertEmployerProfile(userId, fields) {
  const existing = getEmployerProfile(userId);
  const now = new Date().toISOString();

  if (!existing) {
    const stmt = db.prepare(`
      INSERT INTO employer_profiles 
      (user_id, company_name, website, location, description, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      userId,
      fields.company_name,
      fields.website,
      fields.location,
      fields.description,
      now,
    );
    return db
      .prepare("SELECT * FROM employer_profiles WHERE id = ?")
      .get(result.lastInsertRowid);
  } else {
    const stmt = db.prepare(`
      UPDATE employer_profiles 
      SET company_name = ?, website = ?, location = ?, description = ?, updated_at = ?
      WHERE user_id = ?
    `);
    stmt.run(
      fields.company_name,
      fields.website,
      fields.location,
      fields.description,
      now,
      userId,
    );
    return getEmployerProfile(userId);
  }
}

// Jobs
export function searchJobs({ q, location, job_type, experience_level }) {
  let query = "SELECT * FROM jobs WHERE 1=1";
  const params = [];

  if (q) {
    query += " AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)";
    const term = `%${q}%`;
    params.push(term, term, term);
  }
  if (location) {
    query += " AND location LIKE ?";
    params.push(`%${location}%`);
  }
  if (job_type) {
    query += " AND job_type = ?";
    params.push(job_type);
  }
  if (experience_level) {
    query += " AND experience_level = ?";
    params.push(experience_level);
  }

  query += " ORDER BY created_at DESC";

  const stmt = db.prepare(query);
  return stmt.all(...params);
}

export function createJob(employerId, jobData) {
  const stmt = db.prepare(`
    INSERT INTO jobs (employer_id, title, description, location, job_type, experience_level, salary_range, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    employerId,
    jobData.title,
    jobData.description,
    jobData.location,
    jobData.job_type,
    jobData.experience_level,
    jobData.salary_range,
    jobData.tags,
  );
  return getJobById(result.lastInsertRowid);
}

export function getJobById(id) {
  const stmt = db.prepare("SELECT * FROM jobs WHERE id = ?");
  return stmt.get(id) || null;
}

export function incrementJobViews(id) {
  const stmt = db.prepare("UPDATE jobs SET views = views + 1 WHERE id = ?");
  stmt.run(id);
  return getJobById(id);
}

export function updateJob(id, employerId, fields) {
  const job = getJobById(id);
  if (!job) return null;
  if (job.employer_id !== employerId) return "FORBIDDEN";

  const stmt = db.prepare(`
    UPDATE jobs 
    SET title = ?, description = ?, location = ?, job_type = ?, experience_level = ?, salary_range = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(
    fields.title,
    fields.description,
    fields.location,
    fields.job_type,
    fields.experience_level,
    fields.salary_range,
    fields.tags,
    id,
  );
  return getJobById(id);
}

export function deleteJob(id, employerId) {
  const job = getJobById(id);
  if (!job) return null;
  if (job.employer_id !== employerId) return "FORBIDDEN";

  const stmt = db.prepare("DELETE FROM jobs WHERE id = ?");
  stmt.run(id);
  return true;
}

export function getEmployerJobsWithAnalytics(employerId) {
  const stmt = db.prepare(`
    SELECT j.*, COUNT(a.id) as applications
    FROM jobs j
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE j.employer_id = ?
    GROUP BY j.id
    ORDER BY j.created_at DESC
  `);
  return stmt.all(employerId);
}

// Applications
export function createApplication(seekerId, { job_id, cover_letter }) {
  // Check if application already exists
  const existingStmt = db.prepare(
    "SELECT id FROM applications WHERE job_id = ? AND seeker_id = ?",
  );
  const existing = existingStmt.get(job_id, seekerId);
  if (existing) return "DUPLICATE";

  // Check if job exists
  const job = getJobById(job_id);
  if (!job) return "NO_JOB";

  const stmt = db.prepare(`
    INSERT INTO applications (job_id, seeker_id, cover_letter)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(job_id, seekerId, cover_letter);
  return db
    .prepare("SELECT * FROM applications WHERE id = ?")
    .get(result.lastInsertRowid);
}

export function getApplicationsForSeeker(seekerId) {
  const stmt = db.prepare(`
    SELECT a.*, j.title, j.location
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.seeker_id = ?
    ORDER BY a.created_at DESC
  `);
  return stmt.all(seekerId);
}

export function getApplicationsForJob(jobId, employerId) {
  const job = getJobById(jobId);
  if (!job) return "NO_JOB";
  if (job.employer_id !== employerId) return "FORBIDDEN";

  const stmt = db.prepare(`
    SELECT a.*, u.name as seeker_name, u.email as seeker_email, 
           p.headline, p.skills, p.resume_path
    FROM applications a
    JOIN users u ON a.seeker_id = u.id
    LEFT JOIN job_seeker_profiles p ON u.id = p.user_id
    WHERE a.job_id = ?
    ORDER BY a.created_at DESC
  `);
  return stmt.all(jobId);
}

export function updateApplicationStatus(applicationId, employerId, status) {
  const stmt = db.prepare(`
    SELECT a.*, j.employer_id
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = ?
  `);
  const app = stmt.get(applicationId);
  if (!app) return "NO_APP";
  if (app.employer_id !== employerId) return "FORBIDDEN";

  const updateStmt = db.prepare(
    "UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  );
  updateStmt.run(status, applicationId);

  return db
    .prepare("SELECT * FROM applications WHERE id = ?")
    .get(applicationId);
}
