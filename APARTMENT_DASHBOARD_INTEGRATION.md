# Apartment Dashboard Backend Integration Guide

## Overview
The apartment management dashboard is now fully integrated with the backend database. Users can add, view, edit, and delete apartments through a role-based permission system.

## Architecture

### Backend (PORT 5000)

**Apartment Model:**
```
{
  _id: ObjectId,
  name: String (required),
  description: String,
  imageUrl: String,
  address: String,
  hasUnitsConfigured: Boolean,
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

**API Endpoints:**
- `GET /api/apartments` - Get all apartments (public)
- `GET /api/apartments/:id` - Get apartment by ID (public)
- `POST /api/apartments` - Create new apartment (auth required, manager/admin only)
- `PUT /api/apartments/:id` - Update apartment (auth required, manager/admin only)
- `DELETE /api/apartments/:id` - Delete apartment (auth required, admin only)

### Role-Based Permissions

**Admin:**
- ✅ View apartments
- ✅ Add apartments
- ✅ Edit apartments
- ✅ Delete apartments

**Manager:**
- ✅ View apartments
- ✅ Add apartments
- ✅ Edit apartments
- ❌ Delete apartments

**Caretaker:**
- ✅ View apartments
- ❌ Add apartments
- ❌ Edit apartments
- ❌ Delete apartments

**Accountant:**
- ✅ View apartments
- ❌ Add apartments
- ❌ Edit apartments
- ❌ Delete apartments

## Seeding Initial Data

The backend automatically seeds sample apartments on first run. The seed script preserves existing data (won't duplicate):

```bash
# Seeded apartments:
1. Sunset Apartments - 3-bedroom, $2000-2500/month
2. Harbor View Residences - Luxury waterfront
3. Downtown Lofts - Urban living
```

To manually run seed:
```bash
npm run seed
```

## Frontend Integration

### Components Updated

**AddApartmentDialog.tsx**
- Calls backend API to create apartments
- Shows loading state during submission
- Displays success/error messages using toast notifications
- Validates required fields

**ApartmentDashboard.tsx**
- Shows permission alerts for non-manager users
- Limits Add/Edit/Delete buttons based on user role
- Displays apartment grid with proper cards

**auth.ts (Utility)**
- `getApartments()` - Fetch all apartments
- `createApartment()` - Create new apartment (requires auth)
- `updateApartment()` - Update apartment (requires auth)
- `deleteApartment()` - Delete apartment (requires auth)

## How to Use

### 1. Start the System

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Login_Page
npm run dev
# Navigate to http://localhost:5173
```

### 2. Login

Use demo credentials:
```
Admin:    admin@company.com / admin123
Manager:  manager@company.com / manager123
```

### 3. Add New Apartment

1. Click "Add Apartment" button
2. Fill in details:
   - Property Name (required)
   - Address (optional)
   - Description (required)
   - Image (optional - can upload or paste URL)
3. Click "Add Apartment"
4. See success toast notification
5. New apartment appears in the grid

### 4. View Existing Apartments

- Dashboard displays all apartments from database
- Shows count and status of units
- Click apartment card for more options

### 5. Edit/Delete (Admin only)

- Edit: Modify apartment details
- Delete: Remove apartment from database

## Data Flow Diagram

```
User Login
    ↓
JWT Token stored in localStorage
    ↓
Dashboard loads apartments from /api/apartments
    ↓
User fills Add Apartment form
    ↓
AddApartmentDialog calls createApartment()
    ↓
API sends POST to /api/apartments with JWT token
    ↓
Backend validates: user role must be manager/admin
    ↓
Backend creates apartment in MongoDB
    ↓
Response returns to frontend with apartment id
    ↓
Toast notification shows success
    ↓
Apartment added to UI grid
    ↓
User can immediately see new apartment
```

## Authentication Requirement

All POST/PUT/DELETE requests require:
```
Authorization: Bearer <JWT_TOKEN>
```

The JWT token is:
- Obta ined from login
- Stored in localStorage
- Automatically attached to all API calls via `fetchAPI()` utility

## Troubleshooting

### "Permission denied" Error
- Ensure user is logged in as admin or manager
- Check user role in system

### "Connection error" When Adding Apartment
- Verify backend is running on port 5000
- Check MongoDB is running
- Look at browser console for detailed error

### Apartments Not Showing
- Ensure backend is running
- Check /api/apartments endpoint with Postman
- Verify MongoDB connection

### Duplicate Seeding
- Seed script checks for existing data
- Will not create duplicates on subsequent runs
- Existing data is preserved

## Production Considerations

⚠️ Before deploying to production:

1. **Security:**
   - Change JWT_SECRET to secure random string
   - Enable HTTPS
   - Add CSRF token validation
   - Implement rate limiting

2. **Validation:**
   - Input validation on both frontend and backend
   - Image size limits
   - File type restrictions

3. **File Storage:**
   - Consider cloud storage (S3, Google Cloud) for images
   - Currently using external image URLs

4. **Database:**
   - Add proper indexing
   - Set up backups
   - Monitor database size

5. **Error Handling:**
   - Implement proper error logging
   - User-friendly error messages
   - Sentry or similar for monitoring

## API Examples

### Creating an Apartment with cURL

```bash
curl -X POST http://localhost:5000/api/apartments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Apartment",
    "description": "Beautiful apartment with parking",
    "address": "123 Main St, City",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

### Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "New Apartment",
  "description": "Beautiful apartment with parking",
  "imageUrl": "https://example.com/image.jpg",
  "address": "123 Main St, City",
  "hasUnitsConfigured": false,
  "createdBy": "admin@company.com",
  "createdAt": "2026-03-31T10:30:00.000Z"
}
```

## Next Steps

1. **Units Management:** Link units to apartments
2. **Tenant Management:** Assign tenants to units
3. **Payment Processing:** Track payments per unit
4. **Reports:** Generate financial reports
5. **Notifications:** Email alerts for payments
6. **Image Upload:** Direct image upload to server/cloud storage

## Support

For issues or questions:
1. Check logs in backend terminal
2. Check browser console for frontend errors
3. Verify API endpoints with Postman
4. Review database collections in MongoDB compass
