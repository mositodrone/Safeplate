// models/Product.ts

import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    barcode: { type: String, required: true, unique: true },

    productName: String,
    brand: String,
    imageUrl: String,

    nutrition: {
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
      sugar: Number,
      salt: Number,
    },

    ingredients: [String],
    allergens: [String],

    nutriScore: String,
    ecoScore: String,

    source: {
      type: String,
      enum: ["openfoodfacts", "go-upc", "manual"],
    },

    rawData: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Product = models?.Product || model("Product", ProductSchema);

export default Product;