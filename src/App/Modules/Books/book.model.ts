import { Schema, model } from "mongoose";
import { TBook } from "./book.interfaces";

const bookSchema = new Schema<TBook>(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Book name is required"],
      unique: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
    },
    publicationYear: {
      type: Number,
    },
    savedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
          },
        },
      ],
    },
    imgUrl: {
        type: String,
        default: "https://via.placeholder.com/300",
    },
    description: {
      type: String,
      default: "No description Added",
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<TBook>("Book", bookSchema);