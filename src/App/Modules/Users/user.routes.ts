import express from 'express';
import { createUser, getAllUsers, loginUser, updateUserByToken, } from './user.controller';
const router = express.Router();

router.get('/allUsers', getAllUsers);
router.post('/create-user', createUser)
router.post('/login', loginUser);
router.patch('/update-user', updateUserByToken)

export const userRoutes = router;