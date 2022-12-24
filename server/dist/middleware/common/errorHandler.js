"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const response_1 = require("../../config/response");
// not found handler
function notFound(_req, _res, next) {
    next((0, http_errors_1.default)(404, 'Your requested content was not found!'));
}
exports.notFound = notFound;
// global error handler
const errorHandler = (err, _req, res, _next) => {
    // forward data in ./config/response.ts for errors message
    (0, response_1.errorResponse)(res, err.status || 500, {
        message: err.message || 'Internal Server Error!',
    });
};
exports.errorHandler = errorHandler;
