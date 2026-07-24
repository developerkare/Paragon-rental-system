import connectDB from './config/db';
import { Apartment, Unit, User } from './models';
import bcrypt from 'bcryptjs';

async function main() {
  await connectDB();

  // Apartments data
  const apartmentsData = [
    {
      name: "Sunset Apartments",
      description: "Spacious 3-bedroom apartments with parking. Modern amenities and beautiful city views.",
      imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      address: "123 Sunset Boulevard, Los Angeles, CA",
      hasUnitsConfigured: true
    },
    {
      name: "Harbor View Residences",
      description: "Luxury waterfront apartments with premium finishes and stunning harbor views.",
      imageUrl: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      address: "456 Harbor Lane, San Francisco, CA",
      hasUnitsConfigured: false
    },
    {
      name: "Downtown Lofts",
      description: "Urban living at its finest. Contemporary design with easy access to the city center.",
      imageUrl: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      address: "789 Downtown Street, New York, NY",
      hasUnitsConfigured: false
    }
  ];

  // Check if apartments already exist
  const existingApartmentCount = await Apartment.countDocuments();
  let createdApartments: any[] = [];

  if (existingApartmentCount === 0) {
    createdApartments = await Apartment.insertMany(apartmentsData);
    console.log(`✓ Inserted ${createdApartments.length} apartments.`);
  } else {
    console.log(`✓ Apartments already exist (${existingApartmentCount} found). Skipping apartment insertion.`);
    createdApartments = await Apartment.find({});
  }

  // Units data — link to first apartment
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

  // Check if units already exist
  const existingUnitsCount = await Unit.countDocuments();
  if (existingUnitsCount === 0) {
    await Unit.insertMany(unitsData);
    console.log(`✓ Inserted ${unitsData.length} units.`);
  } else {
    console.log(`✓ Units already exist (${existingUnitsCount} found). Skipping units insertion.`);
  }

  // Seed demo users for all login roles (if not exists)
  const demoUsers = [
    {
      name: 'Admin User',
      email: 'admin@company.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      name: 'John Manager',
      email: 'manager@company.com',
      password: 'manager123',
      role: 'manager'
    },
    {
      name: 'Mike Caretaker',
      email: 'caretaker@company.com',
      password: 'caretaker123',
      role: 'caretaker'
    },
    {
      name: 'Sarah Accountant',
      email: 'accountant@company.com',
      password: 'accountant123',
      role: 'accountant'
    }
  ];

  for (const demoUser of demoUsers) {
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
    console.log(`✓ User created: ${demoUser.email} / ${demoUser.password}`);
  }

  console.log('\n✓ Seed complete.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});