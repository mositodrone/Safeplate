"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { detectBarcodeZXing } from "@/lib/barcode/detectBarcode";
import { useRouter } from "next/navigation";

export default function ImageUploadDialog({
  open,
  setOpen,
  onSearch,
  onUpload,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSearch: String;
  onUpload: (file: File) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);

  // if (loading) return <ScanLoader/>;
  file && console.log(file)

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);

      const barcode = await detectBarcodeZXing(file)

      console.log("image barcode:", barcode)

      if (!barcode) {
      setError("No barcode detected");
      return;
    }
      router.push(`?scan=${barcode}`);

      onSearch(barcode);

      setOpen(false);
    }
     catch (err) {
      console.error(err);
      setError("Failed to process image:", err);
      console.log(error)
    } finally {
      setLoading(false);
      // onUpload(file);
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogClose asChild>
          <button className="absolute right-4 top-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200 shadow-sm transition cursor-pointer">
            <X className="h-4 w-4 text-gray-700" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="font-semibold text-gray-900">Upload Image</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Scan your image containing Barcode or Barcode number
          </DialogDescription>
        </DialogHeader>

        {/* Image preview */}
        <div className="w-full flex justify-center mt-4 mb-2">
          <Image
            src={!file? "/assets/images/preview-placeholder-image.jpg" : preview} // replace with your placeholder or preview logic
            width={300}
            height={160}
            alt="Upload preview"
            className="rounded-md border"
          />
        </div>

        {/* Upload dropzone */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition text-center"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <p className="text-sm text-blue-600 underline mb-1">Click to upload</p>
          <p className="text-xs text-gray-500">or drag and drop</p>
          <p className="text-xs text-gray-400 mt-1">Max. File Size: 15MB</p>
        </label>

        {/* Footer buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={!file} onClick={handleUpload}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}