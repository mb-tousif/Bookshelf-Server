import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, getTenBooks, postReview, updateBook } from './book.controller';
const router = express.Router();

// router.get('/users', getAllUsers);
router.post('/create-book', createBook)
router.patch('/book-review/:id', postReview)
router.get('/get-ten-books', getTenBooks)
router.get('/get-all-books', getAllBooks)
router.get('/book/:id', getBookById);
router.patch('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)

export const bookRoutes = router;