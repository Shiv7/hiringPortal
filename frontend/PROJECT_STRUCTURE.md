# Shramii Hiring Platform - Complete Project Structure

## 📁 Project Overview

This is a world-class hiring platform for blue-collar workers built with modern technologies and glassmorphism design.

## 🏗️ Directory Structure

```
shramiiHiring/
├── frontend/                          # React TypeScript Frontend
│   ├── public/                        # Static assets
│   │   ├── index.html                 # Main HTML template
│   │   ├── manifest.json              # PWA manifest
│   │   └── favicon.ico                # Site icon
│   ├── src/                           # Source code
│   │   ├── components/                # Reusable UI components
│   │   │   ├── layout/                # Layout components
│   │   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   │   └── Footer.tsx         # Footer component
│   │   │   └── auth/                  # Authentication components
│   │   │       └── ProtectedRoute.tsx # Route protection
│   │   ├── pages/                     # Page components
│   │   │   ├── auth/                  # Authentication pages
│   │   │   │   ├── LoginPage.tsx      # Login form
│   │   │   │   └── RegisterPage.tsx   # Registration form
│   │   │   ├── worker/                # Worker-specific pages
│   │   │   │   └── WorkerDashboard.tsx # Worker dashboard
│   │   │   ├── employer/              # Employer-specific pages
│   │   │   │   └── EmployerDashboard.tsx # Employer dashboard
│   │   │   ├── HomePage.tsx           # Landing page
│   │   │   ├── JobSearchPage.tsx      # Job search interface
│   │   │   ├── JobDetailsPage.tsx     # Individual job details
│   │   │   └── ProfilePage.tsx        # User profile management
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── services/                  # API services
│   │   ├── utils/                     # Utility functions
│   │   ├── styles/                    # Global styles
│   │   ├── assets/                    # Static assets
│   │   ├── types/                     # TypeScript type definitions
│   │   ├── App.tsx                    # Main application component
│   │   ├── index.tsx                  # Application entry point
│   │   └── index.css                  # Global CSS with glassmorphism
│   ├── package.json                   # Frontend dependencies
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── postcss.config.js              # PostCSS configuration
│   └── demo.html                      # Static demo version
├── backend/                           # Spring Boot Backend
│   ├── src/main/java/com/shramii/     # Java source code
│   │   ├── model/                     # Data models
│   │   │   ├── User.java              # User entity
│   │   │   └── Job.java               # Job entity
│   │   ├── controller/                # REST controllers
│   │   ├── service/                   # Business logic
│   │   ├── repository/                # Data access layer
│   │   ├── config/                    # Configuration classes
│   │   ├── security/                  # Security configuration
│   │   ├── dto/                       # Data transfer objects
│   │   └── ShramiiBackendApplication.java # Main application class
│   ├── src/main/resources/            # Configuration files
│   │   └── application.yml            # Application configuration
│   └── pom.xml                        # Maven dependencies
├── docs/                              # Documentation
├── docker-compose.yml                 # Docker configuration
├── setup.sh                          # Automated setup script
├── package.json                       # Root package.json
├── README.md                          # Project overview
├── IMPLEMENTATION_GUIDE.md            # Implementation guide
├── QUICK_START.md                     # Quick start instructions
└── PROJECT_STRUCTURE.md               # This file
```

## 🎨 Frontend Architecture

### **Technology Stack**
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Query** for state management
- **React Hook Form** for form handling
- **Lucide React** for icons

### **Key Features**
- **Glassmorphism Design** - Modern translucent UI effects
- **Responsive Layout** - Mobile-first approach
- **Component-Based** - Reusable UI components
- **Type Safety** - Full TypeScript support
- **Modern Animations** - Smooth transitions and effects

### **Pages Structure**
1. **HomePage** - Landing page with hero section
2. **LoginPage** - User authentication
3. **RegisterPage** - User registration
4. **JobSearchPage** - Job search and filtering
5. **JobDetailsPage** - Individual job details
6. **WorkerDashboard** - Worker-specific dashboard
7. **EmployerDashboard** - Employer-specific dashboard
8. **ProfilePage** - User profile management

## ⚙️ Backend Architecture

### **Technology Stack**
- **Spring Boot 3.x** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data MongoDB** - Database integration
- **JWT** - Token-based authentication
- **Maven** - Dependency management

### **Data Models**
1. **User** - User entity with roles (WORKER, EMPLOYER, ADMIN)
2. **Job** - Job posting entity with full job details

### **Key Features**
- **RESTful API** - Clean API design
- **JWT Authentication** - Secure token-based auth
- **MongoDB Integration** - NoSQL database
- **Role-Based Access** - Different access levels
- **Swagger Documentation** - API documentation

## 🎨 Design System

### **Glassmorphism Components**
- **Glass Cards** - Translucent containers
- **Glass Buttons** - Interactive elements
- **Glass Inputs** - Form elements
- **Glass Navigation** - Header component

### **Color Palette**
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### **Typography**
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- Java 17+
- MongoDB
- Maven

### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### **Backend Setup**
```bash
cd backend
./mvnw spring-boot:run
```

### **Full Stack Setup**
```bash
./setup.sh
```

## 📱 Features

### **Core Features**
- ✅ User Authentication (Login/Register)
- ✅ Role-Based Access Control
- ✅ Job Search and Filtering
- ✅ User Profile Management
- ✅ Dashboard Interfaces
- ✅ Responsive Design
- ✅ Glassmorphism UI

### **Planned Features**
- 🔄 Real-time Notifications
- 🔄 Messaging System
- 🔄 Smart Job Matching
- 🔄 Rating & Review System
- 🔄 Mobile App (React Native)

## 🛠️ Development

### **Frontend Commands**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### **Backend Commands**
```bash
./mvnw spring-boot:run    # Start development server
./mvnw clean package      # Build for production
./mvnw test              # Run tests
```

## 📊 Project Status

### **Completed**
- ✅ Project structure setup
- ✅ Frontend React application
- ✅ Backend Spring Boot setup
- ✅ Glassmorphism design system
- ✅ Authentication system
- ✅ Dashboard interfaces
- ✅ Responsive design
- ✅ Documentation

### **In Progress**
- 🔄 API integration
- 🔄 Database setup
- 🔄 Testing

### **Planned**
- 📋 Advanced features
- 📋 Mobile app
- 📋 Deployment
- 📋 Monitoring

## 🔧 Configuration

### **Frontend Configuration**
- **Tailwind CSS** - Custom configuration in `tailwind.config.js`
- **TypeScript** - Configuration in `tsconfig.json`
- **PostCSS** - Configuration in `postcss.config.js`

### **Backend Configuration**
- **Application** - Configuration in `application.yml`
- **Maven** - Dependencies in `pom.xml`
- **Security** - JWT and CORS configuration

## 📚 Documentation

- **README.md** - Project overview
- **IMPLEMENTATION_GUIDE.md** - Detailed implementation guide
- **QUICK_START.md** - Quick start instructions
- **PROJECT_STRUCTURE.md** - This file

## 🚀 Deployment

### **Docker**
```bash
docker-compose up -d
```

### **Manual Deployment**
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy to AWS/DigitalOcean
- **Database**: Use MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@shramii.com or join our Discord community.

---

**Built with ❤️ for the blue-collar workforce**
