import { Router } from 'express';
import { 
  getApartments, 
  getApartmentById, 
  createApartment, 
  updateApartment, 
  deleteApartment 
} from '../controllers/apartmentsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public endpoints
router.get('/', getApartments);
router.get('/:id', getApartmentById);

// Protected endpoints (requires authentication)
router.post('/', requireAuth, createApartment);
router.put('/:id', requireAuth, updateApartment);
router.delete('/:id', requireAuth, deleteApartment);

export default router;