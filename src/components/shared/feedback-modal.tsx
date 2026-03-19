"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ModalType = "NOT_FOUND" | null;

export default function FeedbackModal({
  modal,
  setModal,
}: {
  modal: ModalType;
  setModal: (value: ModalType) => void;
}) {
  return (
    <Dialog open={modal === 'NOT_FOUND'} onOpenChange={() => setModal(null)}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="text-blue-950">
            {modal === "NOT_FOUND" && "Product Not Found"}
          </DialogTitle>

          <DialogDescription>
            {modal === "NOT_FOUND" &&
              "This product is not available yet. Try another scan or check back later."}
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => setModal(null)} className="mt-4 w-full cursor-pointer">
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}