"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
// success response message
function successResponse(res, status, data) {
    res.status(status).json({
        status: {
            code: status,
            message: 'ok',
        },
        data: data,
    });
}
exports.successResponse = successResponse;
