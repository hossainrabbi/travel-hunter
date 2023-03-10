"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validationUser_1 = require("../middleware/user/validationUser");
const router = express_1.default.Router();
// register router
router.post('/register', validationUser_1.validationUser, validationUser_1.validateUser, auth_1.register);
// login router
router.post('/login', auth_1.login);
exports.default = router;
