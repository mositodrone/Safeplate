"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ScanLoader = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto pointer-events-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">

        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-gray-900">One Second...
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Scanning message */}
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Scanning ingredients for hidden allergens…
            </p>
          </div>

          {/* Skeleton layout */}
          <div className="space-y-6 animate-pulse">

            <div className="rounded-2xl border p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-3 w-1/3 bg-muted rounded" />
              </div>
            </div>

            <div className="rounded-2xl border p-4 space-y-3">
              <div className="h-4 w-1/4 bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted rounded" />
            </div>

            <div className="rounded-2xl border p-4 space-y-3">
              <div className="h-4 w-1/5 bg-muted rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-muted rounded-full" />
                <div className="h-6 w-16 bg-muted rounded-full" />
                <div className="h-6 w-12 bg-muted rounded-full" />
              </div>
            </div>

            <div className="rounded-2xl border p-4 space-y-4">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-2 w-full bg-muted rounded" />
              <div className="h-2 w-full bg-muted rounded" />
              <div className="h-2 w-full bg-muted rounded" />
            </div>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ScanLoader;