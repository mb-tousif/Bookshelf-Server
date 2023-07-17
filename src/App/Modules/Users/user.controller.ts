import { RequestHandler } from "express";
import AsyncHandler from "../../../Shared/AsyncHandler";
import {
  createUserService,
  getAllUsersService,
  loginService,
  updateUserByTokenService,
} from "./user.services";
import { TLoginResponse, TUser } from "./user.interfaces";
import ResponseHandler from "../../../Shared/ResponseHandler";
import httpStatus from "http-status";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { verifyToken } from "../../../Shared/JwtHandler";
import Config from "../../../Config";

export const createUser: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const userInfo = req.body;
    const result = await createUserService(userInfo);
    if (!result) {
      return next(
        new ApiErrorHandler(
          false,
          httpStatus.BAD_REQUEST,
          "User not created 💥"
        )
      );
    }
    ResponseHandler<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully 🎉",
      data: result,
    });
  }
);

export const loginUser: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const loginInfo = req.body;
    const result = await loginService(loginInfo);

    ResponseHandler<TLoginResponse>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User login successfully 🎉",
      data: result,
    });
  }
);

export const updateUserByToken: RequestHandler = AsyncHandler(
  async (req, res, next) => {
    const token = req.headers.authorization as string;
    const verifiedToken = verifyToken(token, Config.jwt.secret as string);
    if (!verifiedToken) {
      return next(
        new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Token not found 💥")
      );
    }

    const userInfo = req.body;
    const result = await updateUserByTokenService(token, userInfo);
    if (!result) {
      return next(
        new ApiErrorHandler(false, httpStatus.NOT_FOUND, "User not found 💥")
      );
    }
    ResponseHandler<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully 🎉",
      data: result,
    });
  }
);

export const getAllUsers = AsyncHandler (async (req, res, next) => {
  const token = req.headers.authorization as string;
  const verifiedToken = verifyToken(token, Config.jwt.secret as string);
  if (!verifiedToken) {
    return next(
      new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "Token not found 💥")
    );
  };
  const result = await getAllUsersService();
  ResponseHandler<TUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully 🎉",
    data: result,
  });
}
)