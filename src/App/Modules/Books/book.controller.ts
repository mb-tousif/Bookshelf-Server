import httpStatus from "http-status";
import Config from "../../../Config";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import AsyncHandler from "../../../Shared/AsyncHandler";
import { verifyToken } from "../../../Shared/JwtHandler";
import ResponseHandler from "../../../Shared/ResponseHandler";
import { TBook } from "./book.interfaces";
import { createBookService, deleteBookByIdService, getAllBooksService, getBookByIdService, updateBookReview, updateBookService } from "./book.services";


export const createBook = AsyncHandler(async (req, res, next) => {
    const bookInfo = req.body;
    const token = req.headers.authorization as string;
    const verifiedToken = verifyToken(token, Config.jwt.secret as string);
    if (!verifiedToken) {
        return next(
            new ApiErrorHandler(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
        );
    }
    const { _id } = verifiedToken;
    bookInfo.savedBy = _id;
    const result = await createBookService( bookInfo);
    
    ResponseHandler<TBook>(res, {
        statusCode: 201,
        success: true,
        message: "Book created successfully 🎉",
        data: result,
    })
})

export const getAllBooks = AsyncHandler(async (req, res, next) => {
    const result = await getAllBooksService();
    ResponseHandler<TBook[]>(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully 🎉",
        data: result,
    })
})

export const getTenBooks = AsyncHandler(async (req, res, next) => {
    const result = await getAllBooksService();
    ResponseHandler<TBook[]>(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully 🎉",
        data: result,
    })
})

export const getBookById = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const verifiedToken = verifyToken(req.headers.authorization as string, Config.jwt.secret as string);
    if (!verifiedToken) {
        return next(
            new ApiErrorHandler(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
        );
    }
    const result = await getBookByIdService(id);
    ResponseHandler<TBook>(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully 🎉",
        data: result,
    })
})

export const updateBook = AsyncHandler(async (req, res, next) => {
    const verifiedToken = verifyToken(req.headers.authorization as string, Config.jwt.secret as string);
    if (!verifiedToken) {
        return next(
            new ApiErrorHandler(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
            );
        }
    const { id } = req.params;
    const bookInfo = req.body;
    const result = await updateBookService(id, bookInfo);
    ResponseHandler<TBook>(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully 🎉",
        data: result,
    })
});

export const postReview = AsyncHandler(async (req, res, next) => {
    const verifiedToken = verifyToken(req.headers.authorization as string, Config.jwt.secret as string);
    if (!verifiedToken) {
        return next(
            new ApiErrorHandler(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
            );
        }
    const { id } = req.params;
    const payload = req.body;
    const result = await updateBookReview(id, payload);
    ResponseHandler<TBook>(res, {
        statusCode: 200,
        success: true,
        message: "Books Review successfully 🎉 posted",
        data: result,
    })
});

export const deleteBook = AsyncHandler( async (req, res, next) => {
    const verifiedToken = verifyToken(req.headers.authorization as string, Config.jwt.secret as string);
    if (!verifiedToken) {
        return next(
            new ApiErrorHandler(false, httpStatus.UNAUTHORIZED, "Token not found 💥")
            );
        }
    const id = req.params.id;
    const result = await deleteBookByIdService(id);
    if (!result) {
      return next(
        new ApiErrorHandler(false, httpStatus.NOT_FOUND, "Book not found 💥")
      );
    }
    ResponseHandler<TBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book deleted successfully 🎉",
      data: result,
    });
  })
