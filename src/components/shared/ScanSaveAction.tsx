"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SaveButton({ product }) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/scans/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcode: product.barcode,
          productName: product.productName,
          brand: product.brand,
          imageUrl: product.imageUrl,
          nutrition: product.nutrition,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      console.log("Saved successfully");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-500 transition"
    >
      {loading ? "Saving..." : "Save"}
    </button>
  );
}
