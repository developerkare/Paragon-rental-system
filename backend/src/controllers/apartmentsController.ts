import { Request, Response } from 'express';
import Apartment from '../models/Apartment';

export async function getApartments(req: Request, res: Response) {
  try {
    const apartments = await Apartment.find().lean();
    // map _id to id for frontend compatibility
    const mapped = apartments.map(a => ({
      id: String(a._id),
      name: a.name,
      description: a.description,
      imageUrl: a.imageUrl,
      hasUnitsConfigured: !!a.hasUnitsConfigured,
      createdAt: a.createdAt
    }));
    res.json(mapped);
  } catch (err) {
    console.error('getApartments error', err);
    res.status(500).json({ message: 'Server error' });
  }
}