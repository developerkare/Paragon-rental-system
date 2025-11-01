import express from 'express';
import { json } from 'body-parser';
import routes from './routes';
import { logger } from './utils/logger';
import { config } from './config';

const app = express();
const PORT = config.PORT || 3000;

app.use(json());
app.use(logger);

routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});