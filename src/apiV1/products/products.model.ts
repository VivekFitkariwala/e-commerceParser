import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IProduct {
  name: string;
  imageUrl: string;
  productUrl: string;
  brand: string;
  mrp: number;
  price: number;
  quantity: number;
  moq: number;
  discount: number;
  categoryPath: string;
}

const ProductSchema = new Schema(
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
    imageUrl: {
      type: String
    },
    brand: {
      type: String,
      trim: true
    },
    mrp: {
      type: Number
    },
    price: {
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

const Product = mongoose.model("Product", ProductSchema);

export default Product;
