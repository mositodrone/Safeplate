"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouteLoader, stopRouteLoading } from "@/hooks/useRouteLoader";
import { Loader2 } from "lucide-react";

export function RouteLoader() {
  const pathname = usePathname();
  const { loading } = useRouteLoader();

  useEffect(() => {
    stopRouteLoading();
  }, [pathname]);

  return loading ? 
  <div className={`
    fixed inset-0 z-[9999]
    flex items-center justify-center
    bg-white/60 backdrop-blur-sm
    transition-opacity duration-200
    ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
  >
    <Loader2 className="animate-spin w-6 h-6" />
  </div> : null;
}


// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { Loader2 } from "lucide-react";

// export function SimpleRouteLoader() {
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // route finished → stop loader
//     setLoading(false);
//   }, [pathname]);

//   useEffect(() => {
//       // ✅ only runs on client
//       (window as any).startRouteLoading = () => setLoading(true);

//       return () => {
//         delete (window as any).startRouteLoading;
//       };
//     }, []);

//   return (
//     <div
//       className={`
//         fixed inset-0 z-[9999]
//         flex items-center justify-center
//         bg-white/60 backdrop-blur-sm
//         transition-opacity duration-200
//         ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}
//       `}
//     >
//       <Loader2 className="animate-spin w-6 h-6" />
//     </div>
//   );
// }