import httpStatus from "http-status";
import Config from "../../../Config";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import AsyncHandler from "../../../Shared/AsyncHandler";
import { verifyToken } from "../../../Shared/JwtHandler";
import ResponseHandler from "../../../Shared/ResponseHandler";
import { TBook } from "./book.interfaces";
import { createBookService, getAllBooksService } from "./book.services";


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