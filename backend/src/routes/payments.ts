import { Router, Request, Response } from 'express';
import Payment from '../models/Payment';
import { requireAuth } from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /api/payments
 * Get all payments
 */
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find()
      .populate('tenant')
      .populate('apartment')
      .sort({ date: -1 });

    const mapped = payments.map(p => ({
      id: String(p._id),
      tenant: p.tenant,
      apartment: p.apartment,
      tenantName: p.tenantName,
      unit: p.unit,
      amount: p.amount,
      date: p.date.toISOString().split('T')[0],
      method: p.method,
      status: p.status,
      transactionId: p.transactionId,
      notes: p.notes,
      createdAt: p.createdAt
    }));

    res.json(mapped);
  } catch (err) {
    console.error('getPayments error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/payments/apartment/:apartmentId
 * Get payments for a specific apartment
 */
router.get('/apartment/:apartmentId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { apartmentId } = req.params;

    // Convert to ObjectId if needed
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(apartmentId);
    } catch (e) {
      return res.json([]);
    }

    const payments = await Payment.find({
      $or: [{ apartment: objectId }, { apartment: apartmentId }]
    })
      .populate('tenant')
      .populate('apartment')
      .sort({ date: -1 });

    const mapped = payments.map(p => ({
      id: String(p._id),
      tenant: p.tenant,
      apartment: p.apartment,
      tenantName: p.tenantName,
      unit: p.unit,
      amount: p.amount,
      date: p.date.toISOString().split('T')[0],
      method: p.method,
      status: p.status,
      transactionId: p.transactionId,
      notes: p.notes,
      createdAt: p.createdAt
    }));

    res.json(mapped);
  } catch (err) {
    console.error('getPaymentsByApartment error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/payments/:id
 * Get a specific payment by ID
 */
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('tenant')
      .populate('apartment');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      id: String(payment._id),
      tenant: payment.tenant,
      apartment: payment.apartment,
      tenantName: payment.tenantName,
      unit: payment.unit,
      amount: payment.amount,
      date: payment.date.toISOString().split('T')[0],
      method: payment.method,
      status: payment.status,
      transactionId: payment.transactionId,
      notes: payment.notes,
      createdAt: payment.createdAt
    });
  } catch (err) {
    console.error('getPaymentById error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/payments
 * Create a new payment
 */
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { tenant, apartment, tenantName, unit, amount, date, method, status, transactionId, notes } = req.body;

    if (!tenantName || !unit || !amount || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert IDs to ObjectId if provided
    let tenantObjectId = tenant ? new mongoose.Types.ObjectId(tenant) : undefined;
    let apartmentObjectId = apartment ? new mongoose.Types.ObjectId(apartment) : undefined;

    const payment = new Payment({
      tenant: tenantObjectId,
      apartment: apartmentObjectId,
      tenantName,
      unit,
      amount,
      date: new Date(date),
      method: method || 'bank_transfer',
      status: status || 'claimed',
      transactionId,
      notes
    });

    const savedPayment = await payment.save();
    await savedPayment.populate('tenant');
    await savedPayment.populate('apartment');

    res.status(201).json({
      id: String(savedPayment._id),
      tenant: savedPayment.tenant,
      apartment: savedPayment.apartment,
      tenantName: savedPayment.tenantName,
      unit: savedPayment.unit,
      amount: savedPayment.amount,
      date: savedPayment.date.toISOString().split('T')[0],
      method: savedPayment.method,
      status: savedPayment.status,
      transactionId: savedPayment.transactionId,
      notes: savedPayment.notes,
      createdAt: savedPayment.createdAt
    });
  } catch (err) {
    console.error('createPayment error', err);
    res.status(500).json({ message: 'Error creating payment', error: (err as any).message });
  }
});

/**
 * PUT /api/payments/:id
 * Update a payment
 */
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { tenant, apartment, tenantName, unit, amount, date, method, status, transactionId, notes } = req.body;

    const updateData: any = { updatedAt: new Date() };

    if (tenantName) updateData.tenantName = tenantName;
    if (unit) updateData.unit = unit;
    if (amount) updateData.amount = amount;
    if (date) updateData.date = new Date(date);
    if (method) updateData.method = method;
    if (status) updateData.status = status;
    if (transactionId) updateData.transactionId = transactionId;
    if (notes !== undefined) updateData.notes = notes;

    if (tenant) {
      try {
        updateData.tenant = new mongoose.Types.ObjectId(tenant);
      } catch (e) {
        updateData.tenant = null;
      }
    }

    if (apartment) {
      try {
        updateData.apartment = new mongoose.Types.ObjectId(apartment);
      } catch (e) {
        updateData.apartment = null;
      }
    }

    const payment = await Payment.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('tenant')
      .populate('apartment');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      id: String(payment._id),
      tenant: payment.tenant,
      apartment: payment.apartment,
      tenantName: payment.tenantName,
      unit: payment.unit,
      amount: payment.amount,
      date: payment.date.toISOString().split('T')[0],
      method: payment.method,
      status: payment.status,
      transactionId: payment.transactionId,
      notes: payment.notes,
      createdAt: payment.createdAt
    });
  } catch (err) {
    console.error('updatePayment error', err);
    res.status(500).json({ message: 'Error updating payment', error: (err as any).message });
  }
});

/**
 * DELETE /api/payments/:id
 * Delete a payment
 */
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('deletePayment error', err);
    res.status(500).json({ message: 'Error deleting payment' });
  }
});

export default router;
