# Postman Guide: Create & Login a Tenant

## Quick Setup

You have two options to create a logged-in tenant:

### **Option 1: Use Admin Login (Fastest)**

If you want to use an admin account to manage tenants, use the demo admin credentials:

```
Email: admin@company.com
Password: admin123
```

### **Option 2: Create Full Tenant Account with Login**

This creates a tenant profile AND login credentials.

---

## Step-by-Step Instructions

### **Step 1: Get Admin Token (or User Token)**

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Request Body:**
```json
{
  "email": "admin@company.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "name": "Admin User",
    "email": "admin@company.com",
    "role": "admin"
  }
}
```

**Copy the `token` value** - you'll need this for all subsequent requests.

---

### **Step 2: Get Existing Tenant (or Create One)**

#### **A) Get All Tenants:**

**Endpoint:** `GET http://localhost:5000/api/tenants`

**Headers:**
```
Authorization: Bearer {token_from_step1}
Content-Type: application/json
```

**Response:** Returns all tenants. Note one tenant's `id` that you want to give login credentials.

#### **B) Create New Tenant (Optional):**

**Endpoint:** `POST http://localhost:5000/api/tenants`

**Headers:**
```
Authorization: Bearer {token_from_step1}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "phone": "555-0123",
  "unit": "101",
  "rentAmount": 1500,
  "idNumber": "ID123456",
  "birthDate": "1990-01-15",
  "joiningDate": "2024-01-01",
  "paymentStatus": "paid",
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "status": "active"
}
```

**Response:** Returns the created tenant including the `id`.

---

### **Step 3: Reset/Set Tenant Password**

**Endpoint:** `POST http://localhost:5000/api/tenants/:id/reset-password`

Replace `:id` with the tenant's ID from Step 2.

**Headers:**
```
Authorization: Bearer {token_from_step1}
Content-Type: application/json
```

**No request body needed** (endpoint generates password automatically)

**Response:**
```json
{
  "message": "Password reset successfully",
  "tempPassword": "aB3$xYzK9mN2",
  "tenantId": "tenant_id_here",
  "tenantName": "John Doe",
  "email": "john.doe@email.com"
}
```

**Copy the `tempPassword`** - this is what the tenant uses to log in.

---

### **Step 4: Login as the Tenant**

**⚠️ IMPORTANT: Use the TENANT login endpoint (NOT the regular login)**

**Endpoint:** `POST http://localhost:5000/api/auth/tenant-login`

**Request Body:**
```json
{
  "email": "john.doe@email.com",
  "password": "aB3$xYzK9mN2"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "tenant_id_here",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "role": "tenant",
    "unit": "101"
  }
}
```

**Copy this `token`** - this is the tenant's authenticated session! ✅

---

### **Step 5: Use Tenant Token for API Calls**

Now you can make requests as the logged-in tenant:

**Example - Get Tenant's Own Profile:**

**Endpoint:** `GET http://localhost:5000/api/tenants/{tenant_id}`

**Headers:**
```
Authorization: Bearer {tenant_token_from_step4}
Content-Type: application/json
```

---

## Postman Collection JSON

Import this collection into Postman for easy use:

```json
{
  "info": {
    "name": "Tenant Login Workflow",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Get Admin Token",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"admin@company.com\",\n  \"password\": \"admin123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "auth", "login"]
        }
      }
    },
    {
      "name": "2. Get All Tenants",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{adminToken}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/tenants",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tenants"]
        }
      }
    },
    {
      "name": "3. Create New Tenant",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{adminToken}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Jane Smith\",\n  \"email\": \"jane.smith@email.com\",\n  \"phone\": \"555-9876\",\n  \"unit\": \"205\",\n  \"rentAmount\": 1800,\n  \"idNumber\": \"ID789012\",\n  \"birthDate\": \"1992-05-20\",\n  \"joiningDate\": \"2024-03-01\",\n  \"paymentStatus\": \"paid\",\n  \"avatar\": \"https://api.dicebear.com/7.x/avataaars/svg?seed=Jane\",\n  \"status\": \"active\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/tenants",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tenants"]
        }
      }
    },
    {
      "name": "4. Reset Tenant Password",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{adminToken}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/tenants/{{tenantId}}/reset-password",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tenants", "{{tenantId}}", "reset-password"]
        }
      }
    },
    {
      "name": "5. Tenant Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"jane.smith@email.com\",\n  \"password\": \"{{tempPassword}}\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/auth/tenant-login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "auth", "tenant-login"]
        }
      }
    },
    {
      "name": "6. Get Tenant Profile (as Logged-In Tenant)",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{tenantToken}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/tenants/{{tenantId}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "tenants", "{{tenantId}}"]
        }
      }
    }
  ]
}
```

---

## Using Postman Variables

To make this workflow even smoother, set up these **Environment Variables** in Postman:

| Variable | Example | Where to Get |
|----------|---------|--------------|
| `adminToken` | `eyJ...` | Response from Step 1 |
| `tenantId` | `507f1f77...` | Response from Step 2 or 3 |
| `tempPassword` | `aB3$xYzK9mN2` | Response from Step 4 |
| `tenantToken` | `eyJ...` | Response from Step 5 |
| `tenantEmail` | `jane.smith@email.com` | Use in Step 5 request |

---

## ⚠️ IMPORTANT: Tenant Login Endpoint

**Use `/api/auth/tenant-login` NOT `/api/auth/login`**

The regular login endpoint checks the Admin User table, while tenants authenticate against the Tenant table. 

- `/api/auth/login` → For Admin/Manager/Staff (User table)
- `/api/auth/tenant-login` → For Tenants (Tenant table) ✅

---

## Troubleshooting

### "Invalid credentials" error on tenant login

**Cause**: Using the wrong `/api/auth/login` endpoint

**Solution**: Switch to `POST /api/auth/tenant-login`

### Tenant password shows as "tempPassword" but login fails

**Cause**: Password not synced between systems

**Solution**: 
1. Make sure you used `/api/tenants/:id/reset-password` first
2. Use the exact password returned in the response
3. Use `/api/auth/tenant-login` (not `/api/auth/login`)

---

You can also use these pre-seeded demo accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | admin123 | Admin |
| manager@company.com | manager123 | Manager |
| caretaker@company.com | caretaker123 | Caretaker |
| accountant@company.com | accountant123 | Accountant |

---

## Summary

✅ **After completing these 5 steps, you'll have:**
- A tenant record in the database
- A password set for that tenant
- A JWT token representing the tenant's logged-in session
- The ability to make API calls as that tenant

Use the **tenant token** from Step 5 in Postman to test any endpoints that require authentication!
