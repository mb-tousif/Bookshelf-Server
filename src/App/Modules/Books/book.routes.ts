import express from 'express';
import { createBook } from './book.controller';
const router = express.Router();

// router.get('/users', getAllUsers);
router.post('/create-book', createBook)
router.get('/get-all-books', )
router.get('/book/:id', );
router.patch('/update/:id', )
router.delete('/delete/:id', )
router.patch('/wishList/:id', )

export const bookRoutes = router;