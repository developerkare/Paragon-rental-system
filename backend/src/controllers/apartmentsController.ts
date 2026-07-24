import { Request, Response } from 'express';
import Apartment from '../models/Apartment';
import { AuthRequest } from '../middleware/auth';

export async function getApartments(req: Request, res: Response) {
  try {
    const apartments = await Apartment.find().lean();
    // map _id to id for frontend compatibility
    const mapped = apartments.map(a => ({
      id: String(a._id),
      name: a.name,
      description: a.description,
      imageUrl: a.imageUrl,
      address: a.address,
      hasUnitsConfigured: !!a.hasUnitsConfigured,
      createdBy: a.createdBy,
      createdAt: a.createdAt
    }));
    res.json(mapped);
  } catch (err) {
    console.error('getApartments error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getApartmentById(req: Request, res: Response) {
  try {
    const apartment = await Apartment.findById(req.params.id).lean();
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    
    res.json({
      id: String(apartment._id),
      name: apartment.name,
      description: apartment.description,
      imageUrl: apartment.imageUrl,
      address: apartment.address,
      hasUnitsConfigured: !!apartment.hasUnitsConfigured,
      createdBy: apartment.createdBy,
      createdAt: apartment.createdAt
    });
  } catch (err) {
    console.error('getApartmentById error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createApartment(req: AuthRequest, res: Response) {
  try {
    console.log('\n[createApartment] ===== REQUEST START =====');
    console.log('[createApartment] User:', req.user);
    console.log('[createApartment] User role:', req.user?.role);
    console.log('[createApartment] Body:', req.body);
    
    const { name, description, imageUrl, address } = req.body;

    // Validate required fields
    if (!name) {
      console.log('[createApartment] ❌ Missing name');
      return res.status(400).json({ message: 'Apartment name is required' });
    }

    // Check if user has permission (manager or admin)
    const userRole = req.user?.role;
    console.log('[createApartment] Checking permissions for role:', userRole);
    
    if (!userRole || !['manager', 'admin'].includes(userRole)) {
      console.log('[createApartment] ❌ Permission denied for role:', userRole);
      return res.status(403).json({ message: 'Permission denied. Only managers and admins can create apartments' });
    }

    console.log('[createApartment] ✅ Permission granted');

    // Create apartment
    console.log('[createApartment] Creating apartment:', { name, description, address });
    const apartment = new Apartment({
      name,
      description,
      imageUrl,
      address,
      createdBy: req.user?.email || 'system',
      hasUnitsConfigured: false
    });

    console.log('[createApartment] Saving to database...');
    await apartment.save();
    
    console.log('[createApartment] ✅ Saved successfully:', apartment._id);

    const result = {
      id: String(apartment._id),
      name: apartment.name,
      description: apartment.description,
      imageUrl: apartment.imageUrl,
      address: apartment.address,
      hasUnitsConfigured: apartment.hasUnitsConfigured,
      createdBy: apartment.createdBy,
      createdAt: apartment.createdAt
    };

    console.log('[createApartment] ===== REQUEST END (201 CREATED) =====\n');
    res.status(201).json(result);
  } catch (err) {
    console.error('[createApartment] ❌ ERROR:', err);
    console.log('[createApartment] ===== REQUEST END (500 ERROR) =====\n');
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateApartment(req: AuthRequest, res: Response) {
  try {
    const { name, description, imageUrl, address, hasUnitsConfigured } = req.body;

    // Check if user has permission
    const userRole = req.user?.role;
    if (!userRole || !['manager', 'admin'].includes(userRole)) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        imageUrl,
        address,
        hasUnitsConfigured,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

    res.json({
      id: String(apartment._id),
      name: apartment.name,
      description: apartment.description,
      imageUrl: apartment.imageUrl,
      address: apartment.address,
      hasUnitsConfigured: !!apartment.hasUnitsConfigured,
      createdBy: apartment.createdBy,
      createdAt: apartment.createdAt
    });
  } catch (err) {
    console.error('updateApartment error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteApartment(req: AuthRequest, res: Response) {
  try {
    // Check if user has permission
    const userRole = req.user?.role;
    if (!userRole || !['admin'].includes(userRole)) {
      return res.status(403).json({ message: 'Permission denied. Only admins can delete apartments' });
    }

    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

    res.json({ message: 'Apartment deleted successfully' });
  } catch (err) {
    console.error('deleteApartment error', err);
    res.status(500).json({ message: 'Server error' });
  }
}