export function sendSuccess(res, data, statusCode = 200, message) {
    const body = {
        success: true,
        data,
        message
    };
    res.status(statusCode).json(body);
}
//# sourceMappingURL=response.helper.js.map