# 🚀 Shramii Hiring Platform - Quick Start Guide

## ⚠️ Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed
- **Java 17+** installed
- **MongoDB** running locally or MongoDB Atlas account
- **At least 2GB free disk space**

## 🛠️ Installation Steps

### 1. Free Up Disk Space
```bash
# Check disk space
df -h

# Clean up if needed
sudo rm -rf /tmp/*
npm cache clean --force
```

### 2. Create React Frontend
```bash
# Create React app
npx create-react-app frontend --template typescript

# Move to frontend directory
cd frontend

# Install additional dependencies
npm install react-router-dom @tanstack/react-query framer-motion tailwindcss lucide-react axios react-hook-form react-hot-toast clsx tailwind-merge @headlessui/react @heroicons/react

# Install Tailwind CSS
npx tailwindcss init -p

# Copy configuration files
cp ../tailwind.config.js .
cp ../globals.css src/
cp ../App.tsx src/
cp ../Navbar.tsx src/components/
cp ../HomePage.tsx src/pages/
```

### 3. Configure Tailwind CSS
Update `src/index.css`:
```css
@import './globals.css';
```

### 4. Create Spring Boot Backend
```bash
# Go back to project root
cd ..

# Create Spring Boot project using Spring Initializr
curl https://start.spring.io/starter.zip -d dependencies=web,security,data-mongodb,validation,webflux \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.0.5 \
  -d baseDir=backend \
  -d groupId=com.shramii \
  -d artifactId=shramii-backend \
  -d name=shramii-backend \
  -d description="Shramii Hiring Platform Backend" \
  -d packageName=com.shramii \
  -d packaging=jar \
  -d javaVersion=17 \
  -o backend.zip

# Extract and setup
unzip backend.zip
rm backend.zip

# Copy configuration files
cp application.yml backend/src/main/resources/
cp backend-pom.xml backend/pom.xml
```

### 5. Add Dependencies to Backend
Update `backend/pom.xml` with the content from `backend-pom.xml`:

```xml
<!-- Add JWT dependencies -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>

<!-- Add Swagger/OpenAPI -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.2</version>
</dependency>
```

### 6. Setup MongoDB
```bash
# Install MongoDB locally (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas (recommended for production)
# 1. Go to https://cloud.mongodb.com
# 2. Create a free cluster
# 3. Get connection string
# 4. Update application.yml with your connection string
```

### 7. Start Development Servers

#### Terminal 1 - Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

### 8. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 🎨 Design System Setup

The platform uses a custom glassmorphism design system with:

### Key Features:
- **Glass Effects**: Translucent backgrounds with backdrop blur
- **Modern Typography**: Inter font family
- **Smooth Animations**: Framer Motion powered
- **Responsive Design**: Mobile-first approach
- **Accessible Colors**: WCAG compliant

### Color Palette:
```css
Primary: #3b82f6 (Blue)
Secondary: #8b5cf6 (Purple)
Accent: #06b6d4 (Cyan)
Success: #10b981 (Green)
Warning: #f59e0b (Yellow)
Error: #ef4444 (Red)
```

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Backend
```bash
cd backend
./mvnw spring-boot:run    # Start development server
./mvnw clean package      # Build for production
./mvnw test              # Run tests
```

### Full Stack
```bash
# From project root
npm run dev              # Start both frontend and backend
npm run frontend:dev     # Start only frontend
npm run backend:dev      # Start only backend
```

## 📱 Key Features to Implement

### Phase 1: Core Features
- [ ] User Authentication (Login/Register)
- [ ] Job Search and Filtering
- [ ] Worker Profile Management
- [ ] Employer Dashboard
- [ ] Job Application System

### Phase 2: Advanced Features
- [ ] Smart Job Matching Algorithm
- [ ] Real-time Notifications
- [ ] Messaging System
- [ ] Rating and Review System
- [ ] Mobile Responsive Design

### Phase 3: Enterprise Features
- [ ] Analytics Dashboard
- [ ] Bulk Job Posting
- [ ] Advanced Search Filters
- [ ] API Documentation
- [ ] Admin Panel

## 🚀 Deployment

### Using Docker
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment
1. **Frontend**: Deploy to Vercel/Netlify
2. **Backend**: Deploy to AWS/DigitalOcean
3. **Database**: Use MongoDB Atlas
4. **CDN**: Use CloudFlare

## 🆘 Troubleshooting

### Common Issues:

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   
   # Restart MongoDB
   brew services restart mongodb-community
   ```

3. **Node Modules Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Java/Maven Issues**
   ```bash
   # Check Java version
   java -version
   
   # Clean Maven cache
   ./mvnw clean
   ```

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all prerequisites are installed
4. Verify disk space availability

## 🎯 Next Steps

Once the basic setup is complete:
1. Implement user authentication
2. Create job posting functionality
3. Build worker profile system
4. Add job search and filtering
5. Implement application management
6. Add real-time features
7. Optimize for mobile devices
8. Deploy to production

Happy coding! 🚀
