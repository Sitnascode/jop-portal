@echo off
echo 🚀 Job Portal Deployment Helper
echo ================================

REM Check if we're in the right directory
if not exist "frontend" (
    echo ❌ Please run this script from the project root directory
    exit /b 1
)

echo 📦 Building frontend...
cd frontend
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    exit /b 1
)

echo ✅ Frontend build successful
cd ..

echo 🔧 Preparing backend...
cd backend

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  No .env file found. Creating from example...
    copy .env.example .env
    echo 📝 Please edit backend\.env with your production values
)

REM Install production dependencies
echo 📦 Installing backend dependencies...
call npm ci --only=production

if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    exit /b 1
)

echo ✅ Backend dependencies installed
cd ..

echo.
echo 🎉 Build completed successfully!
echo.
echo Next steps:
echo 1. Set up your environment variables
echo 2. Choose a deployment platform (see DEPLOYMENT.md)
echo 3. Deploy frontend and backend
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md