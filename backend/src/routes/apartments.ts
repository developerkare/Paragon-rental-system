import { Router } from 'express';
import { getApartments } from '../controllers/apartmentsController';

const router = Router();

router.get('/', getApartments);

export default router;