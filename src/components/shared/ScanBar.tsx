"use client";

import { useState } from "react";
import { Camera, Barcode, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";

// type ScanBarProps = {
//   onSearch: (barcode: string) => void;
// };

export default function ScanBar({ onSearch }: any) {
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const isSearchEnabled = barcode.length > 0;

  return (
    <section className="max-w-xl h-[80dvh] mx-auto rounded-2xl shadow-md" id="scan">
      <div className="p-6 space-y-5">
        <h2 className="text-xl font-semibold">Scan a product</h2>
        <p className="text-md font-semibold text-muted-foreground">
          Scan or enter a barcode to analyze ingredients and nutrition.
        </p>

        {/* Barcode input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter barcode number"
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value)
            }}
            className="flex-1 placeholder:text-amber-50"
          />
          <Button 
            variant="secondary" size="icon" 
            onClick={() => onSearch(barcode)}
            disabled={!barcode}>
            <Barcode className="h-4 w-4 cursor-pointer" />
          </Button>
        </div>

        {/* Scan options */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="flex flex-col gap-1 h-20 cursor-pointer"
            onClick={() => setIsScanning(true)}
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs">Scan</span>
          </Button>

          <Button
            variant="secondary"
            className="flex flex-col gap-1 h-20 cursor-pointer"
          >
            <Upload className="h-5 w-5" />
            <span className="text-xs">Upload</span>
          </Button>

          {/* <Button
            variant="secondary"
            className="flex flex-col gap-1 h-20 cursor-pointer"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Manual</span>
          </Button> */}
        </div>

        {/* Search action */}
        <Button
          className="w-full"
          disabled={!isSearchEnabled && !isScanning}
        >
          Search product
        </Button>
      </div>
    </section>
  );
}
