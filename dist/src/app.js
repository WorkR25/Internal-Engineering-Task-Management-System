import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import { attchCorrelationMiddleware } from './middlewares/correlationId.middleware.js';
import apiRouter from './routes/index.js';
import { NotfoundError } from './utils/errors/app.error.js';
const app = express();
app.set('json replacer', (_key, value) => typeof value === 'bigint' ? value.toString() : value);
app.use(express.json());
app.use(express.text());
app.use(attchCorrelationMiddleware);
app.get('/health', (_req, res) => {
    res.send({
        status: 'OK'
    });
});
app.use('/api', apiRouter);
app.use((_req, _res, next) => {
    next(new NotfoundError('Route not found'));
});
app.use(errorHandler);
export { app };
//# sourceMappingURL=app.js.map