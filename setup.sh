#!/bin/bash

# Shramii Hiring Platform Setup Script
echo "🚀 Setting up Shramii Hiring Platform..."

# Check if we have enough disk space
echo "📊 Checking disk space..."
df -h

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p frontend/src/{components,pages,hooks,services,utils,styles,assets,types}
mkdir -p frontend/src/components/{layout,auth,ui,forms,features}
mkdir -p frontend/src/pages/{auth,worker,employer,public}
mkdir -p backend/src/main/java/com/shramii/{controller,service,repository,model,config,security,dto}
mkdir -p backend/src/main/resources
mkdir -p docs

# Move files to correct locations
echo "📦 Organizing files..."

# Move frontend files
if [ -f "App.tsx" ]; then
    cp App.tsx frontend/src/
    echo "✅ Moved App.tsx"
fi

if [ -f "HomePage.tsx" ]; then
    cp HomePage.tsx frontend/src/pages/
    echo "✅ Moved HomePage.tsx"
fi

if [ -f "LoginPage.tsx" ]; then
    cp LoginPage.tsx frontend/src/pages/auth/
    echo "✅ Moved LoginPage.tsx"
fi

if [ -f "RegisterPage.tsx" ]; then
    cp RegisterPage.tsx frontend/src/pages/auth/
    echo "✅ Moved RegisterPage.tsx"
fi

if [ -f "Navbar.tsx" ]; then
    cp Navbar.tsx frontend/src/components/layout/
    echo "✅ Moved Navbar.tsx"
fi

if [ -f "Footer.tsx" ]; then
    cp Footer.tsx frontend/src/components/layout/
    echo "✅ Moved Footer.tsx"
fi

if [ -f "ProtectedRoute.tsx" ]; then
    cp ProtectedRoute.tsx frontend/src/components/auth/
    echo "✅ Moved ProtectedRoute.tsx"
fi

# Move backend files
if [ -f "User.java" ]; then
    cp User.java backend/src/main/java/com/shramii/model/
    echo "✅ Moved User.java"
fi

if [ -f "Job.java" ]; then
    cp Job.java backend/src/main/java/com/shramii/model/
    echo "✅ Moved Job.java"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
./mvnw dependency:resolve
cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start MongoDB: brew services start mongodb-community"
echo "2. Start backend: cd backend && ./mvnw spring-boot:run"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "🚀 Happy coding!"
