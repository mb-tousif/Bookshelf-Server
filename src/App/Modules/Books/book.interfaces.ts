import { Schema } from "mongoose";

export type TBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  savedBy: Schema.Types.ObjectId;
  reviews: {
    comment: string;
  };
  imgUrl?: string;
  description?: string;
};
