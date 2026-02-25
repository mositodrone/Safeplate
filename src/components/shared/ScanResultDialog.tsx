"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ScanLoader from "./ScanLoader";
import ScanActions from "./ScanActions";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function ScanResultDialog({
  open,
  setOpen,
  product,
  loading,
  error
}: any) {

  if (loading) return <ScanLoader/>;
   if (error) return <p className="text-red-500">Oop's something went wrong, Try again</p>;
   if (!product) return null;

   const shortName = product.name
    .trim()
    .split(/\s+/)
    
    .slice(0, 3)
    .join(" ");
   
   console.log(product)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-gray-900">{shortName || "Scan Result"}</p>
            <p className="text-sm text-muted-foreground">
              {product.brand || 'Food product'}
            </p>
          </DialogTitle>

          <DialogDescription>
            Ingredient & allergen breakdown
          </DialogDescription>

          <Image 
            src={product?.image}
            width={96}
            height={96}
            alt="product-image"
          />
        </DialogHeader>

        {/* Scan Content */}
          <div className="space-y-4">
            {/* Status badges */}
          <div className="flex justify-center flex-wrap gap-2">
            {product.allergens?.length === 0 && (
              <Badge className="bg-green-100 text-green-700">
                Safe
              </Badge>
            )}

            {product.allergens?.length > 0 && (
              <Badge variant="destructive">
                Contains allergens
              </Badge>
            )}

            {/* placeholder for future logic */}
            {product.nutriments?.sugars_100g > 10 && (
              <Badge className="bg-yellow-100 text-yellow-700">
                High sugar
              </Badge>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Ingredients</h4>
            <p className="text-sm text-muted-foreground">
              {product?.ingredients || "No ingredients detected."}
              {/* {product?.ingredients?.join(", ") || "No ingredients detected."} */}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Allergens</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.allergens?.map((a: any, i: any)=> (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-red-700 text-white"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          
          {/* Nutrition values */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Nutrients values
            </h3>

            <div className="flex flex-wrap gap-2">
              <NutritionPill label="Calories" value={product.nutrition?.calories} unit="kcal" />
              <NutritionPill label="carbs" value={product.nutrition?.carbs} unit="g" />
              <NutritionPill label="Fat" value={product.nutrition?.fat} unit="g" />
              <NutritionPill label="Protein" value={product.nutrition?.protein} unit="g" />
              <NutritionPill label="Sugar" value={product.nutrition?.sugar} unit="g" />
            </div>
          </div>

        </div>

        <DialogFooter className="mt-6">

          <SignedIn>
            <ScanActions setOpen={setOpen} product={product}/>
            {/* <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </Button>

              <Button className="bg-rose-700 hover:bg-rose-800 text-white">
                Share
              </Button>
            </div> */}
          </SignedIn>

          <SignedOut>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Sign in to save this scan
            </Button>
          </SignedOut>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function NutritionPill({ label, value, unit }: any) {
    if (value == null) return null;

    return (
      <div className="rounded-full border px-3 py-1 text-sm flex items-center gap-1">
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium text-accent-foreground">{value}{unit}</span>
      </div>
    );
  }
}
