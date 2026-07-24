import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables FIRST
const envPath = path.resolve(__dirname, '..', '.env');
console.log('[INFO] Loading .env from:', envPath);
dotenv.config({ path: envPath });
console.log('[INFO] Environment variables loaded');
console.log('[INFO] JWT_SECRET is set:', !!process.env.JWT_SECRET);
console.log('[INFO] JWT_SECRET value length:', process.env.JWT_SECRET?.length || 'undefined');

import connectDB from './config/db';
import authRoutes from './routes/auth';
import apartmentsRoutes from './routes/apartments';
import unitsRoutes from './routes/units';
import tenantsRoutes from './routes/tenants';
import paymentsRoutes from './routes/payments';
import User from './models/User';
import Apartment from './models/Apartment';
import Unit from './models/Unit';
import Tenant from './models/Tenant';
import Payment from './models/Payment';
const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/apartments', apartmentsRoutes);
app.use('/api/units', unitsRoutes);
app.use('/api/tenants', tenantsRoutes);
app.use('/api/payments', paymentsRoutes);

// Serve frontend build (adjust path if needed)
const frontendDist = path.join(process.cwd(), '..', 'Login_Page', 'dist');
app.use(express.static(frontendDist));
app.get('*', (req, res) => res.sendFile(path.join(frontendDist, 'index.html')));

// Auto-seed demo data on startup
async function seedDemoData() {
  try {
    console.log('[SEEDING] Checking demo data...');
    
    // First, clean up any orphaned units (units that reference non-existent apartments)
    console.log('[SEEDING] Cleaning up orphaned units...');
    const allUnits = await Unit.find({});
    for (const unit of allUnits) {
      if (unit.apartment) {
        const apartmentExists = await Apartment.findById(unit.apartment);
        if (!apartmentExists) {
          console.log(`[SEEDING] Deleting orphaned unit: ${unit.unitNumber}`);
          await Unit.deleteOne({ _id: unit._id });
        }
      }
    }

    // Seed apartments
    const apartmentsData = [
      {
        name: "Sunset Apartments",
        description: "Spacious 3-bedroom apartments with parking. Modern amenities and beautiful city views.",
        imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        address: "123 Sunset Boulevard, Los Angeles, CA",
        hasUnitsConfigured: true,
        createdBy: "system"
      },
      {
        name: "Harbor View Residences",
        description: "Luxury waterfront apartments with premium finishes and stunning harbor views.",
        imageUrl: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        address: "456 Harbor Lane, San Francisco, CA",
        hasUnitsConfigured: false,
        createdBy: "system"
      },
      {
        name: "Downtown Lofts",
        description: "Urban living at its finest. Contemporary design with easy access to the city center.",
        imageUrl: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        address: "789 Downtown Street, New York, NY",
        hasUnitsConfigured: false,
        createdBy: "system"
      }
    ];

    let createdApartments: any[] = [];
    
    // Check if demo apartments exist (by checking if Sunset Apartments exists)
    const sunsetExists = await Apartment.findOne({ name: "Sunset Apartments" });
    
    if (!sunsetExists) {
      console.log('[SEEDING] Creating demo apartments...');
      createdApartments = await Apartment.insertMany(apartmentsData);
      console.log(`✓ Created ${createdApartments.length} demo apartments`);
    } else {
      console.log('[SEEDING] Demo apartments already exist, using existing apartments');
      // Get all system-created apartments
      createdApartments = await Apartment.find({ createdBy: "system" });
      if (createdApartments.length === 0) {
        // If no system apartments found, create them
        createdApartments = await Apartment.insertMany(apartmentsData);
        console.log(`✓ Created ${createdApartments.length} demo apartments`);
      }
    }

    // Seed units for first apartment
    if (createdApartments.length > 0) {
      const sunsetApt = createdApartments[0];
      console.log(`[SEEDING] Linking units to apartment: ${sunsetApt.name} (ID: ${sunsetApt._id})`);

      const unitsData = [
        {
          apartment: sunsetApt._id,
          unitNumber: "Unit 101",
          unitType: "2-bedroom",
          baseRent: 2000,
          charges: [
            { id: "c1", name: "Water", amount: 50, isOptional: false, type: "variable" },
            { id: "c2", name: "Electricity", amount: 80, isOptional: false, type: "variable" },
            { id: "c3", name: "Garbage", amount: 20, isOptional: false, type: "fixed" }
          ],
          status: "vacant",
          floor: 1,
          squareFeet: 850
        },
        {
          apartment: sunsetApt._id,
          unitNumber: "Unit 102",
          unitType: "3-bedroom",
          baseRent: 2500,
          charges: [
            { id: "c4", name: "Water", amount: 60, isOptional: false, type: "variable" },
            { id: "c5", name: "Electricity", amount: 100, isOptional: false, type: "variable" },
            { id: "c6", name: "Parking", amount: 50, isOptional: true, type: "fixed" }
          ],
          status: "vacant",
          floor: 1,
          squareFeet: 1200
        }
      ];

      // Check if demo units exist for this apartment
      const existingUnit101 = await Unit.findOne({ unitNumber: "Unit 101", apartment: sunsetApt._id });
      
      if (!existingUnit101) {
        console.log('[SEEDING] Creating demo units...');
        await Unit.insertMany(unitsData);
        console.log(`✓ Created ${unitsData.length} demo units for ${sunsetApt.name}`);
      } else {
        console.log(`✓ Demo units already exist for ${sunsetApt.name}`);
      }
    }

    console.log('[SEEDING] Demo data check complete');
  } catch (err) {
    console.error('[SEEDING] Error seeding demo data:', err);
  }
}

