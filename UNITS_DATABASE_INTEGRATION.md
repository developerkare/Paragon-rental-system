# Units Database Integration Guide

## Overview
Units are now fully integrated with the MongoDB database and linked to both apartments and tenants.

## Database Schema

### Unit Model
```typescript
{
  _id: ObjectId,
  apartment: ObjectId (ref: Apartment),           // Link to apartment
  tenantId: ObjectId (ref: Tenant),               // Link to tenant (if occupied)
  unitNumber: string,                             // e.g., "Unit 101"
  unitType: string,                               // e.g., "3-bedroom"
  baseRent: number,                               // Base monthly rent
  charges: [
    {
      id: string,
      name: string,                               // e.g., "Water", "Electricity"
      amount: number,
      isOptional: boolean,
      type: "fixed" | "variable"
    }
  ],
  status: "occupied" | "vacant",
  floor: number,
  squareFeet: number,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Get Units
- **GET** `/api/units` - Get all units (requires auth)
- **GET** `/api/units/apartment/:apartmentId` - Get units for specific apartment
- **GET** `/api/units/:id` - Get single unit by ID

### Create Unit
- **POST** `/api/units`
```json
{
  "apartment": "69d8c3a7173fe49d9c70476f",
  "unitNumber": "Unit 101",
  "unitType": "3-bedroom",
  "baseRent": 2500,
  "charges": [
    { "id": "c1", "name": "Water", "amount": 50, "isOptional": false, "type": "variable" },
    { "id": "c2", "name": "Electricity", "amount": 80, "isOptional": false, "type": "variable" }
  ],
  "status": "vacant",
  "floor": 1,
  "squareFeet": 1200
}
```

### Update Unit
- **PUT** `/api/units/:id` - Same payload as POST

### Delete Unit
- **DELETE** `/api/units/:id` - Remove unit from database

## Frontend Integration

### Loading Units
```typescript
import { getUnitsByApartment } from "../utils/auth";

// In component
useEffect(() => {
  const loadUnits = async () => {
    const units = await getUnitsByApartment(apartment.id);
    setUnits(units);
  };
  loadUnits();
}, [apartment.id]);
```

### Creating a Unit
```typescript
import { createUnit } from "../utils/auth";

const newUnit = await createUnit({
  apartment: apartment._id,
  unitNumber: "Unit 101",
  unitType: "3-bedroom",
  baseRent: 2500,
  charges: [...],
  status: "vacant"
});
```

### Linking Tenant to Unit
When a tenant occupies a unit, update the unit with the tenant ID:
```typescript
import { updateUnit } from "../utils/auth";

await updateUnit(unitId, {
  tenantId: tenant._id,
  status: "occupied"
});
```

### Removing Tenant from Unit
```typescript
await updateUnit(unitId, {
  tenantId: null,
  status: "vacant"
});
```

## Example Data Flow

### Scenario 1: Add Unit to Apartment
1. User clicks "Add Unit" in UnitsPage
2. Opens AddEditUnitDialog
3. Fills in unit details (number, type, rent, charges)
4. Clicks Save
5. Frontend calls `createUnit()` with apartment ID
6. Backend creates unit in MongoDB with apartment reference
7. Unit appears in the list with "Vacant" status

### Scenario 2: Occupy Unit with Tenant
1. Unit exists in database with status: "vacant"
2. User assigns tenant to unit
3. Frontend updates unit via `updateUnit()`:
   - `tenantId`: Tenant's MongoDB ID
   - `status`: "occupied"
4. Unit card now displays tenant information
5. Tenant's unit field updated to reference this unit

### Scenario 3: Tenant Leaves Unit
1. Tenant's status changed to "left"
2. Unit is unoccupied
3. Frontend updates unit:
   - `tenantId`: null
   - `status`: "vacant"
4. Unit card shows "No tenant assigned"

## Data Relationships

### Apartment → Units (1-to-Many)
```
Apartment (Sunset Apartments)
├── Unit 101
│   └── Tenant: John Doe
├── Unit 102
│   └── Tenant: Mary Jane
├── Unit 103
│   └── Tenant: Robert Smith
└── Unit 104
    └── (Vacant)
```

### Unit → Tenant (1-to-1 or 1-to-0)
- Unit has tenantId field pointing to Tenant
- Each unit can have 0 or 1 tenant
- Tenant can reference their unit via the unit's unitNumber field (stored in Tenant model separate field)

## Key Features

✅ **Persistent Storage**: All units saved to MongoDB
✅ **Apartment Linking**: Units linked to apartments via apartment._id
✅ **Tenant Mapping**: Units linked to tenants via tenantId
✅ **Status Tracking**: Track occupied vs vacant units
✅ **Rent Calculation**: Automatic total rent calculation with charges
✅ **CRUD Operations**: Full create, read, update, delete support
✅ **API Protected**: All unit endpoints require authentication

## Current Units in Database

### Sunset Apartments
- Unit 101: 3-bedroom, $2,500/month (Occupied - John Doe)
- Unit 102: 2-bedroom, $2,200/month (Occupied - Mary Jane)  
- Unit 103: 3-bedroom, $2,800/month (Occupied - Robert Smith)
- Unit 104: 2-bedroom, $2,300/month (Vacant)

## Troubleshooting

### Units not displaying
1. Check browser console for errors
2. Verify apartment ID matches database apartment._id
3. Check backend logs for API errors
4. Confirm JWT token is valid

### Cannot save unit
1. Ensure apartment._id is provided
2. Check required fields: unitNumber, baseRent
3. Verify authentication token is valid
4. Check MongoDB connection

### Tenant not showing in unit
1. Ensure tenantId field is set on unit
2. Verify tenant ID exists in database
3. Check that getTenantForUnit() is using tenantId not unitId

## Future Enhancements

- [ ] Bulk unit import/export
- [ ] Unit maintenance tracking
- [ ] Lease agreement storage per unit
- [ ] Utility usage tracking
- [ ] Automatic rent reminders
- [ ] Unit availability calendar
