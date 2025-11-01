import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';

const router = Router();

router.get('/example', exampleController.getExample);
router.post('/example', exampleController.createExample);

export default (app) => {
    app.use('/api', router);
};