import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    receiverName: { type: String, maxLength: 100, required: true },
    receiverPhone: { type: String, maxLength: 10, required: true },
    receiverAddress: { type: String, maxLength: 255, required: true },
    status: { type: String, enum: ['processing', 'delivering', 'done', 'cancelled'], default: 'processing' },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: [
      {
        quantity: { type: Number, max: 10, min: 1, default: 1 },
        unitPrice: { type: Number, required: true },
        discount: { type: Number, default: 0, max: 0.7, min: 0 },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      }
    ]
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
orderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});
orderSchema.plugin(mongoosePaginateV2);

const Order = mongoose.model("Order", orderSchema);

export default Order;
