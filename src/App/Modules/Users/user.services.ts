import httpStatus from "http-status";
import { TLoginInfo, TUser } from "./user.interfaces";
import { User } from "./user.model";
import ApiErrorHandler from "../../../Handlers/ApiError.handler";
import { getUserInfoFromToken } from "../../../Shared/getUserInfoFromToken";
import { generateToken } from "../../../Shared/JwtHandler";
import Config from "../../../Config";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUserService = async (userInfo: TUser) => {
  const result = await User.create(userInfo);
  const data = await User.findOne({ _id: result._id }).select("-password");
  return data;
};

export const loginService = async (loginInfo: TLoginInfo) => {
  const result = await User.findOne({ email: loginInfo.email });
  if (!result) {
    new ApiErrorHandler(false, httpStatus.BAD_REQUEST, "User not Found 💥");
  }
  const matchPassword = await User.isPasswordMatched(
    loginInfo.password,
    result?.password as string
  );

  if (!matchPassword) {
    new ApiErrorHandler(
      false,
      httpStatus.BAD_REQUEST,
      "Password not matched 💥"
    );
  }
  const { _id, email } = result as any;
  const accessToken = generateToken(
    { _id, email },
    Config.jwt.secret as Secret,
    Config.jwt.expiresIn as string
  );
  const data = {
    id: _id,
    accessToken,
  };
  return data;
};

export const updateUserByTokenService = async (
  token: string,
  userInfo: Partial<TUser>
) => {
  const decodedToken = getUserInfoFromToken(token);
  const { _id } = decodedToken;
  const user = await User.findOne({ _id });
  if (!user) {
    throw new ApiErrorHandler(false, httpStatus.NOT_FOUND, "User not found 💥");
  }

  if (userInfo?.password) {
    const hashedPassword = bcrypt.hashSync(
      userInfo.password,
      Number(Config.jwt.saltRounds)
    );
    userInfo.password = hashedPassword;
  }

  const result = User.findByIdAndUpdate(_id, userInfo, {
    new: true,
  }).lean();
  return result;
};

export const getUserProfileService = async (token: string) => {
  const userInfo = getUserInfoFromToken(token);
  const { _id } = userInfo;
  const result = await User.findOne({ _id });
  return result;
};
