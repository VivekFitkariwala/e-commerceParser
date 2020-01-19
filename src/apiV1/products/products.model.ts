import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// name: productName,
//       brand,
//       imageUrl: imageURL,
//       price,
//       mrp: mrpPrice,
//       quantity,
//       moq,
//       discount,
//       categoryPath

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    productUrl: {
      type: String,
      trim: true
    },
    brand: {
      type: String,
      trim: true
    },
    mrp: {
      type: Number
    },
    quantity: {
      type: Number
    },
    moq: {
      type: Number
    },
    discount: {
      type: Number
    },
    categoryPath: {
      type: String
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Product", ProductSchema);
