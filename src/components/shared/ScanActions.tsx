"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";
import Link from "next/link";

const ScanActions = ({setOpen, product, barcode}) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveInfo, setSaveInfo] = useState("Save")
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


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
          barcode: barcode,
          productName: product.name,
          brand: product.brand,
          imageUrl: product.image,
          nutrition: product.nutrition,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      console.log("Saved successfully");
      console.log("Sending barcode:", barcode);
      loading&&(setSaveInfo("Saving"))
      setSaveInfo("Saved successfully")
      await delay(2500)
      setSaveInfo("Save")

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <SignedIn>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"
            onClick={() => {
              handleSave()
              setOpen(false);
              console.log("Save scan");
              console.log(product)
            }}
            disabled={loading}
          >
            <Bookmark className="h-4 w-4" />
             {saveInfo}
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white cursor-pointer"
            onClick={() => {
              // TODO: hook into share logic
              setOpen(false);
              console.log("Share scan");
            }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
          >
            Sign in
          </Link>{" "}
          to save this scan
        </p>
      </SignedOut>
    </div>
  );
};

export default ScanActions;
