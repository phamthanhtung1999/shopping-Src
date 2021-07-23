import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const categorySchema = Schema(
  {
    name: { type: String, maxLength: 255, required: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
categorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
