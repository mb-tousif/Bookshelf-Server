import { Schema } from "mongoose";

export type TBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  savedBy: Schema.Types.ObjectId;
  reviews?: {
    user: Schema.Types.ObjectId;
    comment: string;
  }[];
  imgUrl?: string;
  description?: string;
  wishList?: {
    user: Schema.Types.ObjectId;
    status: string;
  }[];
};
