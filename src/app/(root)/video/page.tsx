"use client";

"use client";

import { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import ScanResultDialog from "@/components/shared/ScanResultDialog";
import { useRouter } from "next/navigation";
import FeedbackModal from "@/components/shared/feedback-modal";
import { toast } from "sonner";

export default function ScannerUI() {
  const [screen, setScreen] = useState<"start" | "scan" | "result">("start");
  const [barcode, setBarcode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("")
   type ModalType = "NOT_FOUND" | null;
  
  const [modal, setModal] = useState<ModalType>(null);

  const router = useRouter();

  const handleSearch = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      setOpen(true);
      setBarcode(code);

      const res = await fetch(`/api/product?barcode=${code}`);
      const data = await res.json();

      console.log(data);

      if (!data.name || !data.brand) {
        setModal("NOT_FOUND");
        toast("Product Unavailable", {
          id: "missing-product",
          description: "This product is Not available yet.",
        });
        return;
      }

      if (!res.ok) throw new Error(data.error);

      setProduct(data);
      router.push(`?barcode=${code}`);
    } catch (err: any) {
      setProduct(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm h-screen relative overflow-hidden bg-black">
        <FeedbackModal 
          modal={modal} setModal={setModal} 
          handleSearch={handleSearch}
          query={query}
          setQuery={setQuery}
        />

        <ScanResultDialog
          open={open}
          setOpen={setOpen}
          product={product}
          loading={loading}
          error={error}
        />

        {screen === "start" && (
          <StartScreen onStart={() => setScreen("scan")} />
        )}

        {screen === "scan" && (
          <ScannerScreen onDetected={handleSearch} />
        )}
      </div>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-dvh flex flex-col justify-between bg-gradient-to-b from-black to-zinc-900">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-white rounded-xl flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white rounded-md" />
        </div>
      </div>

      <div className="bg-white text-black rounded-t-3xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Get Started</h2>
        <p className="text-sm text-gray-600 mb-6">
          Scan QR codes fast and secure.
        </p>

        <button
          onClick={onStart}
          className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center mx-auto shadow-lg cursor-pointer"
        >
          →
        </button>
      </div>
    </div>
  );
}

function ScannerScreen({
  onDetected,
}: {
  onDetected: (code: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  const reader = new BrowserMultiFormatReader();
  let active = true;
  let controls: any;

  const start = async () => {
    if (!videoRef.current) return;

    try {
      controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result) => {
          if (result && active) {
            active = false;

            const code = result.getText();
            console.log("Scanned:", code);

            if (controls) controls.stop();
            onDetected(code);
          }
        }
      );
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  start();

  return () => {
    active = false;
    if (controls) controls.stop();
  };
}, [onDetected]);

  return (
    <div className="relative h-dvh">
      {/* Camera */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-40">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-yellow-400" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-yellow-400" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-yellow-400" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-yellow-400" />

          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-yellow-400 animate-pulse" />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 w-full p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
        <button className="text-white text-xl">📷</button>

        <button className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xl cursor-pointer">
          ⬤
        </button>

        <button className="text-white text-xl">⚡</button>
      </div>
    </div>
  );
}

// import { useState } from "react";

// export default function ScannerUI() {

//   const [screen, setScreen] = useState<"start" | "scan" | "result">("start");
//   const [barcode, setBarcode] = useState<string | null>(null);
//   const [open, setOpen] = useState(false)
//    const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);


//   const handleSearch = async (barcode: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       setOpen(true);

//       const res = await fetch(`/api/product?barcode=${barcode}`);
//       const data = await res.json();
//       console.log(data);

//       if(!data.name || !data.brand) {
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

//       if (!res.ok) throw new Error(data.error);

//         setProduct(data);
//         router.push(`?barcode=${barcode}`)
//       } catch (err: any) {
//         setProduct(null);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };


//   return (
//     <div className="h-dvh bg-black bg-cover text-white flex items-center justify-center">
//       <div className="w-full max-w-sm h-screen relative overflow-hidden bg-black">
//         <ScanResultDialog
//           open={open}
//           setOpen={setOpen}
//           product={product}
//           loading={loading}
//           error={error}
//         />
//         {screen === "start" && <StartScreen onStart={() => setScreen("scan")} />}
//         {screen === "scan" && (
//           <ScannerScreen 
//               onDetected={(code) => {
//               handleSearch(code)
//           }} />
//         )}
//         {/* {screen === "result" && (
//           <ResultScreen onRescan={() => setScreen("scan")} />
//         )} */}
//       </div>
//     </div>
//   );
// }

// function StartScreen({ onStart }: { onStart: () => void }) {
//   return (
//     <div className="min-h-dvh flex flex-col justify-between bg-gradient-to-b from-black to-zinc-900">
//       {/* QR Icon */}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="w-32 h-32 border-4 border-white rounded-xl flex items-center justify-center">
//           <div className="w-16 h-16 border-4 border-white rounded-md" />
//         </div>
//       </div>

//       {/* Bottom Sheet */}
//       <div className="bg-white text-black rounded-t-3xl p-6 text-center">
//         <h2 className="text-xl font-semibold mb-2">Get Started</h2>
//         <p className="text-sm text-gray-600 mb-6">
//           Scan QR codes fast and secure.
//         </p>

//         <button
//           onClick={onStart}
//           className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center mx-auto shadow-lg cursor-pointer"
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import ScanResultDialog from "@/components/shared/ScanResultDialog";

// function ScannerScreen({ onDetected }: { onDetected: () => void }) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const reader = new BrowserMultiFormatReader();
//     let active = true;

//     const start = async () => {
//       if (!videoRef.current) return;

//       const devices = await BrowserMultiFormatReader.listVideoInputDevices();

//       const backCamera = devices.find((d) =>
//         d.label.toLowerCase().includes("back")
//       )?.deviceId || devices[0]?.deviceId;

//       reader.decodeFromVideoDevice(
//         backCamera,
//         videoRef.current!,
//         (result) => {
//           if (result && active) {
//             active = false;

//             const code = result.getText();
//             console.log("Scanned:", code);

//             reader.reset();
//             onDetected(code);
//           }
//         }
//       );
//     };

//     start();

//     return () => {
//       setTimeout(() => {
//         active = false;
//         reader.reset();
//         onDetected(code);
//       }, 500);
//     };
//   }, [onDetected]);

//   onDetected = async (code) => {
//    handleSearch(code)
//   }

//   return (
//     <div className="relative h-dvh">
//       {/* Camera */}
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover"
//         playsInline
//         muted
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative w-64 h-40">
//           {/* Corners */}
//           <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-yellow-400" />
//           <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-yellow-400" />
//           <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-yellow-400" />
//           <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-yellow-400" />

//           {/* Scan line */}
//           <div className="absolute top-1/2 left-0 w-full h-[2px] bg-yellow-400 animate-pulse" />
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       <div className="absolute bottom-0 w-full p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
//         <button className="text-white text-xl">📷</button>

//         <button className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xl cursor-pointer">
//           ⬤
//         </button>

//         <button className="text-white text-xl">⚡</button>
//       </div>
//     </div>
//   );
// }

// function ResultScreen({
//   barcode,
//   onRescan,
// }: {
//   barcode: string | null;
//   onRescan: () => void;
// }) {
//   return (
//     <div className="h-full bg-zinc-900 p-4 flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <button onClick={onRescan}>←</button>
//         <h2 className="text-lg font-semibold">Scan Result</h2>
//         <div />
//       </div>

//       {/* Data */}
//       <div className="bg-zinc-800 p-3 rounded-lg text-sm mb-4 break-all">
//         {barcode || "No barcode detected"}
//       </div>

//       {/* Actions */}
//       <div className="flex justify-center gap-4 mb-6">
//         <button
//           onClick={() => navigator.clipboard.writeText(barcode || "")}
//           className="w-12 h-12 rounded-full bg-yellow-400 text-black"
//         >
//           📋
//         </button>
//       </div>

//       {/* Bottom */}
//       <div className="mt-auto flex justify-center">
//         <button
//           onClick={onRescan}
//           className="w-16 h-16 bg-yellow-400 rounded-full text-black text-xl"
//         >
//           ⬤
//         </button>
//       </div>
//     </div>
//   );
// }