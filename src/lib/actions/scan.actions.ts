"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/scan.model";
import { redirect } from "next/navigation";
import Scan from "../database/models/scan.model";
import { auth } from "@clerk/nextjs/server";

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

// export async function getUserId() {
//   const { userId } = await auth();
//   return userId
// }

export async function DeleteUserScan(barcode: string) {
  try {
    await connectToDatabase();

    const { userId } = await auth();

    const deleted = await Scan.findOneAndDelete({
      barcode: barcode,
      userId: userId,
    });

    return { success: true };
  } catch (error) {
    console.log(error)
    throw new Error("Failed to delete scan");
   } 
   //finally {
  //   redirect('/profile')
  // }
}

//TODO get scan by barcode
export async function GetScanByBarcode(scanId: string) {
  try {
    await connectToDatabase();

    const scan = await Scan.findById(scanId);

    return JSON.parse(JSON.stringify(scan));
  } catch (error) {
    throw new Error("Failed to fetch scan");
  }
}

export async function GetUserScanStats(userId: string) {
  await connectToDatabase();

  const scans = await Scan.find({ userId }).select("allergens");

  const total = scans.length;

  const risky = scans.filter(
    (scan) => scan.allergens && scan.allergens.length > 0
  ).length;

  const safe = total - risky;

  return {
    total,
    safe,
    risky,
  };
}

export async function GetUserScans(userId: string) {
  try {
    await connectToDatabase();

    const scans = await Scan.find({ userId })
      .sort({ createdAt: -1 });
    
    console.log(userId);
    console.log("id scan:", scans)  

    return JSON.parse(JSON.stringify(scans));
  } catch (error) {
    throw new Error("Failed to fetch user scans");
  }
}
