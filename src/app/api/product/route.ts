// import Product from "@/lib/database/models/product.models";

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const barcode = searchParams.get("barcode");

//   if (!barcode) {
//     return NextResponse.json(
//       { error: "Missing barcode" },
//       { status: 400 }
//     );
//   }

//   const res = await fetch(
//     `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
//     {
//       headers: {
//         "User-Agent": "PlateSafe/0.1 (hello@platesafe.app)",
//       },
//       // optional but smart
//       next: { revalidate: 60 * 60 }, // cache for 1 hour
//     }
//   );

//   const data = await res.json();

//   if (!data.product || data.status === 0) {
//     return NextResponse.json(
//       { error: "Product not found" },
//       { status: 404 }
//     );
//   }

//   const product = {
//     name: data.product.product_name ?? "Unknown product",
//     brand: data.product.brands ?? "Unknown brand",
//     image: data.product.image_front_url ?? null,
//     ingredients:
//       data.product.ingredients_text ?? "Ingredients not available",
//     allergens:
//       data.product.allergens_tags?.map((tag: string) =>
//         tag.replace("en:", "").replace("-", " ")
//       ) ?? [],
//     nutrition: {
//       calories: data.product.nutriments["energy-kcal_100g"],
//       protein: data.product.nutriments.proteins_100g,
//       carbs: data.product.nutriments.carbohydrates_100g,
//       fat: data.product.nutriments.fat_100g,
//       sugar: data.product.nutriments.sugars_100g,
//       salt: data.product.nutriments.salt_100g,
//       fiber: data.product.nutriments.fiber_100g,
//     },
//   };

  
//   return NextResponse.json(product);
// }



import { NextResponse } from "next/server";
import Product from "@/lib/database/models/product.models";
import { connectToDatabase } from "@/lib/database/mongoose";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const barcode = searchParams.get("barcode");
  const query = searchParams.get("query");

  // ✅ allow either barcode OR query
  if (!barcode && !query) {
    return NextResponse.json(
      { error: "Missing barcode or query" },
      { status: 400 }
    );
  }

  try {
    // 🟡 -------------------------
    // 🔍 SEARCH MODE (from modal)
    // 🟡 -------------------------
    if (query) {
      try {
        const res = await fetch(
          `https://api.upcitemdb.com/prod/trial/search?s=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          throw new Error("UPCitemdb search failed");
        }

        const data = await res.json();
        
        await new Promise((r) => setTimeout(r, 400));

        const results =
          data.items?.map((item: any) => ({
            name: item.title ?? "Unknown product",
            brand: item.brand ?? null,
            image: item.images?.[0] ?? null,
          })) ?? [];

        return NextResponse.json({
          results,
          source: "upcitemdb-search",
        });
      } catch (err) {
        console.error("Search error:", err);

        return NextResponse.json(
          { error: "Search failed" },
          { status: 500 }
        );
      }
    }

    // 🟢 -------------------------
    // 📦 BARCODE MODE (main flow)
    // 🟢 -------------------------

    // 🥇 1. CHECK DB FIRST
    // let existing = await Product.findOne({ barcode });

    // if (existing) {
    //   return NextResponse.json({ product: existing, source: "db" });
    // }

    // 🥈 2. OPEN FOOD FACTS (UNCHANGED)
    const offRes = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      {
        headers: {
          "User-Agent": "PlateSafe/0.1 (hello@platesafe.app)",
        },
        next: { revalidate: 60 * 60 },
      }
    );

    const offData = await offRes.json();

     await new Promise((r) => setTimeout(r, 400));

    const notFound = offData.status === 0 || !offData.product;

    if (!notFound) {
      const product = {
        barcode,
        name: offData.product.product_name ?? "Unknown product",
        brand: offData.product.brands ?? "Unknown brand",
        image: offData.product.image_front_url ?? null,
        ingredients:
          offData.product.ingredients_text ?? "Ingredients not available",
        allergens:
          offData.product.allergens_tags?.map((tag: string) =>
            tag.replace("en:", "").replace("-", " ")
          ) ?? [],
        nutrition: {
          calories: offData.product.nutriments["energy-kcal_100g"],
          protein: offData.product.nutriments.proteins_100g,
          carbs: offData.product.nutriments.carbohydrates_100g,
          fat: offData.product.nutriments.fat_100g,
          sugar: offData.product.nutriments.sugars_100g,
          salt: offData.product.nutriments.salt_100g,
          fiber: offData.product.nutriments.fiber_100g,
        },
        source: "openfoodfacts",
      };

      // console.log("OFF success, preparing to save...");

      const result = await Product.updateOne(
        { barcode },
        { $setOnInsert: product },
        { upsert: true }
      );

      console.log("Mongo result:", result);

      // await Product.create({
      //   barcode: "debug123",
      //   name: "Debug Product",
      // });

      // await Product.updateOne(
      //   { barcode },
      //   { $setOnInsert: product },
      //   { upsert: true }
      // );

      return NextResponse.json(product);
    }

    // 🟡 4. UPCitemdb (REMOVED barcode lookup → now handled via query mode)

    // 🔴 5. FINAL FALLBACK
    const fallbackProduct = {
      barcode,
      name: "Unknown product",
      brand: null,
      image: null,
      ingredients: [],
      allergens: [],
      nutrition: null,
      source: "unknown",
    };

    await Product.updateOne(
      { barcode },
      { $setOnInsert: fallbackProduct },
      { upsert: true }
    );

    return NextResponse.json({
      product: fallbackProduct,
      source: "fallback",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong: Failed to Get Product details" },
      { status: 500 }
    );
  }
}







  // const { name, brand, image, ingredients, nutrition, allergens } = product;

  // let saveProduct = await Product.findOne({ barcode });

  // if (saveProduct) {
  //   console.log("Scan already exists");
  //   return NextResponse.json(
  //     {error: "Scan already exists"},
  //     {status: 409}
  //   );
  // }
  // await Product.create({
  //   // user: user._id,  TODO: Save these values from client side
  //   // userId: userId,
  //   // barcode,
  //   name,
  //   brand,
  //   ingredients,
  //   image,
  //   nutrition,
  //   allergens,
  // })
