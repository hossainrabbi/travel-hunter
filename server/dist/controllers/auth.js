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
exports.login = exports.register = void 0;
const successResponse_1 = require("../config/successResponse");
const User_1 = __importDefault(require("../models/User"));
// register auth
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.find();
            let newUser = new User_1.default(Object.assign({}, req.body));
            // if user not exist then first user is admin
            if (user.length === 0) {
                newUser.role = 'admin';
            }
            newUser = yield newUser.save();
            // forward data in ./config/successResponse.ts
            (0, successResponse_1.successResponse)(res, 201, newUser);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.register = register;
// login auth
function login(req, res, next) {
    try {
        res.json({
            message: 'll',
        });
    }
    catch (err) {
        next(err);
    }
}
exports.login = login;
