import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { DeleteUserScan } from "@/lib/actions/scan.actions";

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { barcode } = body;

    if (!barcode) {
      return NextResponse.json(
        { error: "BarCode required" },
        { status: 400 }
      );
    }

    const deletedScan = await DeleteUserScan(barcode);

    if (!deletedScan) {
      return NextResponse.json(
        { error: "Scan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Scan deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE SCAN ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}