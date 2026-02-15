"use client"

import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/Hero";
import Navbar from "@/components/shared/NavBar";
import ScanBar from "@/components/shared/ScanBar";
import ScanResultDialog from "@/components/shared/ScanResultDialog";
import { useState } from "react";

export default function ScanPage() {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);
      setOpen(true);

      const res = await fetch(`/api/product?barcode=${barcode}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setProduct(data);
    } catch (err: any) {
      setProduct(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6"
    >
      <Navbar/>
      
      <HeroSection/>
      
      <ScanBar 
        onSearch={handleSearch} 
        />

      <ScanResultDialog
        open={open}
        setOpen={setOpen}
        product={product}
        loading={loading}
        error={error}
      />

      <Footer/>
    </div>
  );
}