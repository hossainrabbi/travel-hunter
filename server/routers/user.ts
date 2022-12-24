import express from 'express';
import { getSingleUser, getUsers } from '../controllers/user';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

// get all users
router.get('/', isAuth, getUsers);

// crate an user
// router.post('/users/add', createUser);

// get, delete & update user by id
router.route('/:userId').get(isAuth, getSingleUser);
// .put(updateSingleUser)
// .delete(deleteSingleUser);

export default router;
