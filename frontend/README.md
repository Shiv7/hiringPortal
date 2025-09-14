# Shramii - Blue Collar Hiring Platform

A world-class hiring platform designed specifically for blue-collar workers, featuring glassmorphism design and cutting-edge technology.

## 🚀 Features

- **Modern Glassmorphism UI** - Beautiful, modern interface with glassmorphism effects
- **Smart Job Matching** - AI-powered matching between workers and employers
- **Real-time Communication** - Built-in messaging and notification system
- **Mobile-First Design** - Responsive design optimized for all devices
- **Advanced Search & Filters** - Powerful job search with location, skills, and experience filters
- **Worker Profiles** - Comprehensive profiles with skills, experience, and ratings
- **Employer Dashboard** - Complete hiring management system
- **Secure Authentication** - JWT-based authentication with role-based access

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for state management
- React Router for navigation
- Glassmorphism design system

### Backend
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data MongoDB
- Spring WebFlux for reactive programming
- Swagger/OpenAPI documentation

### Database
- MongoDB with Mongoose
- Redis for caching
- Elasticsearch for search functionality

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Start Development Servers**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html

## 📁 Project Structure

```
shramii-hiring-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles and themes
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/shramii/
│   │       ├── controller/ # REST controllers
│   │       ├── service/    # Business logic
│   │       ├── repository/ # Data access layer
│   │       ├── model/      # Data models
│   │       └── config/     # Configuration classes
└── docs/                   # Documentation
```

## 🎨 Design System

Our design system is built around glassmorphism principles:
- **Glass Effects** - Translucent backgrounds with blur effects
- **Modern Typography** - Clean, readable fonts
- **Smooth Animations** - Framer Motion powered transitions
- **Accessible Colors** - WCAG compliant color schemes
- **Responsive Grid** - Mobile-first responsive design

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm start
```

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update database configuration in `backend/src/main/resources/application.yml`

## 📱 Mobile App

A React Native mobile app is planned for future releases to provide native mobile experience for workers on the go.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@shramii.com or join our Discord community.
