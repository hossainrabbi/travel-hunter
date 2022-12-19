"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
// not found handler
function notFound(_req, _res, next) {
    next((0, http_errors_1.default)(404, 'Your requested content was not found!'));
}
exports.notFound = notFound;
// global error handler
const errorHandler = (err, _req, res, _next) => {
    res.status(err.status || 500).json({
        status: {
            code: err.status || 500,
            message: err.message || 'Internal Server Error!',
        },
    });
};
exports.errorHandler = errorHandler;
