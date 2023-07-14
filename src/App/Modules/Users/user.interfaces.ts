import { Model, Schema } from "mongoose";

export type TUser = {
  id: string;
  email: string;
  password: string;
  address?: string;
  books?: Schema.Types.ObjectId[];
};

export type TLoginInfo = {
    email: string;
    password: string;
  };
  
  export type TLoginResponse = {
    id: Schema.Types.ObjectId;
    accessToken: string;
  };

export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;
