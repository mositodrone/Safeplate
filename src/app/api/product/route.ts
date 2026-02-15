import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json(
      { error: "Missing barcode" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
    {
      headers: {
        "User-Agent": "PlateSafe/0.1 (hello@platesafe.app)",
      },
      // optional but smart
      next: { revalidate: 60 * 60 }, // cache for 1 hour
    }
  );

  const data = await res.json();

  if (!data.product || data.status === 0) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

   const product = {
    name: data.product.product_name ?? "Unknown product",
    brand: data.product.brands ?? "Unknown brand",
    image: data.product.image_front_url ?? null,
    ingredients:
      data.product.ingredients_text ?? "Ingredients not available",
    allergens:
      data.product.allergens_tags?.map((tag: string) =>
        tag.replace("en:", "").replace("-", " ")
      ) ?? [],
    nutrition: {
      calories: data.product.nutriments["energy-kcal_100g"],
      protein: data.product.nutriments.proteins_100g,
      carbs: data.product.nutriments.carbohydrates_100g,
      fat: data.product.nutriments.fat_100g,
      sugar: data.product.nutriments.sugars_100g,
      salt: data.product.nutriments.salt_100g,
      fiber: data.product.nutriments.fiber_100g,
  },
};

  return NextResponse.json(product);
}