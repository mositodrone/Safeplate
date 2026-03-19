"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteUserScan } from "@/lib/actions/scan.actions";
import { toast } from "sonner";
// import { getUserId } from "@/lib/actions/scan.actions";

const ScanActions = ({setOpen, product, mode}: any) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveInfo, setSaveInfo] = useState("Save")
  const [deleteInfo, setDeleteInfo] = useState("Delete")

  // const params = useParams()
  const searchParams = useSearchParams();
  const barcode = searchParams.get("barcode");
  // const userId = getUserId();
  
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));


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
          ingredients: product.ingredients,
          nutrition: product.nutrition,
          allergens: product.allergens
        }),
      });

      if (!res.ok) {
         if (res.status === 409) {
          toast("Already saved", {
            id: "duplicate-save",
            description: "This product is already in your collection.",
            action: {
              label: "View",
              onClick: () => router.push(`/profile?barcode=${barcode}`),
            },
          });
          throw new Error("Failed to save");
        } 
      }
      if(res.status === 200) {
        toast("Saved successfully", {
          description: "Added to your collection",
        });
      }
      console.log("Saved successfully");
      const data = await res.json();
      console.log("response:", data);
      loading&&(setSaveInfo("Saving"));
      setSaveInfo("Saved successfully");
      await delay(2500);
      setSaveInfo("Save");
      setOpen(false);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    console.log(barcode);

    try {
      setLoading(true);
      await DeleteUserScan(barcode);
      // const res = await fetch("/api/scans/delete", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     barcode: barcode, // or barcode if that's what you delete with
      //   }),
      // });

      // if (!res.ok) throw new Error("Failed to delete");

      router.refresh(); // refresh server data

      console.log("Deleted successfully");

      setSaveInfo("Deleting...");
      await delay(1200);

      setSaveInfo("Deleted");
      await delay(1000);

      setSaveInfo("Delete");

      setOpen(false);

    } catch (err) {
      console.error(err);
      console.log("Failed to delete")
    } finally {
      setLoading(false);
  }
};


  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <SignedIn>
        <div className="flex gap-3">
          { mode === "save" &&
             <Button
            variant="secondary"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"
            onClick={() => {
              handleSave()
              console.log("Sending barcode:", barcode);
              console.log("Save scan");
              console.log(product)
            }}
            disabled={loading}
            >
              <Bookmark className="h-4 w-4" />
              {saveInfo}
            </Button>
          }


          { mode === "delete" &&
            <Button
            variant="secondary"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer"
            onClick={() => {
              handleDelete()
              console.log("Deleting scan:", barcode);
              console.log("Scan Deleted");
              console.log(product)
            }}
            disabled={loading}
            >
              <Trash className="h-4 w-4" />
              {deleteInfo}
            </Button>
          }
         

          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white cursor-pointer"
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
