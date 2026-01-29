#!/bin/bash

# Job Portal Deployment Script
echo "🚀 Job Portal Deployment Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Building frontend..."
cd frontend
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo "🔧 Preparing backend..."
cd backend

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from example..."
    cp .env.example .env
    echo "📝 Please edit backend/.env with your production values"
fi

# Install production dependencies
echo "📦 Installing backend dependencies..."
npm ci --only=production

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependency installation failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up your environment variables"
echo "2. Choose a deployment platform (see DEPLOYMENT.md)"
echo "3. Deploy frontend and backend"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"