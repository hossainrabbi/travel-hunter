"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// success response message
function successResponse(res, status, data) {
    res.status(status).json({
        status: {
            code: status,
            message: 'ok',
        },
        data,
    });
}
exports.successResponse = successResponse;
// error response message
function errorResponse(res, status, errors) {
    res.status(status).json({
        status: {
            code: status,
            message: 'error occurred',
        },
        errors,
    });
}
exports.errorResponse = errorResponse;
