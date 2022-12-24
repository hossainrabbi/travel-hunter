"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuth(req, _res, next) {
    let token = req.headers.authorization;
    try {
        if (!(token === null || token === void 0 ? void 0 : token.startsWith('Bearer'))) {
            throw (0, http_errors_1.default)('invalid token');
        }
        token = token.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw (0, http_errors_1.default)('invalid token');
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.isAuth = isAuth;
