import { Loader2 } from 'lucide-react'
import React from 'react'

const ScanLoader = () => {
  return (
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
  )
}

export default ScanLoader