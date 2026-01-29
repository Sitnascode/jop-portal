# Job Portal Application

A modern, full-stack job portal application built with React and Node.js that connects job seekers with employers.

## Features

### For Job Seekers

- User registration and authentication
- Browse and search job listings with advanced filters
- Apply to job positions
- Personal dashboard with application tracking
- Profile management

### For Employers

- Employer registration and authentication
- Post job listings
- Manage job applications
- Review candidate profiles
- Employer dashboard with analytics

### General Features

- Modern, responsive UI/UX design
- SQLite database with migration system
- Secure authentication with JWT
- Professional home page
- Help center and support pages
- Contact form and privacy policy

## Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **Multer** - File upload handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sitnascode/jop-portal.git
cd jop-portal
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:

```bash
cd ../backend
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

The backend will run on `http://localhost:4000`

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Database Setup

The application will automatically create the SQLite database and run migrations on first startup. To seed the database with demo data:

```bash
cd backend
node seed-demo-data.js
```

## Project Structure

```
job-portal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── dataStore.js
│   │   └── db.js
│   ├── uploads/
│   ├── server.js
│   ├── seed-demo-data.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Jobs

- `GET /jobs` - Get all jobs with filters
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create new job (employers only)
- `PUT /jobs/:id` - Update job (employers only)
- `DELETE /jobs/:id` - Delete job (employers only)

### Applications

- `POST /jobs/:id/apply` - Apply to job
- `GET /applications` - Get user applications
- `GET /jobs/:id/applications` - Get job applications (employers only)

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deploy Options:

- **Frontend:** Vercel, Netlify
- **Backend:** Railway, Render, Heroku
- **Database:** SQLite (development) → PostgreSQL (production)

### Environment Variables Required:

- **Backend:** `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV`
- **Frontend:** `VITE_API_URL`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@jobportal.com or visit our [Help Center](http://localhost:5173/help).

## Acknowledgments

- Built with modern web technologies
- Designed for scalability and performance
- Focus on user experience and accessibility
