import { Router } from 'express';

import v1Router from './v1/index.js';
import roleRouter from './v1/role.route.js';

const apiRouter = Router();

apiRouter.use('/v1', v1Router);
apiRouter.use('/roles', roleRouter);

export default apiRouter;
