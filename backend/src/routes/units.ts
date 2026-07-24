import { Router, Request, Response } from 'express';
import Unit from '../models/Unit';
import { requireAuth } from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /api/units
 * Get all units
 */
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const units = await Unit.find().populate('apartment').populate('tenantId').sort({ unitNumber: 1 });
    const mapped = units.map(u => {
      // Ensure status is correctly set based on tenantId
      const status = u.tenantId ? 'occupied' : 'vacant';
      return {
        id: String(u._id),
        apartment: u.apartment,
        tenantId: u.tenantId ? String(u.tenantId) : undefined,
        unitNumber: u.unitNumber,
        unitType: u.unitType,
        baseRent: u.baseRent,
        charges: u.charges,
        status: status,
        floor: u.floor,
        squareFeet: u.squareFeet,
        createdAt: u.createdAt
      };
    });
    res.json(mapped);
  } catch (err) {
    console.error('getUnits error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/units/apartment/:apartmentId
 * Get units for a specific apartment
 */
router.get('/apartment/:apartmentId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { apartmentId } = req.params;
    console.log(`[units] GET /apartment/:${apartmentId}`);
    console.log(`[units] Searching for units with apartment ID:`, apartmentId);
    
    // Convert string ID to MongoDB ObjectId for proper matching
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(apartmentId);
    } catch (e) {
      console.log(`[units] Invalid apartment ID format: ${apartmentId}`);
      return res.status(400).json({ message: 'Invalid apartment ID format' });
    }
    
    // Query using both ObjectId and string for compatibility
    const units = await Unit.find({ 
      $or: [
        { apartment: objectId },
        { apartment: apartmentId }
      ]
    })
      .populate('apartment')
      .populate('tenantId')
      .sort({ unitNumber: 1 });
    
    console.log(`[units] Found ${units.length} units for apartment ${apartmentId}`);  
    console.log(`[units] Units data:`, JSON.stringify(units.map(u => ({ id: String(u._id), unitNumber: u.unitNumber, apartment: u.apartment })), null, 2));
    
    const mapped = units.map(u => {
      // Ensure status is set correctly based on tenantId
      const status = u.tenantId ? 'occupied' : 'vacant';
      
      return {
        id: String(u._id),
        apartment: u.apartment,
        tenantId: u.tenantId ? String(u.tenantId) : undefined,
        unitNumber: u.unitNumber,
        unitType: u.unitType,
        baseRent: u.baseRent,
        charges: u.charges,
        status: status,
        floor: u.floor,
        squareFeet: u.squareFeet,
        createdAt: u.createdAt
      };
    });
    
    console.log(`[units] Returning ${mapped.length} mapped units`);
    res.json(mapped);
  } catch (err) {
    console.error('getUnitsByApartment error', err);
    res.status(500).json({ message: 'Server error', error: (err as any).message });
  }
});

/**
 * GET /api/units/:id
 * Get a specific unit by ID
 */
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const unit = await Unit.findById(req.params.id).populate('apartment').populate('tenantId');
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    
    // Ensure status is correctly set based on tenantId
    const status = unit.tenantId ? 'occupied' : 'vacant';
    
    res.json({
      id: String(unit._id),
      apartment: unit.apartment,
      tenantId: unit.tenantId ? String(unit.tenantId) : undefined,
      unitNumber: unit.unitNumber,
      unitType: unit.unitType,
      baseRent: unit.baseRent,
      charges: unit.charges,
      status: status,
      floor: unit.floor,
      squareFeet: unit.squareFeet,
      createdAt: unit.createdAt
    });
  } catch (err) {
    console.error('getUnitById error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/units
 * Create a new unit
 */
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { apartment, tenantId, unitNumber, unitType, baseRent, charges, floor, squareFeet } = req.body;

    if (!apartment || !unitNumber || !baseRent) {
      return res.status(400).json({ message: 'Missing required fields: apartment, unitNumber, baseRent' });
    }

    // Convert apartment string to ObjectId if needed
    let apartmentObjectId = apartment;
    if (typeof apartment === 'string') {
      try {
        apartmentObjectId = new mongoose.Types.ObjectId(apartment);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid apartment ID format' });
      }
    }

    // Status is determined by tenantId: if tenantId exists, status is 'occupied', else 'vacant'
    const status = tenantId ? 'occupied' : 'vacant';

    const newUnit = new Unit({
      apartment: apartmentObjectId,
      tenantId: tenantId || null,
      unitNumber,
      unitType,
      baseRent,
      charges: charges || [],
      status,
      floor,
      squareFeet
    });

    const savedUnit = await newUnit.save();
    await savedUnit.populate('apartment');
    if (savedUnit.tenantId) {
      await savedUnit.populate('tenantId');
    }

    res.status(201).json({
      id: String(savedUnit._id),
      apartment: savedUnit.apartment,
      tenantId: savedUnit.tenantId ? String(savedUnit.tenantId) : undefined,
      unitNumber: savedUnit.unitNumber,
      unitType: savedUnit.unitType,
      baseRent: savedUnit.baseRent,
      charges: savedUnit.charges,
      status: savedUnit.status,
      floor: savedUnit.floor,
      squareFeet: savedUnit.squareFeet,
      createdAt: savedUnit.createdAt
    });
  } catch (err) {
    console.error('createUnit error', err);
    res.status(500).json({ message: 'Error creating unit', error: (err as any).message });
  }
});

/**
 * PUT /api/units/:id
 * Update a unit
 */
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { apartment, tenantId, unitNumber, unitType, baseRent, charges, floor, squareFeet } = req.body;

    // Prepare update object
    const updateData: any = {
      updatedAt: new Date()
    };

    if (unitNumber) updateData.unitNumber = unitNumber;
    if (unitType) updateData.unitType = unitType;
    if (baseRent) updateData.baseRent = baseRent;
    if (charges) updateData.charges = charges;
    if (floor !== undefined) updateData.floor = floor;
    if (squareFeet) updateData.squareFeet = squareFeet;
    
    // Handle apartment reference - convert to ObjectId if needed
    if (apartment) {
      try {
        if (typeof apartment === 'string') {
          updateData.apartment = new mongoose.Types.ObjectId(apartment);
        } else {
          updateData.apartment = apartment;
        }
      } catch (e) {
        return res.status(400).json({ message: 'Invalid apartment ID format' });
      }
    }

    // Handle tenantId - always set it even if null
    updateData.tenantId = tenantId || null;
    
    // Status is determined by tenantId presence
    updateData.status = tenantId ? 'occupied' : 'vacant';

    const unit = await Unit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('apartment').populate('tenantId');

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    res.json({
      id: String(unit._id),
      apartment: unit.apartment,
      tenantId: unit.tenantId ? String(unit.tenantId) : undefined,
      unitNumber: unit.unitNumber,
      unitType: unit.unitType,
      baseRent: unit.baseRent,
      charges: unit.charges,
      status: unit.status,
      floor: unit.floor,
      squareFeet: unit.squareFeet,
      createdAt: unit.createdAt
    });
  } catch (err) {
    console.error('updateUnit error', err);
    res.status(500).json({ message: 'Error updating unit', error: (err as any).message });
  }
});

/**
 * DELETE /api/units/:id
 * Delete a unit
 */
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    res.json({ message: 'Unit deleted successfully', id: String(unit._id) });
  } catch (err) {
    console.error('deleteUnit error', err);
    res.status(500).json({ message: 'Error deleting unit', error: (err as any).message });
  }
});

export default router;