// Auto-seed demo tenants on startup
async function seedDemoTenants() {
  try {
    console.log('[SEEDING] Checking demo tenants...');

    // Get the first apartment (Sunset Apartments)
    const sunsetApt = await Apartment.findOne({ name: "Sunset Apartments" });
    if (!sunsetApt) {
      console.log('[SEEDING] Sunset Apartments not found, skipping tenant seeding');
      return;
    }

    const tenantAvatars = [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NjAzOTg2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2MDM5ODYzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDM5ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ];

    const tenantsData = [
      {
        apartment: sunsetApt._id,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        unit: "Unit 101",
        rentAmount: 2500,
        paymentStatus: "paid" as const,
        avatar: tenantAvatars[0],
        joiningDate: "2023-01-01",
        paymentDeadline: "2024-11-05",
        status: "active" as const,
        idNumber: "0712345678",
        birthDate: "1990-05-15",
        numberOfRooms: 2,
        waterUnits: 45
      },
      {
        apartment: sunsetApt._id,
        name: "Mary Jane",
        email: "mary@example.com",
        phone: "+1 (555) 234-5678",
        unit: "Unit 102",
        rentAmount: 2200,
        paymentStatus: "paid" as const,
        avatar: tenantAvatars[1],
        joiningDate: "2023-03-01",
        paymentDeadline: "2024-11-01",
        status: "active" as const,
        idNumber: "0823456789",
        birthDate: "1988-09-22",
        numberOfRooms: 1,
        waterUnits: 32
      },
      {
        apartment: sunsetApt._id,
        name: "Robert Smith",
        email: "robert@example.com",
        phone: "+1 (555) 345-6789",
        unit: "Unit 103",
        rentAmount: 2800,
        paymentStatus: "unpaid" as const,
        avatar: tenantAvatars[2],
        joiningDate: "2023-02-01",
        paymentDeadline: "2024-10-25",
        status: "active" as const,
        idNumber: "0734567890",
        birthDate: "1985-03-10",
        numberOfRooms: 3,
        waterUnits: 58
      },
      {
        apartment: sunsetApt._id,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1 (555) 456-7890",
        unit: "Unit 104",
        rentAmount: 2300,
        paymentStatus: "paid" as const,
        avatar: tenantAvatars[3],
        joiningDate: "2023-06-01",
        status: "left" as const,
        idNumber: "0845678901",
        birthDate: "1992-11-30",
        numberOfRooms: 2,
        waterUnits: 0,
        leftReason: "Relocated to another city for work",
        leftDate: "2023-12-01"
      }
    ];

    // Check if demo tenants already exist
    const existingTenant = await Tenant.findOne({ email: "john@example.com" });
    
    if (!existingTenant) {
      console.log('[SEEDING] Creating demo tenants...');
      await Tenant.insertMany(tenantsData);
      console.log(`✓ Created ${tenantsData.length} demo tenants for ${sunsetApt.name}`);
    } else {
      console.log(`✓ Demo tenants already exist`);
    }

    console.log('[SEEDING] Demo tenants check complete');
  } catch (err) {
    console.error('[SEEDING] Error seeding demo tenants:', err);
  }
}

// Auto-seed demo users on startup
async function seedDemoUsers() {
  const demoUsers = [
    { name: 'Admin User', email: 'admin@company.com', password: 'admin123', role: 'admin' },
    { name: 'John Manager', email: 'manager@company.com', password: 'manager123', role: 'manager' },
    { name: 'Mike Caretaker', email: 'caretaker@company.com', password: 'caretaker123', role: 'caretaker' },
    { name: 'Sarah Accountant', email: 'accountant@company.com', password: 'accountant123', role: 'accountant' }
  ];

  for (const demoUser of demoUsers) {
    try {
      const existing = await User.findOne({ email: demoUser.email });
      if (existing) {
        console.log(`✓ User already exists: ${demoUser.email}`);
        continue;
      }

      const passwordHash = await bcrypt.hash(demoUser.password, 10);
      const user = new User({
        name: demoUser.name,
        email: demoUser.email,
        passwordHash,
        role: demoUser.role
      });
      await user.save();
      console.log(`✓ User created: ${demoUser.email}`);
    } catch (err) {
      console.error(`Error seeding user ${demoUser.email}:`, err);
    }
  }
}

