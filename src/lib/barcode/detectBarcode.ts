import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";

export async function detectBarcodeZXing(file: File) {
  const reader = new BrowserMultiFormatReader(undefined, {
    possibleFormats: [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = await createImageBitmap(file);

  const MAX_WIDTH = 800;

  if (img.width > MAX_WIDTH) {
    const scale = MAX_WIDTH / img.width;
    canvas.width = MAX_WIDTH;
    canvas.height = img.height * scale;
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
  }

  try {
    const result = reader.decodeFromCanvas(canvas);
    const barcode = result.getText();
      if (barcode) {
      console.log("ZXing success:", barcode);
      return barcode;
    }
  } catch {
    try {
      const result = reader.decodeFromCanvas(canvas);
      const barcode = result.getText();
      if (barcode) {
      console.log("ZXing success:", barcode);
      return barcode;
    }
     
    } catch {
      console.log("ZXingg failed falling back to OCR...")
    }
  }

  // ---OCR fallback---
    try {
    const Tesseract = await import("tesseract.js");

    const ocr = await Tesseract.recognize(canvas, "eng"); // 👈 use canvas (better than file)

    const text = ocr.data.text;

    console.log("OCR text:", text);

    // 🔥 improved matching (multiple candidates)
    const matches = text.match(/\b\d{8,14}\b/g);

    if (matches && matches.length > 0) {
      console.log("OCR match:", matches[0]);
      return matches[0]; // return first valid barcode-like number
    }

    return null;
  } catch (err) {
    console.error("OCR failed:", err);
    return null;
  }

}


// import { BrowserMultiFormatReader } from "@zxing/browser";

// export async function detectBarcodeZXing(file: File) {
//   const reader = new BrowserMultiFormatReader();

//   const img = document.createElement("img");
//   img.src = URL.createObjectURL(file);

//   await new Promise((res) => (img.onload = res));

//   try {
//     const result = await reader.decodeFromImageElement(img);
//     return result.getText();
//   } catch {
//     return null;
//   }
// }

// import { BrowserMultiFormatReader } from "@zxing/browser";

// export async function detectBarcodeZXing(file: File) {
//   const reader = new BrowserMultiFormatReader();

//    const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   const img = await createImageBitmap(file);

//   canvas.width = img.width;
//   canvas.height = img.height;

//   ctx?.drawImage(img, 0, 0);

//   // 🔥 your preprocessing
//   const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData?.data;

//   if (data)
//   for (let i = 0; i < data.length; i += 4) {
//     const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//     const val = avg > 128 ? 255 : 0;

//     data[i] = data[i + 1] = data[i + 2] = val;
//   }

//   ctx?.putImageData(imageData!, 0, 0);

//   try {
//     // ✅ pass canvas directly
//     const result = await reader.decodeFromCanvas(canvas);
//     return result.getText();
//   } catch {
//     return null;
//   }
// }


// export async function detectBarcodeFromImage(file: File):
// Promise<string | null> {
//   if (!file) return;
//   const imageUrl = URL.createObjectURL(file);

//   const Quagga = (await import("@ericblade/quagga2")).default;

//   // 1️⃣ Try Quagga (fast)
//   const quaggaResult = await new Promise<string | null>((resolve) => {
//     Quagga.decodeSingle(
//       {
//         src: imageUrl,
//         numOfWorkers: 0,
//         inputStream: { size: 800 },
//         decoder: {
//           readers: ["ean_reader", "upc_reader"],
//         },
//       },
//       (result) => {
//         URL.revokeObjectURL(imageUrl);

//         if (result?.codeResult?.code) {
//           resolve(result.codeResult.code);
//         } else {
//           resolve(null);
//         }
//       }
//     );
//   });

//   if (quaggaResult) {
//     return quaggaResult;
//   }

//   // 2️⃣ Fallback to OCR (slower)
//    const Tesseract = await import("tesseract.js");
//   const ocr = await Tesseract.recognize(file, "eng");

//   const text = ocr.data.text;

//   const match = text.match(/\b\d{8,14}\b/);

//   return match ? match[0] : null;
// }