import { Schema } from "mongoose";

export type TBook = {
  id: string;
  title: string;
  author: string;
  imgUrl?: string;
  description?: string;
  genre: string;
  publicationDate: string;
  publicationYear: number;
  reviews:  {
    user: Schema.Types.ObjectId;
    comment: string;
}[];
};
