import { Model } from "mongoose";

export type TUser = {
  id: string;
  email: string;
  password: string;
};

export type TLoginInfo = {
    email: string;
    password: string;
  };
  
  export type TLoginResponse = {
    accessToken: string;
  };

export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;
