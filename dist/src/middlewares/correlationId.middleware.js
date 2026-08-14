export const attchCorrelationMiddleware = (req, _res, next) => {
    const correaltionId = crypto.randomUUID();
    req.headers['x-correlation-id'] = correaltionId;
    next();
};
//# sourceMappingURL=correlationId.middleware.js.map