# 🛒 GROSSSTORE - Inventory Management System

A modern, responsive inventory management system built with React, featuring role-based authentication, real-time analytics dashboard, and premium UI/UX design.

**Developed by: Aditya**

## 📋 Application Overview

### What This Application Does

GROSSSTORE is a comprehensive web application designed to help businesses manage their inventory efficiently. The application provides:

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

### Quick Start Guide

1. **Download the Project**
   ```bash
   git clone https://github.com/Aditya-Kumar-Singh-007/slooze-front-end-challenge.git
   cd slooze-front-end-challenge
   ```

2. **Install Required Packages**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Go to `http://localhost:5173`
   - Use the demo accounts above to login

### Commands You Can Use

```bash
npm run dev          # Start the app for development
npm run build        # Create production build
npm run preview      # Test production build
```

## 🔑 Demo Credentials

The application includes pre-configured demo accounts for testing:

### Manager Account (Full Access)
- **Email**: `manager@grossstore.com`
- **Password**: `manager123`
- **Access**: Dashboard + Products Management

### Store Keeper Account (Limited Access)
- **Email**: `keeper@grossstore.com`
- **Password**: `keeper123`
- **Access**: Products Management Only

## 🌐 Deploy to Netlify (Easy Way)

### Simple Steps:

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com) and create account
   - Click "New site from Git"

2. **Connect Your GitHub**
   - Choose your repository
   - Use these settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Deploy**
   - Click "Deploy site"
   - Your app will be live in minutes!

### Quick Deploy (Alternative)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Drag the `dist` folder to Netlify dashboard
   - Done!

## 🔌 Connect to Real Database (For Developers)

### Current Setup
Right now, the app uses **fake data** stored in your browser. To connect real database:

### What You Need to Do:

1. **Replace Mock Data**
   - Edit `src/utils/mockData.js`
   - Point to your real API server

2. **Add Environment Variables**
   Create `.env` file:
   ```env
   VITE_API_BASE_URL=https://your-api.com
   ```

3. **Required API Endpoints**
   Your backend needs these URLs:
   ```
   POST /api/auth/login          # Login users
   GET  /api/products           # Get products
   POST /api/products           # Add products
   PUT  /api/products/:id       # Update products
   DELETE /api/products/:id     # Delete products
   GET  /api/dashboard/stats    # Dashboard data
   ```

4. **Database Tables Needed**
   ```sql
   -- Users table
   CREATE TABLE users (
     id INT PRIMARY KEY,
     email VARCHAR(255) UNIQUE,
     password VARCHAR(255),
     name VARCHAR(255),
     role ENUM('manager', 'store_keeper')
   );
   
   -- Products table
   CREATE TABLE products (
     id INT PRIMARY KEY,
     name VARCHAR(255),
     category VARCHAR(255),
     price DECIMAL(10,2),
     stock INT,
     supplier VARCHAR(255)
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

## 🔧 Common Problems & Solutions

### If Something Goes Wrong:

1. **Port 5173 is busy**
   ```bash
   npm run dev -- --port 3000
   ```

2. **App won't start**
   ```bash
   # Delete and reinstall
   rm -rf node_modules
   npm install
   ```

3. **Deployment fails**
   - Make sure Node.js version is 16 or higher
   - Check if `npm run build` works locally

## 📞 Need Help?

- **Email**: [2604aditya@gmail.com](mailto:2604aditya@gmail.com)
- **GitHub**: [Report issues here](https://github.com/Aditya-Kumar-Singh-007/slooze-front-end-challenge/issues)

## 📄 License

© 2024 Aditya. All Rights Reserved.

This project is created for the Slooze Front-End Challenge. Please do not distribute or share outside the intended evaluation process.

---

**Built with ❤️ by Aditya for the Slooze Front-End Challenge**