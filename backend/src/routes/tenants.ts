import { Router, Request, Response } from 'express';
import Tenant from '../models/Tenant';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Get all tenants
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const tenants = await Tenant.find().populate('apartment');
    const tenantsData = tenants.map(tenant => ({
      id: tenant._id.toString(),
      apartment: tenant.apartment,
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unit: tenant.unit,
      rentAmount: tenant.rentAmount,
      paymentStatus: tenant.paymentStatus,
      avatar: tenant.avatar,
      joiningDate: tenant.joiningDate,
      paymentDeadline: tenant.paymentDeadline,
      status: tenant.status,
      idNumber: tenant.idNumber,
      birthDate: tenant.birthDate,
      numberOfRooms: tenant.numberOfRooms,
      waterUnits: tenant.waterUnits,
      leftReason: tenant.leftReason,
      leftDate: tenant.leftDate,
      hasAccount: tenant.hasAccount,
      username: tenant.username
    }));
    res.json(tenantsData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants', error });
  }
});

// Get tenants by apartment ID
router.get('/apartment/:apartmentId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { apartmentId } = req.params;
    const tenants = await Tenant.find({ apartment: apartmentId }).populate('apartment');
    const tenantsData = tenants.map(tenant => ({
      id: tenant._id.toString(),
      apartment: tenant.apartment,
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unit: tenant.unit,
      rentAmount: tenant.rentAmount,
      paymentStatus: tenant.paymentStatus,
      avatar: tenant.avatar,
      joiningDate: tenant.joiningDate,
      paymentDeadline: tenant.paymentDeadline,
      status: tenant.status,
      idNumber: tenant.idNumber,
      birthDate: tenant.birthDate,
      numberOfRooms: tenant.numberOfRooms,
      waterUnits: tenant.waterUnits,
      leftReason: tenant.leftReason,
      leftDate: tenant.leftDate,
      hasAccount: tenant.hasAccount,
      username: tenant.username
    }));
    res.json(tenantsData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants', error });
  }
});

// Get single tenant by ID
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findById(id).populate('apartment');
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    const tenantData = {
      id: tenant._id.toString(),
      apartment: tenant.apartment,
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unit: tenant.unit,
      rentAmount: tenant.rentAmount,
      paymentStatus: tenant.paymentStatus,
      avatar: tenant.avatar,
      joiningDate: tenant.joiningDate,
      paymentDeadline: tenant.paymentDeadline,
      status: tenant.status,
      idNumber: tenant.idNumber,
      birthDate: tenant.birthDate,
      numberOfRooms: tenant.numberOfRooms,
      waterUnits: tenant.waterUnits,
      leftReason: tenant.leftReason,
      leftDate: tenant.leftDate,
      hasAccount: tenant.hasAccount,
      username: tenant.username
    };
    res.json(tenantData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenant', error });
  }
});

// Create new tenant
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const tenantData = req.body;
    const tenant = new Tenant(tenantData);
    await tenant.save();
    const populatedTenant = await tenant.populate('apartment');
    res.status(201).json({
      id: populatedTenant._id.toString(),
      ...populatedTenant.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tenant', error });
  }
});

// Update tenant
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantData = req.body;
    const tenant = await Tenant.findByIdAndUpdate(id, tenantData, { new: true }).populate('apartment');
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json({
      id: tenant._id.toString(),
      ...tenant.toObject()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tenant', error });
  }
});

// Delete tenant
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByIdAndDelete(id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tenant', error });
  }
});

// Reset tenant password
router.post('/:id/reset-password', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Generate a temporary password
    const tempPassword = generateTemporaryPassword();
    
    // Update tenant password (in real app, you'd hash this with bcrypt)
    tenant.password = tempPassword;
    await tenant.save();

    res.json({
      message: 'Password reset successfully',
      tempPassword: tempPassword,
      tenantId: tenant._id.toString(),
      tenantName: tenant.name,
      email: tenant.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
});

// Helper function to generate temporary password
function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export default router;
