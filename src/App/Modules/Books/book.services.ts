import httpStatus from "http-status";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { TBook } from "./book.interfaces";
import { Book } from "./book.model";

export const createBookService = async (book: TBook[]) => {
    const newBook = await Book.create(book);
    if (!newBook) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not created 💥")
    }
    return newBook;
}