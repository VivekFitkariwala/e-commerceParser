import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const Types = Schema.Types;

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
      type: Types.String,
      unique: true,
      index: true,
      required: true,
      trim: true
    },
    productUrl: {
      type: Types.String,
      trim: true
    },
    imageUrl: {
      type: Types.String
    },
    brand: {
      type: Types.String,
      trim: true
    },
    mrp: {
      type: Types.Number
    },
    price: {
      type: Types.Number
    },
    quantity: {
      type: Types.Number
    },
    moq: {
      type: Types.Number
    },
    discount: {
      type: Types.Number
    },
    categoryPath: {
      type: Types.String
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
