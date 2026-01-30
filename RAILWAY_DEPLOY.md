# Railway Deployment Instructions

## Quick Deploy to Railway

1. **Connect Repository:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `jop-portal` repository
   - **Deploy from ROOT directory** (not backend subfolder)

2. **Railway will automatically:**
   - Detect the `package.json` in root
   - Run the install and start commands
   - Start the backend server

3. **Set Environment Variables:**
   Go to your Railway project → Variables tab and add:

   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

4. **Deploy:**
   - Railway will automatically deploy
   - Your backend will be available at: `https://your-app.railway.app`

## Files that make this work:

- `package.json` (root) - Tells Railway this is a Node.js project
- `Procfile` - Tells Railway how to start the app
- `start.sh` - Startup script
- `backend/package.json` - Backend dependencies

## Troubleshooting:

- **"Script start.sh not found"** → Make sure you're deploying from ROOT, not backend folder
- **Build fails** → Check that all files are committed to GitHub
- **App crashes** → Check Railway logs and environment variables
