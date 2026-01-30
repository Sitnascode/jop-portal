# Deployment Guide

This guide covers multiple deployment options for the Job Portal application.

## Quick Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Deploy Frontend to Vercel

1. **Connect to Vercel:**

   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

2. **Set Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`

#### Deploy Backend to Railway

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - **Important:** Deploy from the ROOT directory (not backend folder)

2. **Railway Configuration:**
   - Railway will automatically detect the root `package.json`
   - The `Procfile` and `start.sh` ensure proper startup
   - Railway will run `cd backend && npm start`

3. **Set Environment Variables:**

   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

4. **Railway will automatically:**
   - Detect Node.js from root package.json
   - Install backend dependencies
   - Start the server from the backend directory

### Option 2: Netlify + Render

#### Deploy Frontend to Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

3. **Environment Variables:**
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`

#### Deploy Backend to Render

1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Select "Web Service"

2. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ```

### Option 3: Heroku (Full Stack)

#### Deploy Backend to Heroku

1. **Install Heroku CLI and login:**

   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app:**

   ```bash
   cd backend
   heroku create your-job-portal-api
   ```

3. **Set Environment Variables:**

   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

#### Deploy Frontend to Vercel/Netlify

- Follow the frontend deployment steps from Option 1 or 2
- Set `VITE_API_URL` to your Heroku backend URL

## Local Production Build

### Test Production Build Locally

1. **Build Frontend:**

   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

2. **Run Backend in Production Mode:**
   ```bash
   cd backend
   NODE_ENV=production npm start
   ```

## Environment Variables Setup

### Backend (.env)

```env
PORT=4000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_URL=sqlite:./database.sqlite
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-domain.com
```

## Database Considerations

### SQLite (Current Setup)

- **Pros:** Simple, no external dependencies
- **Cons:** File-based, not suitable for multiple instances
- **Best for:** Small applications, development

### Upgrade to PostgreSQL (Recommended for Production)

1. **Add PostgreSQL dependency:**

   ```bash
   cd backend
   npm install pg
   ```

2. **Update database configuration in backend/src/db.js**

3. **Use database services:**
   - **Railway:** Built-in PostgreSQL
   - **Render:** PostgreSQL add-on
   - **Heroku:** Heroku Postgres add-on

## Custom Domain Setup

### Frontend (Vercel/Netlify)

1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

### Backend (Railway/Render/Heroku)

1. Add custom domain in platform settings
2. Update CORS settings in backend
3. Update frontend API URL

## SSL/HTTPS

All recommended platforms provide automatic SSL certificates:

- ✅ Vercel: Automatic
- ✅ Netlify: Automatic
- ✅ Railway: Automatic
- ✅ Render: Automatic
- ✅ Heroku: Automatic

## Monitoring and Logs

### View Logs

- **Vercel:** Dashboard → Functions → View Logs
- **Railway:** Dashboard → Deployments → View Logs
- **Render:** Dashboard → Logs
- **Heroku:** `heroku logs --tail`

### Performance Monitoring

- Set up error tracking (Sentry)
- Monitor API response times
- Set up uptime monitoring

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure FRONTEND_URL is set correctly in backend
   - Check VITE_API_URL in frontend

2. **Database Issues:**
   - SQLite file permissions
   - Database not created on first run

3. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

4. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names (VITE\_ prefix for frontend)

5. **Railway Deployment Issues:**
   - If you see "Script start.sh not found" error:
     - Make sure you're deploying from the ROOT directory (not backend folder)
     - Ensure `package.json`, `Procfile`, and `start.sh` are in the root
     - Check that Railway detects the root package.json
     - Verify the start command points to backend directory

### Support

- Check platform-specific documentation
- Review deployment logs
- Test locally with production environment

## Cost Estimates

### Free Tier Limits

- **Vercel:** 100GB bandwidth, 6000 build minutes
- **Netlify:** 100GB bandwidth, 300 build minutes
- **Railway:** $5/month after trial
- **Render:** 750 hours/month free
- **Heroku:** 550-1000 dyno hours/month

### Paid Plans (Starting)

- **Vercel Pro:** $20/month
- **Netlify Pro:** $19/month
- **Railway:** $5/month + usage
- **Render:** $7/month + usage
- **Heroku:** $7/month + usage

Choose the option that best fits your needs and budget!