// Auto-seed demo payments on startup
async function seedDemoPayments() {
  try {
    console.log('[SEEDING] Checking demo payments...');

    // Get the first apartment and tenants
    const sunsetApt = await Apartment.findOne({ name: 'Sunset Apartments' });
    if (!sunsetApt) {
      console.log('[SEEDING] Sunset Apartments not found, skipping payment seeding');
      return;
    }

    const tenants = await Tenant.find({ apartment: sunsetApt._id });
    if (tenants.length === 0) {
      console.log('[SEEDING] No tenants found, skipping payment seeding');
      return;
    }

    // Check if demo payments already exist
    const existingPayment = await Payment.findOne({ tenantName: 'John Doe' });
    if (existingPayment) {
      console.log('[SEEDING] Demo payments already exist');
      return;
    }

    // Create demo payments for each tenant
    const paymentsData = [
      {
        tenant: tenants[0]._id,
        apartment: sunsetApt._id,
        tenantName: 'John Doe',
        unit: 'Unit 101',
        amount: 2500,
        date: new Date('2024-10-15'),
        method: 'bank_transfer',
        status: 'claimed',
        transactionId: 'TXN20241015001',
        notes: 'October 2024 rent payment'
      },
      {
        tenant: tenants[0]._id,
        apartment: sunsetApt._id,
        tenantName: 'John Doe',
        unit: 'Unit 101',
        amount: 2500,
        date: new Date('2024-09-15'),
        method: 'online',
        status: 'claimed',
        transactionId: 'TXN20240915001',
        notes: 'September 2024 rent payment'
      },
      {
        tenant: tenants[1]._id,
        apartment: sunsetApt._id,
        tenantName: 'Mary Jane',
        unit: 'Unit 102',
        amount: 2200,
        date: new Date('2024-10-10'),
        method: 'cash',
        status: 'claimed',
        notes: 'October 2024 rent payment - cash'
      },
      {
        tenant: tenants[1]._id,
        apartment: sunsetApt._id,
        tenantName: 'Mary Jane',
        unit: 'Unit 102',
        amount: 2200,
        date: new Date('2024-09-10'),
        method: 'bank_transfer',
        status: 'claimed',
        transactionId: 'TXN20240910001',
        notes: 'September 2024 rent payment'
      },
      {
        tenant: tenants[2]._id,
        apartment: sunsetApt._id,
        tenantName: 'Robert Smith',
        unit: 'Unit 103',
        amount: 2800,
        date: new Date('2024-08-20'),
        method: 'check',
        status: 'claimed',
        transactionId: 'CHK20240820001',
        notes: 'August 2024 rent payment - check'
      },
      {
        tenant: null,
        apartment: sunsetApt._id,
        tenantName: 'Unknown Tenant',
        unit: 'Unit 104',
        amount: 2300,
        date: new Date('2024-10-05'),
        method: 'cash',
        status: 'unclaimed',
        notes: 'Unclaimed payment - needs to be matched to tenant'
      },
      {
        tenant: tenants[0]._id,
        apartment: sunsetApt._id,
        tenantName: 'John Doe',
        unit: 'Unit 101',
        amount: 150,
        date: new Date('2024-10-15'),
        method: 'online',
        status: 'claimed',
        notes: 'Water charges - October 2024'
      },
      {
        tenant: tenants[1]._id,
        apartment: sunsetApt._id,
        tenantName: 'Mary Jane',
        unit: 'Unit 102',
        amount: 100,
        date: new Date('2024-10-10'),
        method: 'online',
        status: 'claimed',
        notes: 'Electricity charges - October 2024'
      }
    ];

    await Payment.insertMany(paymentsData);
    console.log(`✓ Created ${paymentsData.length} demo payments for ${sunsetApt.name}`);
    console.log('[SEEDING] Demo payments check complete');
  } catch (err) {
    console.error('[SEEDING] Error seeding demo payments:', err);
  }
}

const PORT = process.env.PORT || 5000;
connectDB()
  .then(async () => {
    console.log('\n[SEEDING] Starting demo data seed...');
    await seedDemoData();
    console.log('[SEEDING] Starting tenant seed...');
    await seedDemoTenants();
    console.log('[SEEDING] Starting user seed...');
    await seedDemoUsers();
    console.log('[SEEDING] Starting payment seed...');
    await seedDemoPayments();
    console.log('[SEEDING] Seed complete!\n');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
  });