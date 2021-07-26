import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const adminSchema = Schema(
  {
    username: { type: String, maxLength: 32, required: true, unique: true },
    password: { type: String, maxLength: 255, required: true },
    email: { type: String }
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
adminSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
