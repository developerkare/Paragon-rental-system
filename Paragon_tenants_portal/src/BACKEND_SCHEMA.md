# Tenant Panel Application - Backend Schema Documentation

## Table of Contents
1. [Authentication](#authentication)
2. [User/Tenant Entity](#usertenant-entity)
3. [Bills Entity](#bills-entity)
4. [Complaints Entity](#complaints-entity)
5. [Feedback Entity](#feedback-entity)
6. [Payments Entity](#payments-entity)
7. [Lease Agreement Entity](#lease-agreement-entity)
8. [Property Condition Documentation Entity](#property-condition-documentation-entity)
9. [Notifications Entity](#notifications-entity)
10. [API Endpoints](#api-endpoints)
11. [Database Relationships](#database-relationships)

---

## Authentication

### Authentication Flow

The application uses JWT (JSON Web Token) based authentication with the following flow:

1. **Login**: User submits email and password
2. **Token Generation**: Server validates credentials and returns JWT token
3. **Token Storage**: Client stores token in localStorage
4. **Authenticated Requests**: Token sent in Authorization header for protected routes
5. **Token Refresh**: Refresh token mechanism for extended sessions
6. **Logout**: Token removed from client storage

### Authentication Endpoints

#### POST `/api/auth/login`
**Description**: Authenticate tenant and return JWT token

**Request Body**:
```json
{
  "email": "tenant@email.com",
  "password": "securePassword123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "uuid-123",
    "email": "tenant@email.com",
    "name": "John Doe",
    "tenantId": "TNT-001"
  }
}
```

**Error Response (401)**:
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

#### POST `/api/auth/logout`
**Description**: Invalidate user session and token

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

#### POST `/api/auth/refresh`
**Description**: Refresh expired access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "token": "new_jwt_token_here",
  "refreshToken": "new_refresh_token_here"
}
```

#### POST `/api/auth/forgot-password`
**Description**: Request password reset link

**Request Body**:
```json
{
  "email": "tenant@email.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

#### POST `/api/auth/reset-password`
**Description**: Reset password using token from email

**Request Body**:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "newSecurePassword123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password successfully reset"
}
```

#### POST `/api/auth/change-password`
**Description**: Change password for authenticated user

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Request Body**:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password successfully changed"
}
```

#### GET `/api/auth/verify`
**Description**: Verify if current token is valid

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Success Response (200)**:
```json
{
  "success": true,
  "user": {
    "id": "uuid-123",
    "email": "tenant@email.com",
    "name": "John Doe",
    "tenantId": "TNT-001"
  }
}
```

### Security Considerations

- Passwords must be hashed using bcrypt or Argon2
- Minimum password length: 8 characters
- JWT tokens should expire after 1 hour
- Refresh tokens should expire after 7 days
- Implement rate limiting on login endpoint (max 5 attempts per 15 minutes)
- Use HTTPS for all authentication endpoints
- Implement CSRF protection for authenticated requests
- Store refresh tokens securely (httpOnly cookies recommended)

---

## User/Tenant Entity

### Table Name: `tenants` or `users`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `fullName` | String | Yes | Min 2 chars | Tenant's full name |
| `email` | String | Yes | Valid email format | Tenant's email address |
| `phone` | String | Yes | Phone format | Primary phone number |
| `alternatePhone` | String | No | Phone format | Secondary contact number |
| `profilePhoto` | String/URL | No | Max 5MB | Profile photo URL or base64 |
| `apartmentNumber` | String | Yes | - | Apartment/unit number |
| `buildingName` | String | Yes | - | Building name |
| `roomType` | Enum | No | bedsitter, 1bedroom, 2bedroom, 3bedroom | Type of rental unit |
| `moveInDate` | Date | Yes | Valid date | Date tenant moved in |
| `numberOfOccupants` | Integer/String | Yes | 1-5+ | Number of people living in unit |
| `emergencyContact` | String | Yes | Min 2 chars | Emergency contact person name |
| `emergencyPhone` | String | Yes | Phone format | Emergency contact phone |
| `idNumber` | String | No | - | National ID/Passport number |
| `idType` | Enum | No | nationalId, passport, driverLicense | Type of identification |
| `idDocument` | String/URL | No | Max 5MB | ID document URL or base64 |
| `additionalNotes` | Text | No | Max 1000 chars | Additional information |
| `accountBalance` | Decimal | Yes | Default: 0 | Current account balance in KSh |
| `registrationDate` | Timestamp | Yes | Auto-generated | Registration timestamp |
| `createdAt` | Timestamp | Yes | Auto-generated | Record creation timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Record update timestamp |
| `isActive` | Boolean | Yes | Default: true | Account active status |

### Sample JSON Object
```json
{
  "id": "uuid-123",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+254712345678",
  "alternatePhone": "+254723456789",
  "profilePhoto": "https://storage.example.com/photos/user123.jpg",
  "apartmentNumber": "A-101",
  "buildingName": "Sunset Apartments",
  "roomType": "2bedroom",
  "moveInDate": "2024-01-15",
  "numberOfOccupants": "2",
  "emergencyContact": "Jane Doe",
  "emergencyPhone": "+254734567890",
  "idNumber": "12345678",
  "idType": "nationalId",
  "idDocument": "https://storage.example.com/docs/id123.pdf",
  "additionalNotes": "Pet owner - has one small dog",
  "accountBalance": -245000,
  "registrationDate": "2024-01-10T10:30:00Z",
  "createdAt": "2024-01-10T10:30:00Z",
  "updatedAt": "2024-12-15T14:22:00Z",
  "isActive": true
}
```

---

## Bills Entity

### Table Name: `bills`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `title` | String | Yes | Min 3 chars | Bill title/name |
| `description` | Text | No | Max 500 chars | Detailed description |
| `amount` | Decimal | Yes | > 0 | Bill amount in KSh |
| `dueDate` | Date | Yes | Valid date | Payment due date |
| `category` | Enum | Yes | Rent, Utilities, Water, Electricity, Maintenance, Other | Bill category |
| `status` | Enum | Yes | pending, paid, overdue, cancelled | Payment status |
| `billDate` | Date | Yes | Valid date | Date bill was issued |
| `paymentDate` | Date | No | Valid date | Date payment was made (if paid) |
| `paymentReference` | String | No | - | Payment transaction reference |
| `lateFee` | Decimal | No | >= 0 | Late payment fee in KSh |
| `notes` | Text | No | Max 1000 chars | Additional notes |
| `attachments` | Array[String] | No | URLs | Attached documents/receipts |
| `createdAt` | Timestamp | Yes | Auto-generated | Record creation timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Record update timestamp |

### Sample JSON Object
```json
{
  "id": "bill-456",
  "tenantId": "uuid-123",
  "title": "Electricity Bill",
  "description": "Monthly electricity consumption for November 2024",
  "amount": 12000,
  "dueDate": "2025-11-05",
  "category": "Utilities",
  "status": "pending",
  "billDate": "2024-11-01",
  "paymentDate": null,
  "paymentReference": null,
  "lateFee": 0,
  "notes": "Meter reading: 1234 kWh",
  "attachments": [],
  "createdAt": "2024-11-01T08:00:00Z",
  "updatedAt": "2024-11-01T08:00:00Z"
}
```

### Bill Categories
- `Rent` - Monthly rent payment
- `Utilities` - Electricity, water, gas
- `Water` - Water bill
- `Electricity` - Electricity bill
- `Maintenance` - Repairs and maintenance
- `Other` - Miscellaneous charges

### Bill Statuses
- `pending` - Awaiting payment
- `paid` - Payment completed
- `overdue` - Past due date
- `cancelled` - Bill cancelled

---

## Complaints Entity

### Table Name: `complaints`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `category` | Enum | Yes | Maintenance, Plumbing, Electrical, Noise, Security, Cleanliness, Other | Complaint category |
| `priority` | Enum | Yes | low, medium, high, urgent | Priority level |
| `subject` | String | Yes | Min 5 chars | Complaint subject/title |
| `description` | Text | Yes | Min 20 chars | Detailed description |
| `location` | String | No | - | Specific location (e.g., "Kitchen", "Bathroom") |
| `status` | Enum | Yes | pending, in-progress, resolved, closed | Current status |
| `images` | Array[String] | No | URLs, Max 5 | Uploaded images |
| `assignedTo` | String | No | - | Staff member assigned to complaint |
| `resolutionNotes` | Text | No | - | Notes on how complaint was resolved |
| `resolvedAt` | Timestamp | No | - | When complaint was resolved |
| `createdAt` | Timestamp | Yes | Auto-generated | Submission timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Last update timestamp |

### Sample JSON Object
```json
{
  "id": "complaint-789",
  "tenantId": "uuid-123",
  "category": "Plumbing",
  "priority": "high",
  "subject": "Leaking kitchen sink",
  "description": "The kitchen sink has been leaking for the past 2 days. Water is dripping from the pipe underneath.",
  "location": "Kitchen",
  "status": "in-progress",
  "images": [
    "https://storage.example.com/complaints/img1.jpg",
    "https://storage.example.com/complaints/img2.jpg"
  ],
  "assignedTo": "Maintenance Team A",
  "resolutionNotes": null,
  "resolvedAt": null,
  "createdAt": "2024-12-15T09:30:00Z",
  "updatedAt": "2024-12-15T14:00:00Z"
}
```

### Complaint Categories
- `Maintenance` - General maintenance issues
- `Plumbing` - Water, pipes, drainage
- `Electrical` - Wiring, outlets, lights
- `Noise` - Noise complaints
- `Security` - Security concerns
- `Cleanliness` - Cleaning issues
- `Other` - Other issues

### Complaint Priorities
- `low` - Can wait, not urgent
- `medium` - Should be addressed soon
- `high` - Needs prompt attention
- `urgent` - Requires immediate action

### Complaint Statuses
- `pending` - Awaiting review
- `in-progress` - Being worked on
- `resolved` - Issue fixed
- `closed` - Complaint closed

---

## Feedback Entity

### Table Name: `feedback`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | No | Foreign key | Reference to tenant (null if anonymous) |
| `isAnonymous` | Boolean | Yes | Default: false | Whether feedback is anonymous |
| `category` | Enum | Yes | General, Service, Facilities, Staff, Maintenance, Suggestion, Other | Feedback category |
| `rating` | Integer | No | 1-5 | Overall rating |
| `subject` | String | Yes | Min 5 chars | Feedback subject |
| `message` | Text | Yes | Min 20 chars | Detailed feedback message |
| `status` | Enum | Yes | pending, reviewed, addressed | Review status |
| `adminResponse` | Text | No | - | Response from management |
| `respondedAt` | Timestamp | No | - | When admin responded |
| `createdAt` | Timestamp | Yes | Auto-generated | Submission timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Last update timestamp |

### Sample JSON Object
```json
{
  "id": "feedback-321",
  "tenantId": "uuid-123",
  "isAnonymous": false,
  "category": "Service",
  "rating": 4,
  "subject": "Excellent cleaning service",
  "message": "The cleaning team did an excellent job with the common areas this week. Very professional and thorough.",
  "status": "reviewed",
  "adminResponse": "Thank you for your positive feedback! We'll share this with our cleaning team.",
  "respondedAt": "2024-12-16T10:00:00Z",
  "createdAt": "2024-12-15T16:30:00Z",
  "updatedAt": "2024-12-16T10:00:00Z"
}
```

### Feedback Categories
- `General` - General feedback
- `Service` - Service quality
- `Facilities` - Building facilities
- `Staff` - Staff performance
- `Maintenance` - Maintenance quality
- `Suggestion` - Improvement suggestions
- `Other` - Other feedback

### Feedback Statuses
- `pending` - Awaiting review  
- `reviewed` - Has been reviewed
- `addressed` - Action taken

---

## Payments Entity

### Table Name: `payments`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `billId` | UUID/String | No | Foreign key | Reference to bill (if applicable) |
| `amount` | Decimal | Yes | > 0 | Payment amount in KSh |
| `paymentMethod` | Enum | Yes | mpesa, bank, cash, card | Payment method used |
| `transactionReference` | String | Yes | Unique | Transaction/receipt number |
| `paymentDate` | Timestamp | Yes | Valid date | When payment was made |
| `status` | Enum | Yes | pending, completed, failed, refunded | Payment status |
| `phoneNumber` | String | No | Phone format | Phone number for receipt |
| `email` | String | No | Email format | Email for receipt |
| `receiptUrl` | String | No | URL | Generated receipt URL |
| `receiptSent` | Boolean | Yes | Default: false | Whether receipt was sent |
| `sentVia` | Enum | No | sms, email, both | How receipt was sent |
| `notes` | Text | No | Max 500 chars | Payment notes |
| `createdAt` | Timestamp | Yes | Auto-generated | Record creation timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Record update timestamp |

### Sample JSON Object
```json
{
  "id": "payment-654",
  "tenantId": "uuid-123",
  "billId": "bill-456",
  "amount": 120000,
  "paymentMethod": "mpesa",
  "transactionReference": "QH2K3L4M5N",
  "paymentDate": "2024-12-15T11:30:00Z",
  "status": "completed",
  "phoneNumber": "+254712345678",
  "email": "john.doe@example.com",
  "receiptUrl": "https://storage.example.com/receipts/payment-654.pdf",
  "receiptSent": true,
  "sentVia": "both",
  "notes": "Monthly rent payment for December 2024",
  "createdAt": "2024-12-15T11:30:00Z",
  "updatedAt": "2024-12-15T11:32:00Z"
}
```

### Payment Methods
- `mpesa` - M-Pesa mobile payment
- `bank` - Bank transfer
- `cash` - Cash payment
- `card` - Card payment

### Payment Statuses
- `pending` - Payment processing
- `completed` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded

---

## Lease Agreement Entity

### Table Name: `lease_agreements`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `landlordName` | String | Yes | Min 2 chars | Landlord's full name |
| `landlordEmail` | String | No | Valid email format | Landlord's email address |
| `landlordPhone` | String | No | Phone format | Landlord's phone number |
| `landlordAddress` | String | No | - | Landlord's address |
| `tenantName` | String | Yes | Min 2 chars | Tenant's full name |
| `tenantEmail` | String | No | Valid email format | Tenant's email address |
| `tenantPhone` | String | No | Phone format | Tenant's phone number |
| `tenantIdNumber` | String | No | - | Tenant's ID number |
| `propertyAddress` | String | Yes | Min 5 chars | Complete property address |
| `apartmentNumber` | String | No | - | Apartment/unit number |
| `buildingName` | String | No | - | Building name |
| `roomType` | Enum | No | bedsitter, 1bedroom, 2bedroom, 3bedroom, 4bedroom | Type of rental unit |
| `leaseStartDate` | Date | Yes | Valid date | Start date of lease |
| `leaseEndDate` | Date | Yes | Valid date | End date of lease |
| `leaseDuration` | Enum | No | 6months, 1year, 2years, 3years, custom | Duration of lease |
| `monthlyRent` | Decimal | Yes | > 0 | Monthly rent amount in KSh |
| `securityDeposit` | Decimal | Yes | >= 0 | Security deposit amount in KSh |
| `paymentDueDate` | Integer | No | 1-28 | Day of month rent is due |
| `lateFeeAmount` | Decimal | No | >= 0 | Late payment fee in KSh |
| `utilitiesIncluded` | Enum | No | all, water, none, custom | Utilities included in rent |
| `parkingIncluded` | Enum | No | yes, no, extra | Parking availability |
| `petsAllowed` | Enum | No | yes, no, small | Pet policy |
| `smokingAllowed` | Enum | No | yes, no, outdoor | Smoking policy |
| `maintenanceResponsibilities` | Text | No | Max 2000 chars | Maintenance responsibilities description |
| `specialTerms` | Text | No | Max 2000 chars | Special terms and conditions |
| `additionalNotes` | Text | No | Max 2000 chars | Additional notes |
| `quietHoursStart` | Time | No | Valid time | Quiet hours start time |
| `quietHoursEnd` | Time | No | Valid time | Quiet hours end time |
| `guestPolicy` | Text | No | Max 1000 chars | Guest policy description |
| `customRules` | Text | No | Max 2000 chars | Custom property rules |
| `rulesAcknowledged` | Boolean | Yes | Default: false | Whether tenant acknowledged house rules |
| `leaseDocument` | String/URL | No | Max 10MB | Uploaded lease document URL or base64 |
| `isSigned` | Boolean | Yes | Default: false | Whether lease has been signed |
| `signedDate` | Timestamp | No | - | When lease was signed |
| `status` | Enum | Yes | pending, active, expired, terminated | Current status of lease |
| `submissionDate` | Timestamp | Yes | Auto-generated | When lease was submitted |
| `createdAt` | Timestamp | Yes | Auto-generated | Record creation timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Record update timestamp |

### Sample JSON Object
```json
{
  "id": "lease-123",
  "tenantId": "uuid-123",
  "landlordName": "Jane Smith",
  "landlordEmail": "jane.smith@example.com",
  "landlordPhone": "+254700000000",
  "landlordAddress": "123 Main Street, Nairobi",
  "tenantName": "John Doe",
  "tenantEmail": "john.doe@example.com",
  "tenantPhone": "+254712345678",
  "tenantIdNumber": "12345678",
  "propertyAddress": "456 Oak Avenue, Westlands, Nairobi",
  "apartmentNumber": "A-101",
  "buildingName": "Sunset Apartments",
  "roomType": "2bedroom",
  "leaseStartDate": "2024-01-15",
  "leaseEndDate": "2025-01-15",
  "leaseDuration": "1year",
  "monthlyRent": 25000,
  "securityDeposit": 25000,
  "paymentDueDate": 5,
  "lateFeeAmount": 500,
  "utilitiesIncluded": "water",
  "parkingIncluded": "yes",
  "petsAllowed": "no",
  "smokingAllowed": "no",
  "maintenanceResponsibilities": "Landlord responsible for major repairs. Tenant responsible for minor maintenance.",
  "specialTerms": "Rent may be reviewed annually with 3 months notice.",
  "additionalNotes": "Property includes fitted kitchen cabinets and window blinds.",
  "quietHoursStart": "22:00",
  "quietHoursEnd": "06:00",
  "guestPolicy": "Guests allowed for up to 3 consecutive days. Longer stays require landlord approval.",
  "customRules": "No parties without prior landlord approval. Common areas must be kept clean.",
  "rulesAcknowledged": true,
  "leaseDocument": "https://storage.example.com/leases/lease-123.pdf",
  "isSigned": true,
  "signedDate": "2024-01-10T15:30:00Z",
  "status": "active",
  "submissionDate": "2024-01-10T10:30:00Z",
  "createdAt": "2024-01-10T10:30:00Z",
  "updatedAt": "2024-01-10T15:30:00Z"
}
```

### Mandatory House Rules
All lease agreements include the following mandatory house rules that tenants must acknowledge:

1. 🔇 No loud noise or disturbances, especially during quiet hours
2. 🚭 No smoking inside the premises
3. 🐾 No pets allowed without prior written consent
4. ⚖️ No illegal activities or substances on the property
5. 🧹 Maintain cleanliness and hygiene in the unit
6. 🗑️ Proper waste disposal in designated areas
7. 🔧 No unauthorized repairs or alterations to the property
8. 🏢 Respect common areas and shared facilities
9. 🚫 No subletting or unauthorized occupants
10. 💰 Pay rent on time as per the lease agreement
11. 📞 Report maintenance issues promptly to landlord
12. 🛡️ No intentional damage to property or fixtures
13. 📋 Follow all building rules and regulations
14. 👥 No excessive or long-term guests without approval

### Room Types
- `bedsitter` - Single room unit
- `1bedroom` - One bedroom apartment
- `2bedroom` - Two bedroom apartment
- `3bedroom` - Three bedroom apartment
- `4bedroom` - Four or more bedroom apartment

### Lease Durations
- `6months` - Six month lease
- `1year` - One year lease
- `2years` - Two year lease
- `3years` - Three year lease
- `custom` - Custom duration

### Utilities Options
- `all` - All utilities included
- `water` - Water only
- `none` - No utilities included
- `custom` - Custom arrangement

### Parking Options
- `yes` - Parking included in rent
- `no` - No parking available
- `extra` - Parking available at extra charge

### Pet Policy
- `yes` - Pets allowed
- `no` - No pets allowed
- `small` - Small pets only

### Smoking Policy
- `yes` - Smoking allowed
- `no` - No smoking allowed
- `outdoor` - Outdoor smoking only

### Lease Statuses
- `pending` - Lease pending signature
- `active` - Lease is currently in effect
- `expired` - Lease has ended
- `terminated` - Lease was terminated early

---

## Property Condition Documentation Entity

### Table Name: `property_condition_documents`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `inspectionDate` | Date | Yes | Valid date | Date of inspection |
| `conditionDescription` | Text | Yes | Max 5000 chars | Description of property condition |
| `attachments` | Array[String] | No | URLs | Attached documents/receipts |
| `createdAt` | Timestamp | Yes | Auto-generated | Record creation timestamp |
| `updatedAt` | Timestamp | Yes | Auto-updated | Record update timestamp |

### Sample JSON Object
```json
{
  "id": "condition-456",
  "tenantId": "uuid-123",
  "inspectionDate": "2024-01-10",
  "conditionDescription": "Property is in good condition with minor wear and tear.",
  "attachments": [
    "https://storage.example.com/conditions/condition-456.pdf"
  ],
  "createdAt": "2024-01-10T10:30:00Z",
  "updatedAt": "2024-01-10T10:30:00Z"
}
```

---

## Notifications Entity

### Table Name: `notifications`

| Field Name | Type | Required | Validation | Description |
|------------|------|----------|------------|-------------|
| `id` | UUID/String | Yes | Unique | Primary key |
| `tenantId` | UUID/String | Yes | Foreign key | Reference to tenant |
| `type` | Enum | Yes | bill, payment, complaint, announcement, reminder, system | Notification type |
| `title` | String | Yes | Min 3 chars | Notification title |
| `message` | Text | Yes | Min 10 chars | Notification message |
| `priority` | Enum | Yes | low, medium, high | Priority level |
| `isRead` | Boolean | Yes | Default: false | Read status |
| `readAt` | Timestamp | No | - | When notification was read |
| `actionUrl` | String | No | URL | Link for action (e.g., view bill) |
| `relatedEntityType` | String | No | - | Type of related entity (bill, payment, etc.) |
| `relatedEntityId` | String | No | - | ID of related entity |
| `expiresAt` | Timestamp | No | - | When notification expires |
| `createdAt` | Timestamp | Yes | Auto-generated | Notification timestamp |

### Sample JSON Object
```json
{
  "id": "notif-999",
  "tenantId": "uuid-123",
  "type": "bill",
  "title": "New Bill: Electricity",
  "message": "A new electricity bill of KSh 12,000 has been generated and is due on November 5, 2024.",
  "priority": "medium",
  "isRead": false,
  "readAt": null,
  "actionUrl": "/bills/bill-456",
  "relatedEntityType": "bill",
  "relatedEntityId": "bill-456",
  "expiresAt": "2024-12-01T00:00:00Z",
  "createdAt": "2024-11-01T08:00:00Z"
}
```

### Notification Types
- `bill` - New bill notifications
- `payment` - Payment confirmations
- `complaint` - Complaint updates
- `announcement` - General announcements
- `reminder` - Payment reminders
- `system` - System notifications

### Notification Priorities
- `low` - Informational
- `medium` - Standard
- `high` - Urgent attention needed

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new tenant
POST   /api/auth/login             - Login tenant
POST   /api/auth/logout            - Logout tenant
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
GET    /api/auth/me                - Get current user
```

### Tenants/Users
```
GET    /api/tenants                - Get all tenants (admin)
GET    /api/tenants/:id            - Get tenant by ID
PUT    /api/tenants/:id            - Update tenant profile
DELETE /api/tenants/:id            - Delete tenant (admin)
POST   /api/tenants/:id/photo      - Upload profile photo
DELETE /api/tenants/:id/photo      - Delete profile photo
POST   /api/tenants/:id/document   - Upload ID document
```

### Bills
```
GET    /api/bills                  - Get all bills for tenant
GET    /api/bills/:id              - Get bill by ID
POST   /api/bills                  - Create new bill (admin)
PUT    /api/bills/:id              - Update bill (admin)
DELETE /api/bills/:id              - Delete bill (admin)
GET    /api/bills/stats            - Get bill statistics
GET    /api/bills/export           - Export bills to CSV/PDF
```

Query Parameters for GET /api/bills:
- `status` - Filter by status (pending, paid, overdue)
- `category` - Filter by category
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `search` - Search in title/description
- `sort` - Sort field (dueDate, amount, category)
- `order` - Sort order (asc, desc)
- `page` - Page number
- `limit` - Items per page

### Complaints
```
GET    /api/complaints             - Get all complaints for tenant
GET    /api/complaints/:id         - Get complaint by ID
POST   /api/complaints             - Submit new complaint
PUT    /api/complaints/:id         - Update complaint
DELETE /api/complaints/:id         - Delete complaint
POST   /api/complaints/:id/images  - Upload complaint images
PATCH  /api/complaints/:id/status  - Update complaint status (admin)
```

### Feedback
```
GET    /api/feedback               - Get all feedback (admin)
GET    /api/feedback/:id           - Get feedback by ID
POST   /api/feedback               - Submit feedback
PUT    /api/feedback/:id           - Update feedback
DELETE /api/feedback/:id           - Delete feedback
POST   /api/feedback/:id/respond   - Admin response to feedback
```

### Payments
```
GET    /api/payments               - Get all payments for tenant
GET    /api/payments/:id           - Get payment by ID
POST   /api/payments               - Create payment record
PUT    /api/payments/:id           - Update payment
POST   /api/payments/mpesa         - Process M-Pesa payment
POST   /api/payments/:id/receipt   - Generate and send receipt
GET    /api/payments/:id/receipt   - Download receipt
GET    /api/payments/stats         - Get payment statistics
```

### Lease Agreements
```
GET    /api/leases                 - Get all lease agreements for tenant
GET    /api/leases/:id             - Get lease agreement by ID
POST   /api/leases                 - Create new lease agreement
PUT    /api/leases/:id             - Update lease agreement
DELETE /api/leases/:id             - Delete lease agreement (admin)
POST   /api/leases/:id/document    - Upload lease document
DELETE /api/leases/:id/document    - Delete lease document
PATCH  /api/leases/:id/sign        - Sign lease agreement
PATCH  /api/leases/:id/acknowledge - Acknowledge house rules
GET    /api/leases/:id/download    - Download lease document
GET    /api/leases/active          - Get active lease for tenant
```

### Notifications
```
GET    /api/notifications          - Get all notifications for tenant
GET    /api/notifications/:id      - Get notification by ID
PATCH  /api/notifications/:id/read - Mark notification as read
PATCH  /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id      - Delete notification
GET    /api/notifications/unread   - Get unread count
```

### Dashboard
```
GET    /api/dashboard/stats        - Get dashboard statistics
GET    /api/dashboard/recent-bills - Get recent bills
GET    /api/dashboard/summary      - Get account summary
```

### Support
```
POST   /api/support/ticket         - Submit support ticket
GET    /api/support/tickets        - Get support tickets
GET    /api/support/tickets/:id    - Get ticket by ID
```

---

## Database Relationships

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│     TENANTS     │
│  (users table)  │
└────────┬────────┘
         │
         │ 1:N
         │
         ├──────────┬──────────┬──────────┬──────────┐
         │          │          │          │          │
         ▼          ▼          ▼          ▼          ▼
    ┌────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
    │ BILLS  │ │COMPLAINTS│ │ FEEDBACK │ │ PAYMENTS │ │NOTIFICATIONS │
    └────┬───┘ └──────────┘ └──────────┘ └────┬─────┘ └──────────────┘
         │                                     │
         │                                     │
         │ 1:N                                 │ N:1
         │                                     │
         └─────────────────────────────────────┘
```

### Relationships:
1. **Tenants → Bills**: One-to-Many
   - One tenant can have many bills
   - Each bill belongs to one tenant

2. **Tenants → Complaints**: One-to-Many
   - One tenant can submit many complaints
   - Each complaint belongs to one tenant

3. **Tenants → Feedback**: One-to-Many
   - One tenant can submit multiple feedback entries
   - Each feedback belongs to one tenant (or null if anonymous)

4. **Tenants → Payments**: One-to-Many
   - One tenant can make many payments
   - Each payment belongs to one tenant

5. **Bills → Payments**: One-to-Many
   - One bill can have multiple payments (partial payments)
   - Each payment can reference one bill (or null for general payments)

6. **Tenants → Notifications**: One-to-Many
   - One tenant can have many notifications
   - Each notification belongs to one tenant

---

## Additional Configurations

### File Storage Structure
```
storage/
├── profile-photos/
│   └── {tenantId}/
│       └── profile.jpg
├── id-documents/
│   └── {tenantId}/
│       └── id-document.pdf
├── complaint-images/
│   └── {complaintId}/
│       ├── image1.jpg
│       ├── image2.jpg
│       └── ...
├── payment-receipts/
│   └── {paymentId}/
│       └── receipt.pdf
└── bill-attachments/
    └── {billId}/
        └── attachment.pdf
```

### Environment Variables Required
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tenant_panel
DATABASE_POOL_SIZE=20

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
REFRESH_TOKEN_EXPIRATION=30d

# Storage
STORAGE_PROVIDER=aws-s3  # or local, cloudinary
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=

# Payment Gateway (M-Pesa)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=

# Email Service
EMAIL_PROVIDER=smtp  # or sendgrid, mailgun
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=noreply@tenantpanel.com

# SMS Service
SMS_PROVIDER=africa-talking  # or twilio
SMS_API_KEY=
SMS_USERNAME=
SMS_SENDER_ID=

# Application
APP_URL=https://tenantpanel.com
APP_ENV=production
APP_DEBUG=false
PORT=3000

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

### Indexes Recommendations
```sql
-- Tenants table
CREATE INDEX idx_tenants_email ON tenants(email);
CREATE INDEX idx_tenants_phone ON tenants(phone);
CREATE INDEX idx_tenants_apartment ON tenants(apartmentNumber);

-- Bills table
CREATE INDEX idx_bills_tenant_id ON bills(tenantId);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_bills_due_date ON bills(dueDate);
CREATE INDEX idx_bills_category ON bills(category);
CREATE INDEX idx_bills_tenant_status ON bills(tenantId, status);

-- Complaints table
CREATE INDEX idx_complaints_tenant_id ON complaints(tenantId);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_category ON complaints(category);

-- Feedback table
CREATE INDEX idx_feedback_tenant_id ON feedback(tenantId);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_anonymous ON feedback(isAnonymous);

-- Payments table
CREATE INDEX idx_payments_tenant_id ON payments(tenantId);
CREATE INDEX idx_payments_bill_id ON payments(billId);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_ref ON payments(transactionReference);
CREATE INDEX idx_payments_date ON payments(paymentDate);

-- Notifications table
CREATE INDEX idx_notifications_tenant_id ON notifications(tenantId);
CREATE INDEX idx_notifications_is_read ON notifications(isRead);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_tenant_unread ON notifications(tenantId, isRead);
```

---

## Security Considerations

### Authentication & Authorization
- Use JWT tokens for authentication
- Implement role-based access control (RBAC): `tenant`, `admin`, `super-admin`
- Secure password hashing (bcrypt, argon2)
- Implement password strength requirements
- Add rate limiting to prevent brute force attacks

### Data Protection
- Encrypt sensitive data at rest (ID numbers, documents)
- Use HTTPS for all communications
- Sanitize all user inputs to prevent SQL injection
- Implement CORS policies
- Add CSP (Content Security Policy) headers

### File Upload Security
- Validate file types and sizes
- Scan uploaded files for malware
- Store files with randomized names
- Implement access control for file downloads
- Set proper file permissions

### API Security
- Implement API rate limiting
- Use API keys for third-party integrations
- Validate all input data
- Implement request size limits
- Add request logging and monitoring

---

## Validation Rules Summary

### Email Validation
- Valid email format
- Unique per tenant
- Max length: 255 characters

### Phone Validation
- Valid phone format (Kenyan numbers: +254...)
- Min length: 10 digits
- Max length: 15 digits

### Password Requirements
- Min length: 8 characters
- Must contain: uppercase, lowercase, number, special character
- Max length: 128 characters

### File Upload Limits
- Images: Max 5MB, formats: JPG, PNG, GIF
- Documents: Max 5MB, formats: PDF, JPG, PNG
- Max files per upload: 5 (for complaints)

### Amount Validation
- Must be positive number
- Max 2 decimal places
- Max value: 10,000,000 KSh

### Date Validation
- Valid date format: YYYY-MM-DD
- Past dates allowed for historical data
- Future dates for due dates and move-in dates

---

## Sample API Request/Response

### Create Bill (POST /api/bills)
**Request:**
```json
{
  "tenantId": "uuid-123",
  "title": "Rent Payment",
  "description": "Monthly rent for December 2024",
  "amount": 120000,
  "dueDate": "2024-12-05",
  "category": "Rent",
  "billDate": "2024-12-01"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Bill created successfully",
  "data": {
    "id": "bill-789",
    "tenantId": "uuid-123",
    "title": "Rent Payment",
    "description": "Monthly rent for December 2024",
    "amount": 120000,
    "dueDate": "2024-12-05",
    "category": "Rent",
    "status": "pending",
    "billDate": "2024-12-01",
    "createdAt": "2024-12-01T08:00:00Z",
    "updatedAt": "2024-12-01T08:00:00Z"
  }
}
```

### Get Bills with Filters (GET /api/bills)
**Request:**
```
GET /api/bills?status=pending&category=Utilities&sort=dueDate&order=asc&page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "bills": [
      {
        "id": "bill-456",
        "title": "Electricity Bill",
        "amount": 12000,
        "dueDate": "2024-11-05",
        "category": "Utilities",
        "status": "pending"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
}
```

### Submit Complaint (POST /api/complaints)
**Request:**
```json
{
  "category": "Plumbing",
  "priority": "high",
  "subject": "Leaking kitchen sink",
  "description": "The kitchen sink has been leaking for 2 days.",
  "location": "Kitchen"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Complaint submitted successfully",
  "data": {
    "id": "complaint-789",
    "tenantId": "uuid-123",
    "category": "Plumbing",
    "priority": "high",
    "subject": "Leaking kitchen sink",
    "description": "The kitchen sink has been leaking for 2 days.",
    "location": "Kitchen",
    "status": "pending",
    "createdAt": "2024-12-15T09:30:00Z"
  }
}
```

---

## WebSocket Events (Real-time Updates)

### Events to Emit
```javascript
// New notification
socket.emit('notification:new', {
  tenantId: 'uuid-123',
  notification: { ... }
});

// Bill status update
socket.emit('bill:updated', {
  tenantId: 'uuid-123',
  billId: 'bill-456',
  status: 'paid'
});

// Complaint status update
socket.emit('complaint:status', {
  tenantId: 'uuid-123',
  complaintId: 'complaint-789',
  status: 'in-progress'
});

// Payment confirmation
socket.emit('payment:confirmed', {
  tenantId: 'uuid-123',
  paymentId: 'payment-654',
  amount: 120000
});
```

---

## Cron Jobs / Scheduled Tasks

### Daily Tasks
- Check for overdue bills and update status
- Send payment reminders for bills due in 3 days
- Generate monthly rent bills (1st of each month)

### Weekly Tasks
- Clean up old notifications (>30 days)
- Generate weekly reports for admins
- Backup database

### Monthly Tasks
- Archive old bills and payments
- Generate monthly statements
- Calculate late fees for overdue bills

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

---

## Testing Checklist

### Unit Tests
- [ ] User registration and authentication
- [ ] Bill CRUD operations
- [ ] Payment processing
- [ ] Complaint submission
- [ ] Feedback submission
- [ ] Notification creation

### Integration Tests
- [ ] Bill creation → Notification sent
- [ ] Payment → Bill status update
- [ ] User registration → Welcome notification
- [ ] Overdue bill → Status update + reminder

### End-to-End Tests
- [ ] Complete user registration flow
- [ ] Bill creation to payment flow
- [ ] Complaint submission to resolution flow
- [ ] Feedback submission and response flow

---

## Migration Strategy

### Phase 1: Core Features
1. User authentication and profile management
2. Bill management system
3. Payment processing

### Phase 2: Support Features
1. Complaints system
2. Feedback system
3. Notifications

### Phase 3: Advanced Features
1. Dashboard analytics
2. Real-time updates (WebSocket)
3. Advanced reporting

### Phase 4: Optimization
1. Performance optimization
2. Caching implementation
3. Load balancing

---

**Document Version:** 1.0  
**Last Updated:** December 17, 2024  
**Maintained By:** Development Team