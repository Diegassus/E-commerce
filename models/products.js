import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);