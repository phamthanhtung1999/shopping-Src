import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const discountSchema = Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discount: { type: Number, min: 0, max: 0.7, required: true },
    
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
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
discountSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

discountSchema.pre('validate', function(next) {
  const now = new Date();
  if (this.startDate && this.startDate <= now) {
      next(new Error('Start Date must be greater than now'));
  } else if (this.startDate && this.endDate && this.startDate > this.endDate) {
      next(new Error('End Date must be greater than or equals to Start Date'));
  } else {
      next();
  }
});

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
