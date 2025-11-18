# 🚀 Slooze Commodities Management System

![Slooze Logo](./public/FFFFFF-1.png)

A modern, responsive commodities management system built with React, featuring role-based authentication, real-time analytics dashboard, and premium UI/UX design.

## 📋 Application Overview

### What This Application Does

The Slooze Commodities Management System is a comprehensive web application designed to help businesses manage their commodity inventory efficiently. The application provides:

**🔐 Authentication & Role Management**
- Secure login system with email/password authentication
- Role-based access control (Manager vs Store Keeper)
- Social login integration (Google & Facebook) with demo mode
- Protected routes based on user permissions

**📊 Analytics Dashboard (Manager Only)**
- Real-time data visualization with interactive charts
- Live updating metrics for earnings, sales, and subscriptions
- Comprehensive business insights and KPI tracking
- Premium glassmorphism UI with particle animations
- Mobile-responsive design with collapsible sidebar

**📦 Product Management (Both Roles)**
- Complete CRUD operations for product inventory
- Advanced search and filtering capabilities
- Stock level monitoring with visual indicators
- Category-based organization
- Real-time inventory value calculations

**🎨 Premium UI Features**
- Dark gradient backgrounds with particle animations
- Glassmorphism design elements
- Smooth animations powered by Framer Motion
- Light/Dark theme support
- Mobile-first responsive design
- Enhanced accessibility with WCAG compliance

### Key Components Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with role-based menu
│   ├── Sidebar.jsx     # Dashboard sidebar navigation
│   ├── StatsCards.jsx  # Analytics statistics cards
│   ├── Charts.jsx      # Interactive chart components
│   └── ProtectedRoute.jsx # Route protection wrapper
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── ThemeContext.jsx # Theme switching logic
├── pages/              # Main application pages
│   ├── Login.jsx       # Authentication interface
│   ├── AnalyticsDashboard.jsx # Manager analytics dashboard
│   └── Products.jsx    # Product management interface
├── utils/              # Utility functions and services
│   └── mockData.js     # Mock API and sample data
└── styles/             # Global styling and enhancements
    └── global-enhancements.css # Premium UI effects
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: CSS3 with CSS Variables for theming
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Charts & Analytics**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite for fast development and optimized builds

## 🚀 Local Development Setup

### Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aditya-Kumar-Singh-007/slooze-front-end-challenge.git
   cd slooze-front-end-challenge
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Start Development Server**
   ```bash
   # Using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🔑 Demo Credentials

The application includes pre-configured demo accounts for testing:

### Manager Account (Full Access)
- **Email**: `manager@slooze.com`
- **Password**: `manager123`
- **Access**: Dashboard + Products Management

### Store Keeper Account (Limited Access)
- **Email**: `keeper@slooze.com`
- **Password**: `keeper123`
- **Access**: Products Management Only

## 🌐 Netlify Deployment

### Automatic Deployment Setup

1. **Connect Repository to Netlify**
   - Go to [Netlify](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the `slooze-front-end-challenge` repository

2. **Build Configuration**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (set in Environment Variables)

3. **Environment Variables** (Optional)
   ```
   NODE_VERSION=18
   NPM_VERSION=8
   ```

### Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy dist folder**
   - Drag and drop the `dist` folder to Netlify dashboard
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Netlify Configuration File

The project includes a `netlify.toml` file for optimal deployment:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 🔌 Backend Integration Guide

### Current State
The application currently uses **mock data** and **localStorage** for demonstration purposes.

### Steps to Integrate Real Backend

1. **API Service Setup**
   - Replace mock functions in `src/utils/mockData.js`
   - Update API endpoints to point to your backend server
   - Add proper error handling and loading states

2. **Authentication Integration**
   ```javascript
   // In src/context/AuthContext.jsx
   const login = async (email, password) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     // Handle response and JWT tokens
   };
   ```

3. **Environment Variables**
   Create `.env` file for API configuration:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.com
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_FACEBOOK_APP_ID=your-facebook-app-id
   ```

4. **Required Backend Endpoints**
   ```
   POST /api/auth/login          # User authentication
   POST /api/auth/register       # User registration
   GET  /api/auth/me            # Get current user
   GET  /api/products           # Get all products
   POST /api/products           # Create new product
   PUT  /api/products/:id       # Update product
   DELETE /api/products/:id     # Delete product
   GET  /api/dashboard/stats    # Dashboard analytics
   ```

5. **Database Schema Requirements**
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     email VARCHAR UNIQUE NOT NULL,
     password_hash VARCHAR NOT NULL,
     name VARCHAR NOT NULL,
     role ENUM('manager', 'store_keeper'),
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   -- Products table
   CREATE TABLE products (
     id UUID PRIMARY KEY,
     name VARCHAR NOT NULL,
     category VARCHAR NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     stock INTEGER NOT NULL,
     supplier VARCHAR NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

## 📱 Features Implemented

### ✅ Core Requirements (100 Points)
- **Login System** (5 points) - Email/password authentication with role validation
- **Dashboard** (30 points) - Manager-only analytics with real-time charts
- **View Products** (10 points) - Product listing accessible to both roles
- **Add/Edit Products** (15 points) - Complete CRUD operations
- **Light/Dark Mode** (15 points) - Theme switching with localStorage persistence
- **Role-Based UI** (25 points) - Dynamic menu restrictions and route protection

### 🎨 Premium Enhancements
- **Glassmorphism Design** - Modern frosted glass UI elements
- **Particle Animations** - Independent floating particle backgrounds
- **Real-time Data Updates** - Live chart animations every 2.5 seconds
- **Mobile Responsiveness** - Fully responsive design with touch optimization
- **Loading Screens** - Premium loading animations with progress bars
- **Enhanced Accessibility** - WCAG compliant color contrast and keyboard navigation

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   # Or use different port
   npm run dev -- --port 3000
   ```

2. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Netlify Deployment Issues**
   - Ensure `dist` folder is being published
   - Check build logs for errors
   - Verify Node.js version compatibility

## 📞 Support & Contact

For questions or support regarding this project:

- **Email**: [careers@slooze.xyz](mailto:careers@slooze.xyz)
- **GitHub Issues**: [Create an issue](https://github.com/Aditya-Kumar-Singh-007/slooze-front-end-challenge/issues)

## 📄 License

© Slooze. All Rights Reserved.

This project is created for the Slooze Front-End Challenge. Please do not distribute or share outside the intended evaluation process.

---

**Built with ❤️ for the Slooze Front-End Challenge**