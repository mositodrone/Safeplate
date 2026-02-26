export default function ScanPage({
  params,
}: {
  params: { barcode: string };
}) {
  const { barcode } = params;

  return <ScanContent barcode={barcode} />;
}