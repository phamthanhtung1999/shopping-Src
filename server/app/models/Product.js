import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import mongooseDelete from "mongoose-delete";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    discount: {
      type: Number,
      default: 0,
      max: 0.7,
      min: 0,
    }
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

// add plugin
mongoose.plugin(slug);
productSchema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: true });
productSchema.plugin(mongoosePaginateV2);

const Product = mongoose.model("Product", productSchema);

export default Product;
