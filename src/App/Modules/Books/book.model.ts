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
    imgUrl: {
        type: String,
        default: "https://via.placeholder.com/300",
    },
    description: {
      type: String,
      default: "No description Added",
    },
    wishList: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          status: {
            type: String,
            enum: ["Currently Reading", "Finish Reading", "Read in future"],
            default: "Read in future",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<TBook>("Book", bookSchema);