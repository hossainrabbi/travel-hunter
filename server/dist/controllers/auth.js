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
const response_1 = require("../config/response");
const User_1 = __importDefault(require("../models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
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
            // generate token from User models
            const token = newUser.generateToken(newUser._id);
            // forward data in ./config/response.ts for success response
            (0, response_1.successResponse)(res, 201, { token });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.register = register;
// login auth
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, mobile, password } = req.body;
            const user = yield User_1.default.findOne({
                $or: [
                    {
                        username,
                    },
                    { mobile },
                ],
            });
            if (!user) {
                throw (0, http_errors_1.default)(404, 'invalid credentials');
            }
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw (0, http_errors_1.default)(404, 'invalid credentials');
            }
            // generate token from User models
            const token = user.generateToken(user._id);
            // forward data in ./config/response.ts for success response
            (0, response_1.successResponse)(res, 200, { token });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.login = login;
