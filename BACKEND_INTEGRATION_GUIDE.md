# Backend Integration Setup Guide

## Overview
The authentication system is now fully integrated between the frontend and backend. The demo accounts from your LoginForm have been connected to the Express backend with JWT token-based authentication.

## Architecture

### Backend (PORT 5000)
- **Express Server** with MongoDB integration
- **Demo Users**: Pre-configured with demo accounts for all roles
- **Authentication Endpoints**:
  - `POST /api/auth/login` - Login with email/password
  - `POST /api/auth/register` - Register new users
  - `POST /api/auth/seed-demo-users` - Seed demo accounts

### Frontend Services
- **Login_Page (PORT 5173)** - Main authentication interface
- **Apartment_listing (PORT 5174)** - Apartment management
- **Paragon_tenants_portal (PORT 5175)** - Tenant portal
- **tenants (PORT 5176)** - Tenant management
- **rental-management (PORT 3000)** - Rental management system

## Demo Accounts

All demo accounts are automatically seeded when the backend starts:

```
Admin User
- Email: admin@company.com
- Password: admin123
- Role: admin

Manager
- Email: manager@company.com
- Password: manager123
- Role: manager

Caretaker
- Email: caretaker@company.com
- Password: caretaker123
- Role: caretaker

Accountant
- Email: accountant@company.com
- Password: accountant123
- Role: accountant
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ../Login_Page
npm install

cd ../Apartment_listing
npm install

cd ../Paragon_tenants_portal
npm install

cd ../tenants
npm install
```

### Running the System

#### Option 1: Run Each in Separate Terminal

**Terminal 1 - Start Backend**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Start Login_Page**
```bash
cd Login_Page
npm run dev
# App running on http://localhost:5173
```

**Terminal 3 - Start Apartment_listing**
```bash
cd Apartment_listing
npm run dev
# App running on http://localhost:5174
```

**Terminal 4 - Start Paragon_tenants_portal**
```bash
cd Paragon_tenants_portal
npm run dev
# App running on http://localhost:5175
```

**Terminal 5 - Start tenants**
```bash
cd tenants
npm run dev
# App running on http://localhost:5176
```

#### Option 2: Use npm-run-all (Install globally first)
```bash
npm install -g npm-run-all
npm-run-all --parallel dev:backend dev:login dev:apartments dev:portal dev:tenants
```

## Configuration

### Backend Configuration
**File**: `backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paragon-rental
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### Frontend Configuration
Each frontend app has `.env` file pointing to the backend:
```
VITE_API_URL=http://localhost:5000
```

## Authentication Flow

1. User enters credentials in Login_Page
2. Frontend sends POST request to `http://localhost:5000/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage
5. Token is included in all subsequent API requests via `Authorization: Bearer <token>` header

## Key Changes Made

### Frontend Changes
- **LoginForm.tsx**: Updated to call backend API instead of local validation
- **auth.ts**: New utility file for authentication functions
- **.env files**: Created for all frontend projects with API URL

### Backend Changes
- **CORS Configuration**: Updated to allow requests from all frontend ports (5173-5176, 3000)
- **JWT_SECRET**: Added to .env file
- **authController.ts**: Already had proper login/register implementation

## Using the Auth Utility

In any frontend component, you can use the auth utility:

```typescript
import { loginUser, getAuthToken, getCurrentUser, fetchAPI } from '../utils/auth';

// Login
const response = await loginUser('admin@company.com', 'admin123');
console.log(response.token); // JWT token

// Get current user
const user = getCurrentUser();
console.log(user.role); // admin

// Make authenticated API call
const data = await fetchAPI('/api/apartments', {
  method: 'GET'
});
```

## Troubleshooting

### Connection Error
- Ensure backend is running on port 5000
- Check if MongoDB is running
- Verify CORS configuration in backend

### Invalid Credentials
- Double-check demo account credentials above
- Verify user is seeded to database
- Check database connection

### Token Issues
- Clear localStorage and try logging in again
- Verify JWT_SECRET in backend .env
- Check token expiration (set to 8 hours)

## Next Steps

1. Implement comprehensive role-based access control (RBAC)
2. Add API endpoints for apartments, units, payments, etc.
3. Implement protected routes in frontend apps
4. Add refresh token mechanism for better security
5. Set up database backup and recovery

## Security Considerations

⚠️ For production:
- Change JWT_SECRET to a secure random string
- Use HTTPS instead of HTTP
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables properly
- Implement CSRF protection
- Add refresh token rotation
- Use secure password hashing (bcryptjs is already configured)
