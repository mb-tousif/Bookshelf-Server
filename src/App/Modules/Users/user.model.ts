import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interfaces";
import bcrypt from "bcrypt";
import Config from "../../../Config";

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

// Hash Password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(Config.jwt.saltRounds)
  );
  this.password = hashedPassword;
  next();
});

// Compare Password
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);