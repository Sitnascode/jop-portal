import bcrypt from "bcryptjs";
import { createUser, createJob, createApplication } from "./src/dataStore.js";

async function seedDemoData() {
  console.log("🌱 Seeding demo data...");

  try {
    // Create demo users
    const seekerUser = createUser({
      name: "John Seeker",
      email: "seeker@demo.com",
      password_hash: bcrypt.hashSync("password", 10),
      role: "JOB_SEEKER",
    });

    const employerUser = createUser({
      name: "Tech Corp",
      email: "employer@demo.com",
      password_hash: bcrypt.hashSync("password", 10),
      role: "EMPLOYER",
    });

    const employer2User = createUser({
      name: "StartupXYZ",
      email: "startup@demo.com",
      password_hash: bcrypt.hashSync("password", 10),
      role: "EMPLOYER",
    });

    // Create demo jobs
    const jobs = [
      {
        title: "Senior Frontend Developer",
        description: `We're looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building modern, responsive web applications using React, TypeScript, and other cutting-edge technologies.

Key Responsibilities:
• Develop and maintain high-quality frontend applications
• Collaborate with designers and backend developers
• Optimize applications for maximum speed and scalability
• Mentor junior developers and contribute to code reviews

Requirements:
• 5+ years of experience with React and JavaScript
• Strong knowledge of TypeScript, HTML5, and CSS3
• Experience with modern build tools (Webpack, Vite)
• Familiarity with testing frameworks (Jest, Cypress)
• Excellent problem-solving and communication skills`,
        location: "San Francisco, CA",
        job_type: "FULL_TIME",
        experience_level: "SENIOR",
        salary_range: "$120,000 - $160,000",
        tags: "React, TypeScript, JavaScript, HTML, CSS, Frontend, Web Development",
      },
      {
        title: "Full Stack Engineer",
        description: `Join our innovative startup as a Full Stack Engineer! You'll work on exciting projects that impact thousands of users daily. We're building the next generation of productivity tools.

What you'll do:
• Build and maintain both frontend and backend systems
• Work with React, Node.js, and PostgreSQL
• Participate in architecture decisions
• Deploy and monitor applications in AWS
• Collaborate in an agile development environment

What we're looking for:
• 3+ years of full-stack development experience
• Proficiency in React and Node.js
• Database design and optimization skills
• Experience with cloud platforms (AWS preferred)
• Startup mindset and ability to wear multiple hats`,
        location: "Remote",
        job_type: "FULL_TIME",
        experience_level: "MID",
        salary_range: "$90,000 - $130,000",
        tags: "React, Node.js, PostgreSQL, AWS, Full Stack, Startup",
      },
      {
        title: "Product Manager",
        description: `We're seeking a Product Manager to drive the strategy and execution of our core products. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.

Responsibilities:
• Define product roadmap and strategy
• Gather and prioritize product requirements
• Work closely with engineering teams to deliver features
• Analyze user feedback and market trends
• Coordinate product launches and go-to-market strategies

Requirements:
• 4+ years of product management experience
• Strong analytical and problem-solving skills
• Experience with agile development methodologies
• Excellent communication and leadership abilities
• Technical background preferred but not required`,
        location: "New York, NY",
        job_type: "FULL_TIME",
        experience_level: "MID",
        salary_range: "$110,000 - $140,000",
        tags: "Product Management, Strategy, Agile, Analytics, Leadership",
      },
      {
        title: "Junior Software Developer",
        description: `Perfect opportunity for a recent graduate or career changer! Join our supportive team where you'll learn from experienced developers while contributing to real projects.

What you'll learn:
• Modern web development practices
• Version control with Git
• Testing and debugging techniques
• Code review processes
• Agile development methodologies

Requirements:
• Bachelor's degree in Computer Science or related field
• Basic knowledge of programming languages (JavaScript, Python, or Java)
• Strong desire to learn and grow
• Good communication skills
• Portfolio of personal or academic projects

We offer:
• Comprehensive mentorship program
• Learning and development budget
• Flexible work arrangements
• Health and dental benefits`,
        location: "Austin, TX",
        job_type: "FULL_TIME",
        experience_level: "ENTRY",
        salary_range: "$65,000 - $80,000",
        tags: "JavaScript, Python, Entry Level, Mentorship, Learning",
      },
      {
        title: "DevOps Engineer",
        description: `We're looking for a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You'll work with cutting-edge technologies in a cloud-native environment.

Key Responsibilities:
• Design and maintain CI/CD pipelines
• Manage Kubernetes clusters and containerized applications
• Monitor system performance and reliability
• Implement infrastructure as code
• Collaborate with development teams on deployment strategies

Requirements:
• 3+ years of DevOps or infrastructure experience
• Strong knowledge of Docker and Kubernetes
• Experience with AWS or other cloud platforms
• Proficiency in scripting languages (Python, Bash)
• Understanding of monitoring and logging tools`,
        location: "Seattle, WA",
        job_type: "FULL_TIME",
        experience_level: "MID",
        salary_range: "$100,000 - $135,000",
        tags: "DevOps, Kubernetes, Docker, AWS, CI/CD, Infrastructure",
      },
      {
        title: "UX/UI Designer",
        description: `Join our design team to create beautiful, intuitive user experiences. You'll work on web and mobile applications used by millions of users worldwide.

What you'll do:
• Create wireframes, prototypes, and high-fidelity designs
• Conduct user research and usability testing
• Collaborate with product managers and developers
• Maintain and evolve our design system
• Present design concepts to stakeholders

Requirements:
• 3+ years of UX/UI design experience
• Proficiency in Figma, Sketch, or similar tools
• Strong portfolio demonstrating design process
• Understanding of web and mobile design principles
• Experience with user research methodologies`,
        location: "Los Angeles, CA",
        job_type: "FULL_TIME",
        experience_level: "MID",
        salary_range: "$85,000 - $115,000",
        tags: "UX Design, UI Design, Figma, User Research, Prototyping",
      },
    ];

    // Create jobs for different employers
    const createdJobs = [];
    jobs.forEach((jobData, index) => {
      const employerId = index % 2 === 0 ? employerUser.id : employer2User.id;
      const job = createJob(employerId, jobData);
      createdJobs.push(job);
    });

    // Create some demo applications
    createdJobs.slice(0, 3).forEach((job) => {
      createApplication(seekerUser.id, {
        job_id: job.id,
        cover_letter: `Dear Hiring Manager,

I am excited to apply for the ${job.title} position. With my background in software development and passion for creating innovative solutions, I believe I would be a great fit for your team.

I have experience with the technologies mentioned in your job posting and am eager to contribute to your company's success. I would welcome the opportunity to discuss how my skills and enthusiasm can benefit your organization.

Thank you for considering my application.

Best regards,
John Seeker`,
      });
    });

    console.log("✅ Demo data seeded successfully!");
    console.log("Demo accounts:");
    console.log("Job Seeker: seeker@demo.com / password");
    console.log("Employer: employer@demo.com / password");
    console.log("Startup: startup@demo.com / password");
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      console.log("ℹ️  Demo data already exists, skipping...");
    } else {
      console.error("❌ Error seeding demo data:", error);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDemoData();
}

export default seedDemoData;
