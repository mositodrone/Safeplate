import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import Scan from "@/lib/database/models/scan.model";
import User from "@/lib/database/models/user.model";

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
    const { barcode, productName, brand, imageUrl, nutrition } = body;

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
      user: user._id,
      barcode,
    });

    if (existingScan) {
      return NextResponse.json(existingScan);
    }

    const newScan = await Scan.create({
      user: user._id,
      barcode,
      productName,
      brand,
      imageUrl,
      nutrition,
    });

    return NextResponse.json(newScan, { status: 201 });

  } catch (error) {
    console.log("SAVE SCAN ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
