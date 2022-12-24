"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
// get all users
router.get('/', isAuth_1.isAuth, user_1.getUsers);
// crate an user
// router.post('/users/add', createUser);
// get, delete & update user by id
router.route('/:userId').get(isAuth_1.isAuth, user_1.getSingleUser);
// .put(updateSingleUser)
// .delete(deleteSingleUser);
exports.default = router;
