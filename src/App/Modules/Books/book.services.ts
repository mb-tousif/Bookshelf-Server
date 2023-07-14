import httpStatus from "http-status";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { TBook } from "./book.interfaces";
import { Book } from "./book.model";
import mongoose from "mongoose";
import { User } from "../Users/user.model";

export const createBookService = async (book: TBook) => {
    const user = book.savedBy;
    const newBook = (await Book.create(book));
    const session = await mongoose.startSession();
      try {
        session.startTransaction();
        await User.findByIdAndUpdate(user, { books: newBook._id }, { session });
        await session.commitTransaction();
        await session.endSession();
      } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
      }
    // const newBook = (await Book.create(book)).populate("reviews.user", "-password");
    if (!newBook) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not created 💥")
    }
    return newBook;
}

export const getAllBooksService = async () => {
    const books = await Book.find().limit(10).sort({ createdAt: -1 })
    if (!books) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Books not found 💥")
    }
    return books;
}