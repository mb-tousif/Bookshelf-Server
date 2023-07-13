import express from 'express';
import { createUser, loginUser, updateUserByToken, } from './user.controller';
const router = express.Router();

// router.get('/users', getAllUsers);
router.post('/create-user', createUser)
router.post('/login', loginUser);
router.patch('/update-user', updateUserByToken)

export const userRoutes = router;