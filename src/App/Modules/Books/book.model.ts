import { Schema, model } from "mongoose";
import { TBook } from "./book.interfaces";

const bookSchema = new Schema<TBook>(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    imgUrl: {
        type: String,
        default: "https://via.placeholder.com/350",
    },
    description: {
      type: String,
      default: "No description Added",
    },
    publicationDate: {
      type: String,
    },
    publicationYear: {
      type: Number,
    },
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          comment: {
            type: String,
            default: "No comment added",
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<TBook>("Book", bookSchema);
