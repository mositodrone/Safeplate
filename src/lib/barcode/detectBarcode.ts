export async function detectBarcodeFromImage(file: File):
Promise<string | null> {
  if (!file) return;
  const imageUrl = URL.createObjectURL(file);

  const Quagga = (await import("@ericblade/quagga2")).default;

  // 1️⃣ Try Quagga (fast)
  const quaggaResult = await new Promise<string | null>((resolve) => {
    Quagga.decodeSingle(
      {
        src: imageUrl,
        numOfWorkers: 0,
        inputStream: { size: 800 },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
      },
      (result) => {
        URL.revokeObjectURL(imageUrl);

        if (result?.codeResult?.code) {
          resolve(result.codeResult.code);
        } else {
          resolve(null);
        }
      }
    );
  });

  if (quaggaResult) {
    return quaggaResult;
  }

  // 2️⃣ Fallback to OCR (slower)
   const Tesseract = await import("tesseract.js");
  const ocr = await Tesseract.recognize(file, "eng");

  const text = ocr.data.text;

  const match = text.match(/\b\d{8,14}\b/);

  return match ? match[0] : null;
}