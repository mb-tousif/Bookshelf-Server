import httpStatus from "http-status";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { TBook} from "./book.interfaces";
import { Book } from "./book.model";
import mongoose, { SortOrder } from "mongoose";
import { User } from "../Users/user.model";
import { IPagination, IQueryResponse, TSearchedBook, bookSearchFields } from "../../../Constants/pagination.query@types";
import { paginationHandler } from "../../../Shared/paginationHandler";

export const createBookService = async (book: TBook) => {
    const user = book.savedBy;
    const newBook = (await Book.create(book))
    const session = await mongoose.startSession();
      try {
        session.startTransaction();
        await User.findByIdAndUpdate(user, { $push: { books: newBook._id } }, { session });
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
    return newBook.populate("savedBy");
    // return newBook.populate
}

export const getTenBooksService = async () => {
    const books = await Book.find().limit(10).sort({ createdAt: -1 })
    if (!books) {
        throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Books not found 💥")
    }
    return books;
}

export const getAllBooksService = async (
  searchQuery: TSearchedBook,
  paginationOptions: IPagination
): Promise<IQueryResponse<TBook[]>> => { 
  const { page, limit, skip, sortBy, sortOrder } = paginationHandler(paginationOptions);
const { searchTerm, ...filterData } = searchQuery;
const searchFields = bookSearchFields;
const andConditions: any = [];
if (searchTerm) {
andConditions.push({
  $or: searchFields.map((field) => ({
    [field]: { $regex: searchTerm },
    $options: 'i',
  })),
});
}
if (Object.keys(filterData).length) {
andConditions.push({
  $and: Object.entries(filterData).map(([field, value]) => ({
    [field]: value,
    $options: 'i',
  })),
});
}
const sortedCondition: { [key: string]: SortOrder } = {};
if (sortBy && sortOrder) {
sortedCondition[sortBy] = sortOrder;
}

const noQuery = andConditions.length > 0 ? { $and: andConditions } : {};
const result = await Book.find(noQuery)
.sort(sortedCondition)
.skip(skip)
.limit(limit)
.lean();
const totalPages = Math.ceil((await Book.countDocuments().lean()) / limit);
return {
meta: {
  page,
  limit,
  total: totalPages,
},
data: result,
};
}

export const getBookByIdService = async (id: string) => {
  const book = await Book.findOne({_id: id})
  if (!book) {
    throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not found 💥")
  }
  return book;
}

export const updateBookService = async (id: string, bookInfo:Partial<TBook>) => {
  const updateBook = await Book.findByIdAndUpdate({ _id: id }, bookInfo, { new: true})
  return updateBook;
}

export const deleteBookByIdService = async (_id:string ,bookId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findByIdAndUpdate(_id, { $pull: { books: { $in: [ bookId ] } } }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  const result = await Book.deleteOne({ _id: bookId });
  return result;
};

type TReview = {
  comment: string;
}

export const updateBookReview = async (id: string, payload:TReview ) => {
  const book = await Book.findOneAndUpdate({ _id: id}, { $push: { reviews: payload } }, { new: true });
  if (!book) {
    throw new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Book not found 💥")
  }
  return book;
}
