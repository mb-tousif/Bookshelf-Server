import { Schema } from "mongoose";

export type TBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  savedBy: Schema.Types.ObjectId;
  reviews: {
    push(payload: { comment: string; }): unknown;
    comment: string;
  };
  imgUrl?: string;
  description?: string;
};
