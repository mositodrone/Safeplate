"use client"

import React, { useState } from 'react'
import SavedScanDialog from './SavedScanDialog';
import { ArrowUpRight } from 'lucide-react';

const ProfileComponent = ({ scans }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null)
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <SavedScanDialog
        open={open}
        setOpen={setOpen}
        product={product}
        loading={loading}
        error={error}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scans.map((item: any) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border p-4 hover:shadow-md transition cursor-pointer hover:bg-blend-overlay"
            onClick={() => {
              setProduct(item)
              setOpen(true)
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold">{item.productName}</h3>
                {/* <span className="text-sm text-gray-500">
                  {item.topics} topic
                </span> */}
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileComponent