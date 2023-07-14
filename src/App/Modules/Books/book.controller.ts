import AsyncHandler from "../../../Shared/AsyncHandler";
import ResponseHandler from "../../../Shared/ResponseHandler";
import { TBook } from "./book.interfaces";
import { createBookService } from "./book.services";


export const createBook = AsyncHandler(async (req, res, next) => {
    const bookInfo = req.body;
    const result = await createBookService(bookInfo);
    
    ResponseHandler<TBook>(res, {
        statusCode: 201,
        success: true,
        message: "Book created successfully 🎉",
        data: result,
    })
})
