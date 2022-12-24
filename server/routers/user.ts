import express from 'express';
import { getSingleUser, getUsers } from '../controllers/user';

const router = express.Router();

// get all users
router.get('/users', getUsers);

// crate an user
// router.post('/users/add', createUser);

// get, delete & update user by id
router.route('/users/:userId').get(getSingleUser);
// .put(updateSingleUser)
// .delete(deleteSingleUser);

export default router;
