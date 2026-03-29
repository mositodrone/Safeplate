"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ModalType = "NOT_FOUND" | null;

export default function FeedbackModal({
  modal,
  setModal,
}: {
  modal: ModalType;
  setModal: (value: ModalType) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/product?query=${query}`);
      const data = await res.json();

      console.log("Search results:", data);

      // 👉 NEXT STEP: store results in state (later UI)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modal === "NOT_FOUND"} onOpenChange={() => setModal(null)}>
      <DialogContent className="max-w-sm text-center space-y-4">
        <DialogHeader>
          <DialogTitle className="text-blue-950">
            Product Not Found
          </DialogTitle>

          <DialogDescription>
            We’re still learning about this product. Try searching by name.
          </DialogDescription>
        </DialogHeader>

        {/* 🔍 SEARCH INPUT */}
        <div className="flex gap-2">
          <Input
            placeholder="Search product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            onClick={handleSearch}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? "..." : "Search"}
          </Button>
        </div>

        <Button
          variant="secondary"
          onClick={() => setModal(null)}
          className="w-full cursor-pointer"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}


















// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// type ModalType = "NOT_FOUND" | null;

// export default function FeedbackModal({
//   modal,
//   setModal,
// }: {
//   modal: ModalType;
//   setModal: (value: ModalType) => void;
// }) {
//   return (
//     <Dialog open={modal === 'NOT_FOUND'} onOpenChange={() => setModal(null)}>
//       <DialogContent className="max-w-sm text-center">
//         <DialogHeader>
//           <DialogTitle className="text-blue-950">
//             {modal === "NOT_FOUND" && "Product Not Found"}
//           </DialogTitle>

//           <DialogDescription>
//             {modal === "NOT_FOUND" &&
//               "This product is not available yet. Try another scan or check back later."}
//           </DialogDescription>
//         </DialogHeader>

//         <Button onClick={() => setModal(null)} className="mt-4 w-full cursor-pointer">
//           Got it
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }