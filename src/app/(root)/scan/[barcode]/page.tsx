export default function ScanPage({
  params,
}) {
  const { barcode } = params;

  return <ScanContent barcode={barcode} />;
}

// : {
//   params: { barcode: string };
// }