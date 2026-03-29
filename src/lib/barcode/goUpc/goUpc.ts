// lib/goUpc.ts

import axios from "axios";

export const fetchFromGoUPC = async (barcode: string) => {
  try {
    const res = await axios.get(
      `https://api.go-upc.com/v1/code/${barcode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GO_UPC_API_KEY}`,
        },
      }
    );

    const product = res.data.product;

    if (!product) return null;

    return {
      barcode,
      name: product.name,
      brand: product.brand,
      image: product.imageUrl,
      source: "go-upc",
    };
  } catch (err) {
    console.error("Go-UPC error:", err);
    return null;
  }
};