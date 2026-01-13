import connectDB from './config/db';
import { Apartment, Unit, User } from './models';
import bcrypt from 'bcryptjs';

async function main() {
  await connectDB();

  // Clear existing seeded collections (optional)
  await Apartment.deleteMany({});
  await Unit.deleteMany({});

  // Apartments data (copied from frontend App.tsx)
  const apartmentsData = [
    {
      name: "Sunset Apartments",
      description: "Spacious 3-bedroom apartments with parking. Modern amenities and beautiful city views.",
      imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      hasUnitsConfigured: true
    },
    {
      name: "Harbor View Residences",
      description: "Luxury waterfront apartments with premium finishes and stunning harbor views.",
      imageUrl: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      hasUnitsConfigured: false
    },
    {
      name: "Downtown Lofts",
      description: "Urban living at its finest. Contemporary design with easy access to the city center.",
      imageUrl: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      hasUnitsConfigured: false
    }
  ];

  const createdApartments = await Apartment.insertMany(apartmentsData);
  console.log(`Inserted ${createdApartments.length} apartments.`);

  // Units data (copied from frontend App.tsx) — link to first apartment
  const unitsData = [
    {
      apartment: createdApartments[0]._id,
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
      apartment: createdApartments[0]._id,
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

  const createdUnits = await Unit.insertMany(unitsData);
  console.log(`Inserted ${createdUnits.length} units.`);

  // Seed admin user (if not exists)
  const adminEmail = 'admin@company.com';
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: adminEmail,
      passwordHash,
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created: admin@company.com / admin123');
  } else {
    console.log('Admin user already exists.');
  }

  console.log('Seed complete.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});