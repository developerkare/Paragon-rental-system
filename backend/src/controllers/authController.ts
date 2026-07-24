import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Tenant from '../models/Tenant';
import { JWT_SECRET } from '../config/jwt';

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    console.log(`[login] Signing token for user: ${email} with JWT_SECRET length: ${JWT_SECRET.length}`);
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    console.log(`[login] Token created successfully for ${email}`);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function tenantLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const tenant = await Tenant.findOne({ email });
    if (!tenant) return res.status(400).json({ message: 'Invalid credentials' });
    
    // Check if tenant has password set (hasAccount)
    if (!tenant.password) {
      return res.status(400).json({ message: 'No login credentials set for this tenant' });
    }

    // Compare password (plain text - no bcrypt)
    // TODO: In production, implement proper bcrypt hashing for tenant passwords
    if (password !== tenant.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`[tenantLogin] Signing token for tenant: ${email}`);
    const token = jwt.sign({ 
      id: tenant._id, 
      email: tenant.email, 
      role: 'tenant',
      tenantId: tenant._id 
    }, JWT_SECRET, { expiresIn: '8h' });
    
    console.log(`[tenantLogin] Token created successfully for ${email}`);
    res.json({ 
      token, 
      user: { 
        id: tenant._id, 
        name: tenant.name, 
        email: tenant.email, 
        role: 'tenant',
        unit: tenant.unit
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function seedDemoUsers(req: Request, res: Response) {
  const demoUsers = [
    { name: 'Admin User', email: 'admin@company.com', password: 'admin123', role: 'admin' },
    { name: 'John Manager', email: 'manager@company.com', password: 'manager123', role: 'manager' },
    { name: 'Mike Caretaker', email: 'caretaker@company.com', password: 'caretaker123', role: 'caretaker' },
    { name: 'Sarah Accountant', email: 'accountant@company.com', password: 'accountant123', role: 'accountant' }
  ];

  try {
    const results: any[] = [];
    for (const demoUser of demoUsers) {
      const existing = await User.findOne({ email: demoUser.email });
      if (existing) {
        results.push({ email: demoUser.email, status: 'already exists' });
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
      results.push({ email: demoUser.email, status: 'created' });
    }

    res.json({ message: 'Demo users seeded successfully', results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during seeding' });
  }
}