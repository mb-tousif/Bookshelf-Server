import httpStatus from "http-status";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { TBook, TReview } from "./book.interfaces";
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

export const getTenBooksService = async () => {
    const books = await Book.find().limit(10).sort({ createdAt: -1 })
    if (!books) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Books not found 💥")
    }
    return books;
}

export const getAllBooksService = async () => {
    const books = await Book.find().sort({ createdAt: -1 })
    if (!books) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Books not found 💥")
    }
    return books;
}

export const getBookByIdService = async (id: string) => {
  const book = await Book.findById(id)
  if (!book) {
    throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not found 💥")
  }
  return book;
}

export const updateBookService = async (id: string, bookInfo:Partial<TBook>) => {
  const updateBook = await Book.findByIdAndUpdate({ _id: id }, bookInfo, { new: true})
  return updateBook;
}

export const deleteBookByIdService = async (id: string) => {
  const result = await Book.findOne({ _id: id });
  return result;
};

export const updateBookReview = async (id: string, payload: TReview ) => {
  const book = await Book.findById({ _id: id});
  if (!book) {
    throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not found 💥")
  }
  const review:TReview = {
    user: payload.user,
    comment: payload.comment
  }
  book.reviews.push = review as any;
  const updatedBook = await book.save();
  return updatedBook;
}
