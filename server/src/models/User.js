import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"], //  restrict values
      default: "user",
    },

    name: {
      type: String,
      required: true,
      trim: true, //  clean input
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //  avoid duplicate issues
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    //  Approval system
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);