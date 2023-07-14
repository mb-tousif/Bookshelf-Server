import express from 'express';
import { createBook, getAllBooks } from './book.controller';
const router = express.Router();

// router.get('/users', getAllUsers);
router.post('/create-book', createBook)
router.get('/get-all-books', getAllBooks)
router.get('/book/:id', );
router.patch('/update/:id', )
router.delete('/delete/:id', )
router.patch('/wishList/:id', )

export const bookRoutes = router;