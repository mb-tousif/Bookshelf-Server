import { ErrorRequestHandler } from "express";
import config from "../Config";
import httpStatus from "http-status";
import { IGenericErrorMessage } from "./error.interfaces";
import HandleMongooseError from "./error.mongoose.handler";

const GlobalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log(error)
    : console.log(`🚀 Error Name: ${error.name}`);
  let success: boolean,
    statusCode: number,
    message: string,
    errorMessages: IGenericErrorMessage[] = [];
  if (error.name === "ApiErrorHandler") {
    success = error.success;
    message = error.message;
    statusCode = error.statusCode;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }else if (error.name === "ValidatorError") {
    const generalizedError = HandleMongooseError(error);
    success = generalizedError.success;
    message = generalizedError.message;
    statusCode = generalizedError.statusCode;
    errorMessages = generalizedError.errorMessages; 
}else if (error instanceof Error) {
    success = false;
    statusCode = httpStatus.NOT_FOUND;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: error.message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default GlobalErrorHandler;