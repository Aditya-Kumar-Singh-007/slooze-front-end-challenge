![Logo](./public/FFFFFF-1.png)
# Slooze take home challenge-front-end!!

## Commodities Management Feature Flow

We are introducing a **Commodities Management System** to **diversify product variety** and meet customer expectations. This feature includes a structured **role-based access system**, UI enhancements, and authentication mechanisms.

---

## Feature Breakdown & Points Allocation
### **1️⃣ Authentication & Access**
- **Login (5 Points)** → Users authenticate via email & password.  
- **Role-Based Access** → Only **Managers** can access the **dashboard**.  

### **2️⃣ Core UI Features**
- **Dashboard (30 Points)** → Available **only for Managers** to oversee operations.  
- **View All Products (10 Points)** → Accessible to both **Managers & Store Keepers**.  
- **Add/Edit Products (15 Points) [Optional]** → Modify product inventory.  

### **3️⃣ UI Enhancements**
- **Light/Dark Mode (15 Points)** → Implement theme switching.  
- **Front-End Role-Based Menu Restrictions (Bonus: 25 Points)** → Restrict UI options dynamically.  

---

## 🔒 Role-Based Access Rules
| **Feature**           | **Manager** | **Store Keeper** |
|----------------------|------------|----------------|
| **Login**            | ✅          | ✅              |
| **Dashboard**        | ✅          | ❌              |
| **View Products**    | ✅          | ✅              |
| **Add/Edit Products**| ✅          | ✅              |
| **Role-Based UI**    | ✅          | ✅              |

---

## 🛠️ Implementation Steps
### **A) Login Flow**
1. Create a **login page** with validation.  
2. Send API request → `POST /auth/login`.  
3. Store **session details securely**.  

### **B) Dashboard Flow**
1. Show **statistics & insights** for commodities.  
2. Restrict access using **role-based gating**.  

### **C) Product Management**
1. Fetch product data → `GET /products`.  
2. Allow **adding/editing** via forms (`POST/PUT /products`).  

### **D) UI Enhancements**
1. Implement **Light/Dark Mode toggle** with localStorage.  
2. **Role-based UI restrictions** for platform features.  

---

## 🔥 Bonus Challenge: Role-Based Menu Restriction
✅ Show/hide **menu items based on roles** (`Manager`, `Store Keeper`).  
✅ Implement **router guards** to prevent unauthorized access.  
✅ Ensure restricted buttons/options remain **disabled dynamically**.  

---

## Reference:

- Refer to the [Figma](https://www.figma.com/design/uD9IW2pEx2JRB8xZJD11dx/Slooze-Take-Home-Challenge---Commodity?node-id=1-108&t=KAwt0LRM6NLVV3Qm-1) for more details on the problem statement
- assume / affix sample data, components and other requirments you may have and state them out during your submission

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/Aditya-Kumar-Singh-007/slooze-front-end-challenge.git

# Navigate to project directory
cd slooze-front-end-challenge

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with CSS Variables for theming
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React

## 📋 Implementation Details

### Authentication System
- Mock authentication with predefined users
- JWT-like token simulation stored in localStorage
- Role-based access control (Manager/Store Keeper)

### Sample Users
```javascript
// Manager Account
Email: manager@slooze.com
Password: manager123

// Store Keeper Account
Email: keeper@slooze.com
Password: keeper123
```

### Features Implemented
- ✅ **Login System** (5 points) - Email/password authentication
- ✅ **Dashboard** (30 points) - Manager-only analytics dashboard
- ✅ **View Products** (10 points) - Product listing for both roles
- ✅ **Add/Edit Products** (15 points) - Product management functionality
- ✅ **Light/Dark Mode** (15 points) - Theme switching with localStorage
- ✅ **Role-Based UI** (25 points) - Dynamic menu restrictions

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with role-based menu
│   ├── Sidebar.jsx     # Dashboard sidebar
│   ├── ProtectedRoute.jsx # Route protection
│   └── ...
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── ThemeContext.jsx # Theme management
├── pages/              # Page components
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Manager dashboard
│   ├── Products.jsx    # Product listing
│   └── ...
├── utils/              # Utility functions
│   └── mockData.js     # Sample data
└── App.jsx             # Main application
```

## 📤 Submission

## Connect with Us:

Reach out to **[careers@slooze.xyz](mailto:careers@slooze.xyz)** to submit your solutions or if you may have any questions related to the challenege

## © Copyright Notice

**© Slooze. All Rights Reserved.**

Please do not share or distribute this material outside the intended evaluation process.  
For queries, contact us !!
