# Railway Deployment Setup

## Quick Setup Guide

### 1. Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your `jop-portal` repository**
4. **Deploy from ROOT directory** (Railway will detect package.json)

### 2. Set Environment Variables

In your Railway project dashboard, go to **Variables** tab and add:

```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important:**

- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong secret key
- Replace `your-frontend-domain.vercel.app` with your actual frontend URL

### 3. Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Set Root Directory to `frontend`**
4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-railway-app.railway.app
   ```
   (Replace with your actual Railway backend URL)

### 4. Update CORS Settings

After deploying frontend, update the Railway environment variable:

```
FRONTEND_URL=https://your-actual-frontend-domain.vercel.app
```

## Troubleshooting

### Backend Issues

- **Check Railway logs** for any startup errors
- **Verify environment variables** are set correctly
- **Test API endpoint** by visiting `https://your-railway-app.railway.app/`

### Frontend Issues

- **Check browser console** for API errors
- **Verify VITE_API_URL** points to correct Railway backend
- **Ensure no trailing slashes** in API URLs

### Common Fixes

1. **404 Errors:** Usually CORS or incorrect API URL
2. **CORS Errors:** Check FRONTEND_URL matches your deployed frontend domain
3. **Database Errors:** Railway will create SQLite automatically

## Testing Deployment

1. **Visit your frontend URL**
2. **Try registering a new account**
3. **Try logging in**
4. **Check if job listings load**

If everything works, your deployment is successful! 🎉
