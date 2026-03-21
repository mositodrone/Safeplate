"use client"

import FeedbackModal from "@/components/shared/feedback-modal";
// import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/Hero";
import ImageUploadDialog from "@/components/shared/ImageUploadDialog";
// import Navbar from "@/components/shared/NavBar";
import ScanBar from "@/components/shared/ScanBar";
import ScanResultDialog from "@/components/shared/ScanResultDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ScanPage() {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type ModalType = "NOT_FOUND" | null;

  const [modal, setModal] = useState<ModalType>(null);

  const [openUpload, setOpenUpload] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  const router = useRouter()

  const handleSearch = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);
      setOpen(true);

      const res = await fetch(`/api/product?barcode=${barcode}`);
      const data = await res.json();
      console.log(data);

      if(!data.name) {
        setModal("NOT_FOUND");
        toast("Product Unavailable", {
          id: "missing-product",
          description: "This product is Not available yet.",
          // action: {
          //   label: "View",
          //   onClick: () => router.push(`/profile?barcode=${barcode}`),
          // },
        });
        return;
      }

      if (!res.ok) throw new Error(data.error);

      setProduct(data);
      router.push(`?barcode=${barcode}`)
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
      <FeedbackModal modal={modal} setModal={setModal}/>    
      <HeroSection
        setOpen={setOpenUpload}
        loading={uploadLoading}
      />
      
      <ImageUploadDialog
        open={openUpload}
        setOpen={setOpenUpload}
        onSearch={handleSearch} 
      />
      
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
    </div>
  );
}