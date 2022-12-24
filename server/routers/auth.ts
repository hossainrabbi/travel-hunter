import express from 'express';
import { login, register } from '../controllers/auth';
import {
  validateUser,
  validationUser,
} from '../middleware/user/validationUser';

const router = express.Router();

// register router
router.post('/register', validationUser, validateUser, register);

// login router
router.post('/login', login);

export default router;
