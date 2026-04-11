"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { X } from "lucide-react";

export default function SearchResultsDialog({
  open,
  setOpen,
  results,
  onSelect,
}: any) {
  if (!results || results.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">
        
        {/* ❌ Close Button */}
        <DialogClose asChild>
          <button className="absolute right-4 top-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
            <X className="h-4 w-4 text-gray-700" />
          </button>
        </DialogClose>

        {/* 🧠 Header */}
        <DialogHeader>
          <DialogTitle><p className="text-gray-800">Search Results</p></DialogTitle>
          <DialogDescription>
            Select the correct product
          </DialogDescription>
        </DialogHeader>

        {/* 📦 Results List */}
        <div className="mt-2 space-y-2">
          {results.map((item: any, index: number) => {
            const shortName = item.name
              ?.split(" ")
              .slice(0, 5)
              .join(" ");

            return (
              <div
                key={index}
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-100 cursor-pointer transition"
              >
                {/* 🖼 IMAGE */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                )}

                {/* 📄 TEXT */}
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {shortName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.brand ?? "Unknown brand"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}