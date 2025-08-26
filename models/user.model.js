import mongoose from "mongoose";

// User schema definition
// - Holds user credentials and account info
// - Includes basic validation and formatting rules
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true, // must be unique across users
      trim: true,
      lowercase: true,
      minLength: 2,
      maxLength: 50,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password too short"],
      maxlength: [128, "Password too long"],
      select: false, // exclude password from query results by default
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt (know when the user has been created or modified)
  }
);

// Model for "users" collection
const User = mongoose.model("User", userSchema);

export default User;

