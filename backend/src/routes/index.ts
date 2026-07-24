import { Router, Express } from 'express';

const router = Router();

export default (app: Express) => {
    app.use('/api', router);
};