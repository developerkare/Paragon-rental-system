import { Router } from 'express';
import { register, login, seedDemoUsers, tenantLogin } from '../controllers/authController';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/tenant-login', tenantLogin);
router.post('/seed-demo-users', seedDemoUsers);

export default router;