import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import Scan from "@/lib/database/models/scan.model";
import User from "@/lib/database/models/user.model";
import Product from "@/lib/database/models/product.models";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// console.log("API SAVE ROUTE HIT");

// const router = useRouter()

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { barcode, productName, brand, imageUrl, ingredients, nutrition, allergens } = body;

    await connectToDatabase();

    // Find Mongo user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent duplicates
    const existingScan = await Scan.findOne({
      userId: userId,
      barcode,
    });

    if (existingScan) {
      console.log("Scan already exists");
      return NextResponse.json(
        {error: "Scan already exists"},
        {status: 409}
      );
    }

    const newScan = await Scan.create({
      user: user._id,
      userId: userId,
      barcode,
      productName,
      brand,
      ingredients,
      imageUrl,
      nutrition,
      allergens,
    });

    // pseudo clean version

    // // always create scan
    // await Scan.create({
    //   userId,
    //   product: product._id,
    //   barcode,
    // });

    console.log("userId for profile:", userId)

    return NextResponse.json(newScan, { status: 201 });

  } catch (error) {
    console.log("SAVE SCAN ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
