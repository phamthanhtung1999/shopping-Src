import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      maxLength: [32, "First name can not more than 32 characters"],
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      maxLength: [32, "Last name can not more than 32 characters"],
      required: [true, "Last name is required"],
    },
    password: {
      type: String,
      maxLength: 255,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email has been registered"],
    },
    address: { type: String, required: [true, "Address is required"] },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      maxLength: [10, "Phone number is 10 characters max"],
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// Add plugin
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});
userSchema.plugin(mongoosePaginateV2);

const User = mongoose.model("User", userSchema);

export default User;
