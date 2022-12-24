"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validationUser = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const response_1 = require("../../config/response");
const User_1 = __importDefault(require("../../models/User"));
// validation users
exports.validationUser = [
    (0, express_validator_1.check)('username')
        .notEmpty()
        .withMessage('username is required!')
        .isLength({ min: 3 })
        .withMessage('username is minimum 3 character ')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield User_1.default.findOne({ username: value });
            if (data) {
                throw (0, http_errors_1.default)(400, 'username already exist');
            }
        }
        catch (err) {
            throw (0, http_errors_1.default)(err);
        }
    })),
    (0, express_validator_1.check)('mobile')
        .notEmpty()
        .withMessage('mobile is required!')
        .isMobilePhone('bn-BD', {
        strictMode: true,
    })
        .withMessage('please provide a valid bangladeshi mobile number!')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield User_1.default.findOne({ mobile: value });
            if (data) {
                throw (0, http_errors_1.default)(400, 'mobile number already used!');
            }
        }
        catch (err) {
            throw (0, http_errors_1.default)(err);
        }
    })),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('password is required!')
        .isLength({ min: 4, max: 30 })
        .withMessage('password is minimum 4 character and maximum 30 characters!'),
];
// validate user
function validateUser(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    if (Object.keys(errors).length === 0) {
        return next();
    }
    // forward data in ./config/response.ts for errors message
    (0, response_1.errorResponse)(res, 400, errors);
}
exports.validateUser = validateUser;
