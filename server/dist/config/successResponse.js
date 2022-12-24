"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
// success response message
function response(res, status, data) {
    res.status(status).json({
        status: {
            code: status,
            message: 'ok',
        },
        data,
    });
}
exports.response = response;
