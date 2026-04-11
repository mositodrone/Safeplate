"use client"

import FeedbackModal from "@/components/shared/feedback-modal";
// import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/Hero";
import ImageUploadDialog from "@/components/shared/ImageUploadDialog";
// import Navbar from "@/components/shared/NavBar";
import ScanBar from "@/components/shared/ScanBar";
import ScanLoader from "@/components/shared/ScanLoader";
import ScanResultDialog from "@/components/shared/ScanResultDialog";
import SearchResultsDialog from "@/components/shared/SearchResultsDialog";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [openResults, setOpenResults] = useState(false);

  const router = useRouter()

  const handleSearch = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);
      setOpen(true);

      const res = await fetch(`/api/product?barcode=${barcode}`);
      const data = await res.json();
      console.log(data);

       await new Promise((r) => setTimeout(r, 400));

      if(res.status === 404 || !data.name || !data.brand) {
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

  const handleMissingSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/product?query=${query}`);

       await new Promise((r) => setTimeout(r, 400));

      if (res.status === 404) {
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

      const data = await res.json();

      console.log("Search results:", data);

      setResults(data.results || []);
      setOpenResults(true);   // 👈 open results dialog

      // 👉 NEXT STEP: store results in state (later UI)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (item: any) => {
    try {
      await fetch("/api/link-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          brand: item.brand,
          image: item.image,
        }),
      });

      // close both dialogs
      setOpenResults(false);
      setModal(null);

      

      // 👉 OPTIONAL (very nice UX)
      // trigger refetch / show product immediately

    } catch (err) {
      console.error(err);
    }
  };

  const scanRef = useRef<HTMLDivElement | null>(null);

  const scrollToScan = () => {
    scanRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-6"
    >  
      <FeedbackModal 
        modal={modal} setModal={setModal} 
        handleSearch={handleMissingSearch}
        query={query}
        setQuery={setQuery}
      />
      <SearchResultsDialog
        open={openResults}
        setOpen={setOpenResults}
        results={results}
        onSelect={handleSelect}
      />    
      <HeroSection
        setOpen={setOpenUpload}
        loading={uploadLoading}
        scrollToScan={scrollToScan}
      />
      
      <ImageUploadDialog
        open={openUpload}
        setOpen={setOpenUpload}
        onSearch={handleSearch} 
      />
      
      <ScanBar
        scanRef={scanRef} 
        onSearch={handleSearch}
        setOpen={setOpenUpload}
      />

      <ScanLoader
        open={loading}
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


// "use client"

// import FeedbackModal from "@/components/shared/feedback-modal";
// // import Footer from "@/components/shared/Footer";
// import HeroSection from "@/components/shared/Hero";
// import ImageUploadDialog from "@/components/shared/ImageUploadDialog";
// // import Navbar from "@/components/shared/NavBar";
// import ScanBar from "@/components/shared/ScanBar";
// import ScanLoader from "@/components/shared/ScanLoader";
// import ScanResultDialog from "@/components/shared/ScanResultDialog";
// import SearchResultsDialog from "@/components/shared/SearchResultsDialog";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function ScanPage() {
//   const [open, setOpen] = useState(false)
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   type ModalType = "NOT_FOUND" | null;

//   const [modal, setModal] = useState<ModalType>(null);

//   const [openUpload, setOpenUpload] = useState(false)
//   const [uploadLoading, setUploadLoading] = useState(false)

//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [openResults, setOpenResults] = useState(false);

//   const router = useRouter()

//   const handleSearch = async (barcode: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch(`/api/product?barcode=${barcode}`);
//       const data = await res.json();
//       console.log(data);

//       if(res.status === 404 || !data?.name) {
//         setLoading(false)
//         setModal("NOT_FOUND");
//         console.log("MODALa:", modal);
//         toast("Product Unavailable", {
//           id: "missing-product",
//           description: "This product is Not available yet.",
//           // action: {
//           //   label: "View",
//           //   onClick: () => router.push(`/profile?barcode=${barcode}`),
//           // },
//         });
//         console.log("MODAL:", modal);
//         return;
//       }

//       setOpen(true);

//       if (!res.ok) throw new Error(data.error);

//       setProduct(data);
//       router.push(`?barcode=${barcode}`)
//     } catch (err: any) {
//       setProduct(null);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMissingSearch = async () => {
//     if (!query) return;

//     setLoading(true);

//     try {
//       const res = await fetch(`/api/product?query=${query}`);

//       if (res.status === 404) {
//         setLoading(false)
//         setModal("NOT_FOUND");
//         toast("Product Unavailable", {
//           id: "missing-product",
//           description: "This product is Not available yet.",
//           // action: {
//           //   label: "View",
//           //   onClick: () => router.push(`/profile?barcode=${barcode}`),
//           // },
//         });
//         return;
//       }

//       const data = await res.json();

//       console.log("Search results:", data);

//       setResults(data.results || []);
//       setOpenResults(true);   // 👈 open results dialog

//       // 👉 NEXT STEP: store results in state (later UI)
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = async (item: any) => {
//     try {
//       await fetch("/api/link-product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: item.name,
//           brand: item.brand,
//           image: item.image,
//         }),
//       });

//       // close both dialogs
//       setOpenResults(false);
//       setModal(null);

//       // 👉 OPTIONAL (very nice UX)
//       // trigger refetch / show product immediately

//     } catch (err) {
//       console.error(err);
//     }
//   };


//   return (
//     <div className="space-y-6"
//     >  
//       <FeedbackModal 
//         modal={modal} setModal={setModal} 
//         handleSearch={handleMissingSearch}
//         query={query}
//         setQuery={setQuery}
//       />
//       <SearchResultsDialog
//         open={openResults}
//         setOpen={setOpenResults}
//         results={results}
//         onSelect={handleSelect}
//       />    
//       <HeroSection
//         setOpen={setOpenUpload}
//         loading={uploadLoading}
//       />
      
//       <ImageUploadDialog
//         open={openUpload}
//         setOpen={setOpenUpload}
//         onSearch={handleSearch} 
//       />
      
//       <ScanBar 
//         onSearch={handleSearch}
//         setOpen={setOpenUpload}
//       />

      // {/* <ScanLoader
      //   open={loading}
      // /> */}

//       <ScanResultDialog
//         open={open}
//         setOpen={setOpen}
//         product={product}
//         loading={loading}
//         error={error}
//       />
//     </div>
//   );
// }