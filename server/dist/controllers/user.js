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
exports.getSingleUser = exports.getUsers = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const response_1 = require("../config/response");
const User_1 = __importDefault(require("../models/User"));
// get all users
function getUsers(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.find();
            // forward data in ./config/response.ts for success response
            (0, response_1.successResponse)(res, 200, { users });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getUsers = getUsers;
// get single user
function getSingleUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            if (!(0, mongoose_1.isValidObjectId)(userId)) {
                throw (0, http_errors_1.default)(404, 'user not found');
            }
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw (0, http_errors_1.default)(404, 'user not found');
            }
            // forward data in ./config/response.ts for success response
            (0, response_1.successResponse)(res, 200, { user });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getSingleUser = getSingleUser;
